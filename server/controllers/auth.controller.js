const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { JWT_SECRET } = require("./../../config");

const signin = async (req, res) => {
  const { name } = req.body;

  try {
    const user = await new User({ name }).save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      JWT_SECRET
    );

    return res.json({
      token,
      user: { _id: user._id, name: user.name },
    });
  } catch (err) {
    console.log(err);
    return res.status("401").json({
      error: "Could not sign in",
    });
  }
};

const requireSignin = expressJwt({
  secret: JWT_SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
});

module.exports = {
  signin,
  requireSignin,
};
