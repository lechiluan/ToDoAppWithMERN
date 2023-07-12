const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log('JWT_SECRET:', process.env.JWT_SECRET);
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    const result = await user.save();
    const token = user.generateAuthToken();

    res.send({ token });
  } catch (error) {
    console.log('Error while registering user:', error);
    res.status(500).send('Internal server error');
  }
};


module.exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send('Invalid email or password');
      }
  
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).send('Invalid email or password');
      }
  
      const token = user.generateAuthToken();
  
      res.send({ token });
    } catch (error) {
      console.log('Error while logging in:', error);
      res.status(500).send('Internal server error');
    }
  };
  
