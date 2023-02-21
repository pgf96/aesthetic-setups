const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
  create,
  login,
  checkToken,
};

async function create(req, res) {
  try {
    const user = await User.create(req.body);
    const token = createJWT(user);
    res.json(token);
  } catch (e) {
    if(e.code === 11000) {
      res.status(409).json(`Duplicate with ${e.keyValue.email}`)
    } else res.status(400).json(e);
  }
}

async function login(req,res) {
  try {
    const user = await User.findOne({ email: req.body.email })
    const isValid = await bcrypt.compare(req.body.password, user.password)
    if (isValid) {
      const token = createJWT(user)
      return res.json(token)
    }
    throw new Error

  } catch (e) {
    res.status(401).json({message: 'Invalid email or password'})
  }
}

function checkToken(req,res) {
  res.json(req.exp)
}


/*-- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}