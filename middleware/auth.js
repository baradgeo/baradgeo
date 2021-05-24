const jwt = require('jsonwebtoken');
const config = require('config');

const getUser = (req, res) => {
  //Get token from header
  const token = req.header('x-auth-token');

  //Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, Authorization denied' });
  }

  //Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

const authGuest = async (req, res, next) => {
  //Get user from token
  try {
    getUser(req, res);
    const user = await User.findById(req.user.id).select('-password');
    if (user.role !== 'Guest' && user.role !== 'User' && user.role !== 'Admin') {
      return res.status(401).json({ msg: 'Authorization denied, Contact Adminstration' });
    }
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Cannot Verify User Role' });
  }
};

const authUser = async (req, res, next) => {
  //Get user from token
  try {
    getUser(req, res);
    const user = await User.findById(req.user.id).select('-password');
    if (user.role !== 'User' && user.role !== 'Admin') {
      return res.status(401).json({ msg: 'Authorization denied, Contact Adminstration' });
    }
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Cannot Verify User Role' });
  }
};

const authAdmin = async (req, res, next) => {
  //Verify token
  try {
    getUser(req, res);

    const user = await User.findById(req.user.id).select('-password');
    if (user.role !== 'Admin') {
      return res.status(401).json({ msg: 'Authorization denied, Contact Adminstration' });
    }
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Cannot Verify User Role' });
  }
};

module.exports = { authAdmin, authUser, authGuest };
