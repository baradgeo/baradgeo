const express = require('express');
const router = express.Router();
const { authUser, authAdmin } = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @Route POST api/posts
// @desc Create post
// @access User Access

router.post(
  '/',
  [
    authUser,
    [
      check('headline')
        .not()
        .isEmpty()
        .withMessage('Headline is required')
        .isLength({ min: 10 })
        .withMessage('Headline should be greater than 10 character')
        .isLength({ max: 200 })
        .withMessage('Headline should not be greater than 200 character'),
      check('slug')
        .not()
        .isEmpty()
        .withMessage('Slug is required')
        .isLength({ min: 10 })
        .withMessage('Slug should be greater than 10 character')
        .isLength({ max: 200 })
        .withMessage('Slug should not be greater than 200 character'),
      check('description')
        .not()
        .isEmpty()
        .withMessage('Description is required')
        .isLength({ min: 20 })
        .withMessage('Description should be greater than 20 character')
        .isLength({ max: 500 })
        .withMessage('Description should not be greater than 500 character'),
      check('body')
        .not()
        .isEmpty()
        .withMessage('Body is required')
        .isLength({ min: 100 })
        .withMessage('Body should be greater than 100 character'),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        headline: req.body.headline,
        slug: req.body.slug,
        description: req.body.description,
        body: req.body.body,

        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      //See if post slug exists
      let postSlug = await Post.findOne({ slug: newPost.slug });

      if (postSlug) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Post Slug already exists. Please change slug...' }] });
      }

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @Route GET api/posts
// @desc Get all posts by pagination
// @access Public
router.get('/:start/:limit', async (req, res) => {
  try {
    const posts = await Post.find({ isApproved: true })
      .sort({ modifiedDate: -1 })
      .select('-isApproved')
      .skip(parseInt(req.params.start))
      .limit(parseInt(req.params.limit));
    if (posts.length > 0) res.json(posts);
    else return res.status(400).json({ msg: 'No posts found' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @Route GET api/posts/:id
// @desc Get post by id
// @access Public

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @Route DELETE api/posts/:id
// @desc Delete a post
// @access User Access

router.delete('/:id', authUser, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    //Check User

    const user = await User.findById(req.user.id).select('-password');
    if (user.role !== 'Admin') {
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: ' User not authorized' });
      }
    }
    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @Route POST api/posts/comment/:id
// @desc Comment on post
// @access Public

router.post(
  '/comment/:id',
  [
    check('name')
      .not()
      .isEmpty()
      .withMessage('Name is required')
      .isLength({ min: 2 })
      .withMessage('Name should be greater than 2 character')
      .isLength({ max: 50 })
      .withMessage('Name should not be greater than 50 character'),
    check('email', 'Please include a valid email').isEmail(),
    check('commentBody')
      .not()
      .isEmpty()
      .withMessage('Comment is required')
      .isLength({ max: 500 })
      .withMessage('Comment should not be greater than 500 character'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const post = await Post.findById(req.params.id);
      const { name, email, commentBody } = req.body;
      const newComment = {};
      newComment.name = name;
      newComment.email = email;
      newComment.commentBody = commentBody;

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });
      newComment.avatar = avatar;

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @Route POST api/posts/user/comment/:id
// @desc Comment on post as a user
// @access User Access

router.post(
  '/user/comment/:id',
  [
    authUser,
    [
      check('commentBody')
        .not()
        .isEmpty()
        .withMessage('Comment is required')
        .isLength({ max: 500 })
        .withMessage('Comment should not be greater than 500 character'),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        name: user.name,
        email: user.email,
        commentBody: req.body.commentBody,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @Route DELETE api/posts/comment/:id/:comment_id
// @desc Delete comment
// @access User Access

router.delete('/user/comment/:id/:comment_id', authUser, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Pull out comment
    const comment = post.comments.find((comment) => comment.id === req.params.comment_id);

    //Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'comment does not exist' });
    }

    // //Check user
    const user = await User.findById(req.user.id).select('-password');

    // if (typeof comment.user !== 'undefined' && comment.user) console.log(comment.user);
    // else console.log('User not availabe');
    let removeIndex = 0;
    if (user.role !== 'Admin') {
      if (typeof comment.user !== 'undefined' && comment.user) {
        //Check user
        if (comment.user.toString() !== req.user.id) {
          return res.status(401).json({ msg: 'User not authorized' });
        } else {
          //get remove index
          removeIndex = post.comments
            .map((comment) => comment._id.toString())
            .indexOf(req.params.comment_id);
        }
      } else return res.status(401).json({ msg: 'User not authorized' });
    } else {
      //get remove index
      removeIndex = post.comments
        .map((comment) => comment._id.toString())
        .indexOf(req.params.comment_id);
    }

    // //get remove index
    // const removeIndex = post.comments
    //   .map((comment) => comment._id.toString())
    //   .indexOf(req.params.comment_id);

    console.log(removeIndex, post.comments);
    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
