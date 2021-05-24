const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const { authAdmin } = require('../../middleware/auth');
const User = require('../../models/User');

// @Route GET api/users/roles
// @desc Get all roles in schema
// @access Admin access

router.get('/roles', authAdmin, async (req, res) => {
  try {
    const roles = await User.schema.path('role').enumValues;
    res.json(roles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @Route GET api/users/user/:userId
// @desc Get Details of single user by userId
// @access Admin Access

router.get('/user/:userId', authAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) return res.status(400).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @Route GET api/users/all
// @desc Get all user
// @access Admin Access

router.get('/all', authAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @Route GET api/users/role/:role
// @desc Get all users by role
// @access Admin Access

router.get('/role/:role', authAdmin, async (req, res) => {
  try {
    const users = await User.find({ role: req.params.role }).select('-password');
    if (users && users.length > 0) res.json(users);
    else return res.status(400).json({ msg: `No Users with ${req.params.role} Role` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @Route GET api/users/approval/:isApproved
// @desc Get all users by approval
// @access Admin Access

router.get('/approval/:isApproved', authAdmin, async (req, res) => {
  try {
    const users = await User.find({ isApproved: req.params.isApproved }).select('-password');
    if (users && users.length > 0) res.json(users);
    else return res.status(400).json({ msg: `No Users with ${req.params.isApproved} Approval` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @Route POST api/users/user/:userId
// @desc update user data by user id
// @access Admin Access

router.post(
  '/user/:userId',
  [
    authAdmin,
    [
      check('role', 'Role is required').not().isEmpty(),
      check('isApproved', 'Approval is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // destructure the request
    const { role, isApproved } = req.body;

    //Build profile object
    const userFields = {};
    if (role) userFields.role = role;
    if (isApproved) userFields.isApproved = isApproved;
    userFields.modifiedDate = Date.now();

    try {
      let user = await User.findById({ _id: req.params.userId });

      if (user) {
        user = await User.findByIdAndUpdate(
          { _id: req.params.userId },
          { $set: userFields },
          { new: true }
        );

        return res.json(user);
      }

      user = new User(userFields);
      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @Route POST api/users
// @desc Register user
// @access Public
router.post(
  '/',
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
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //See if user exists

      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      //Get users gravatar

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      //Encrypt password

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 36000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    DELETE api/users
// @desc     Delete profile, user & posts by user id
// @access   Admin Access
router.delete('/user/:user_id', authAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id).select('-password');
    if (!user) return res.status(400).json({ msg: 'User not found' });
    //Remove user posts
    await Post.deleteMany({ user: req.params.user_id });
    //Remove profile
    await Profile.findOneAndDelete({ user: req.params.user_id });
    //Remove User
    await User.findOneAndDelete({ _id: req.params.user_id });
    res.json({ msg: 'User Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
