const jwt = require("jsonwebtoken");

const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

module.exports = getToken;
