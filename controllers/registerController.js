const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { user, pass } = req.body;
  if (!user || !pass) {
    return res
      .status(400)
      .json({ message: 'Username & password are required' });
  }

  // check for duplicate usernames in the db
  const dublicate = await User.findOne({ username: user }).exec();
  if (dublicate) {
    return res.status(409).json({ message: 'username already taken.' }); //Conflict
  }

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pass, 10);

    //create and store the new user
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });
    console.log(result);

    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { handleNewUser };
