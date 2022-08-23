const bcrypt = require("bcrypt");
const { User } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();
const jwt = require("jsonwebtoken");
const {
  JWT_SECRET,
  JWT_ACCESS_TOKEN_EXPIRED,
} = process.env;

module.exports = async (req, res) => {
  const schema = {
    email: "email|empty:false",
    password: "string|min:6",
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate[0].message,
    });
  }

  const user = await User.findOne({
    where: { email: req.body.email },
  });

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "user not found",
    });
  }

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isValidPassword) {
    return res.status(404).json({
      status: "error",
      message: "invalid password",
    });
  }

  const data = {
    id: user.id,
    fullname: user.fullname,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign({ data }, JWT_SECRET, {
    expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
  });

  return res.json({
    status: "success",
    data: { token },
  });
};
