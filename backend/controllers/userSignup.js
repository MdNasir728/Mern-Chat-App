const validator = require('validator')

const createJWT = require("../createJWT");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const userSignup = async (req, res) => {
  const { password, email, name } = req.body;
  if (!(email && password && name)) {
    return res.status(500).json({message: "All fields must be filled"});
  }
  if (!validator.isEmail(email)) {
    return   res.status(500).json({message : 'email is not valid'})
  }
  
  try {
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({message : "User already exists"});
    }
    const SALT = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, SALT);
    const user = await User.create({ password: hash, email, name });
    const TOKEN = createJWT(user._id);

    res.status(201).json({ name, email,_id: user._id, TOKEN });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = userSignup;
