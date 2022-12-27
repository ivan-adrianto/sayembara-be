const bcrypt = require("bcrypt");
const { User } = require("../../../models");
const Validator = require("fastest-validator");
const jwt = require("jsonwebtoken");
const v = new Validator();
const {
  JWT_SECRET,
  JWT_ACCESS_TOKEN_EXPIRED,
} = process.env;


module.exports = async (req, res) => {
  try {
    const schema = {
      fullname: "string|empty:false",
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

    const userEmail = await User.findOne({
      where: { email: req.body.email },
    });

    if (userEmail) {
      return res.status(409).json({
        status: "error",
        message: "email already exist",
      });
    }

    const password = await bcrypt.hash(req.body.password, 10);

    const data = {
      password,
      fullname: req.body.fullname,
      email: req.body.email,
      role: req.body.role || "participant",
    };

    const createdUser = await User.create(data);

    const dataCreatedUser = {
      id: createdUser.id,
      fullname: createdUser.fullname,
      email: createdUser.email,
      role: createdUser.role,
    };
  
    const token = jwt.sign({ data: dataCreatedUser }, JWT_SECRET, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRED, 
    });

    return res.json({
      status: "success",
      data: {
        ...dataCreatedUser,
        token
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
