const express = require('express');
const router = express.Router();
const { authUser, authAdmin } = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Category = require('../../models/Category');

// @Route POST api/category
// @desc Create category
// @access User Access

router.post(
  '/',
  [
    authUser,
    [
      check('name')
        .not()
        .isEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 2 })
        .withMessage('Category name should be greater than 2 character')
        .isLength({ max: 20 })
        .withMessage('Category name should not be greater than 20 character'),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name } = req.body;
    try {
      const newCategory = new Category({
        name,
        user: req.user.id,
      });

      //See if category name exists
      let categoryName = await Category.findOne({ name: newCategory.name });

      if (categoryName) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Category already exists. Please change to soming else...' }] });
      }

      const category = await newCategory.save();

      res.json(category);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @Route PUT api/category/edit/:id
// @desc Edit category by id
// @access User Access

router.put(
  '/edit/:id',
  [
    authUser,
    [
      check('name')
        .not()
        .isEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 2 })
        .withMessage('Category name should be greater than 2 character')
        .isLength({ max: 20 })
        .withMessage('Category name should not be greater than 20 character'),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      let category = await Category.findOne({ _id: req.params.id }).populate('user', [
        'name',
        'avatar',
      ]);
      const { name } = req.body;
      const newCategory = {
        name,
        user: req.user.id,
      };

      //See if post slug exists
      let categoryName = await Category.findOne({ name: newCategory.name });

      if (categoryName) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Category already exists. Please change to soming else...' }] });
      }

      //Check user
      if (user.role !== 'Admin') {
        if (category.user._id.toString() !== req.user.id) {
          return res.status(401).json({ msg: 'User not authorized' });
        }
      }

      category = await Category.findByIdAndUpdate({ _id: req.params.id }, newCategory, {
        new: true,
      });

      res.json(category);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Category not found' });
      }
      res.status(500).send('Server Error');
    }
  }
);
// @Route GET api/category
// @desc Get all Category
// @access Public

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().populate('user', ['name', 'avatar']);
    if (categories.length > 0) {
      res.json(categories);
    } else {
      return res.status(400).json({ msg: 'There is no categories yet' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @Route DELETE api/posts/:id
// @desc Delete a category by id
// @access User Access

router.delete('/:id', authUser, async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }

    //Check User

    const user = await User.findById(req.user.id).select('-password');
    if (user.role !== 'Admin') {
      if (category.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: ' User not authorized' });
      }
    }
    await category.remove();

    res.json({ msg: 'Category removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Category not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
