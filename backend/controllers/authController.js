const User = require("../models/User");
const generatetoken = require("../utils/token");

// for signup user
module.exports.post_signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.signup(username, email, password);
    const token = generatetoken(user.id, user.email); // Pass email to the token generator
    res.status(201).json({ userId: user.id, email: user.email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// for login user
module.exports.post_login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = generatetoken(user.id, user.email); // Pass email to the token generator
    res.status(200).json({ userId: user.id, email: user.email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
