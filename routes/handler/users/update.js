const { User } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();
const isBase64 = require("is-base64");
const base64Img = require("base64-img");
const { FOLDER_URL } = process.env;

module.exports = async (req, res) => {
  try {
    const schema = {
      fullname: "string|empty:false",
      location: "string|optional",
      account_number: "number|optional",
      bank: "string|optional",
      avatar: "string|optional",
    };

    const validate = v.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json({
        status: "error",
        message: validate[0].message,
      });
    }

    const id = req.user.id;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "user not found",
      });
    }

    let avatar = "";
    if (req.body.avatar && req.body.avatar !== user.avatar) {
      const image = req.body.avatar;

      if (!isBase64(image, { mimeRequired: true })) {
        return res
          .status(400)
          .json({ status: "error", message: "invalid base64" });
      }

      const filepath = base64Img.imgSync(image, "./public/images", Date.now());
      const filename = filepath.split("/").pop();
      avatar = `${FOLDER_URL}/images/${filename}`;
    }
    
    if (req.body.avatar === null) {
      avatar = null;
    }

    await user.update({
      fullname: req.body.fullname,
      avatar: avatar === "" ? user.avatar : avatar,
      bank: req.body.bank || user.bank,
      account_number: req.body.account_number || user.account_number,
      location: req.body.location || user.location,
    });

    return res.json({
      status: "success",
      data: {
        id: user.id,
        fullname: req.body.fullname,
        avatar,
        bank: req.body.bank || user.bank,
        account_number: req.body.account_number || user.account_number,
        location: req.body.location || user.location,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
