const express = require('express');
const config = require('config');
const router = express.Router();
const { auth, authAdmin } = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const axios = require('axios');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route    GET api/profile
// @desc     Get all profiles
// @access   Admin Private
router.get('/', authAdmin, async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    if (profiles.length > 0) {
      res.json(profiles);
    } else {
      return res.status(400).json({ msg: 'There is no profiles yet' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   User Auth
router.get('/user/:user_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', [
      'name',
      'avatar',
    ]);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @Route GET api/profile/me
// @desc Get current users profile
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', [
      'name',
      'avatar',
    ]);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @Route POST api/profile
// @desc Create or update user profile
// @access Private

router.post(
  '/',
  [
    auth,
    [
      check('dept', 'Deptartment is required').not().isEmpty(),
      check('address', 'Address is required').not().isEmpty(),
      check('contact', 'Contact is required').not().isEmpty(),
      check('post', 'Post is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // destructure the request
    const {
      dept,
      portfolio_link,
      address,
      contact,
      post,
      skills,
      bio,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (dept) profileFields.dept = dept;
    if (portfolio_link) profileFields.portfolio_link = portfolio_link;
    if (address) profileFields.address = address;
    if (contact) profileFields.contact = contact;
    if (post) profileFields.post = post;
    if (bio) profileFields.bio = bio;

    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }

    //Build social object
    profileFields.social = {};

    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;

// Ihave changed this in laptop
