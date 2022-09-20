const { submission, submissionImage } = require("../../../models");
const isBase64 = require("is-base64")
const base64Img = require("base64-img")
const Validator = require("fastest-validator");
const v = new Validator();
const { FOLDER_URL } = process.env

module.exports = async (req, res) => {
  try {
    const schema = {
      contest_id: "number|empty:false",
      images: "array|empty:false",
      title: "string|empty:false",
      description: "string|empty:false",
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
      return res.status(400).json({
        status: "error",
        message: validate[0].message,
      });
    }

    const participant_id = req.user.id;
    const userHasSubmitted = await submission.findOne({
      where: { participant_id, contest_id: req.body.contest_id },
    });

    if (userHasSubmitted) {
      return res.status(409).json({
        status: "error",
        message: "You already submitted your work. You can only submit your work once per contest.",
      });
    }

    if (!isBase64(req.body.images[0], { mimeRequired: true })) {
      return res
        .status(400)
        .json({ status: "error", message: "invalid base64" });
    }

    const filepath = base64Img.imgSync(
      req.body.images[0],
      "./public/images",
      Date.now()
    );
    const filename = filepath.split("/").pop();
    let thumbnail = `${FOLDER_URL}/images/${filename}`;

    const dataSubmission = {
      participant_id: req.user.id,
      contest_id: req.body.contest_id,
      thumbnail,
      title: req.body.title,
      description: req.body.description,
    };

    const createdSubmission = await submission.create(dataSubmission);

    const images = req.body.images;
    for (let i = 0; i < images.length; i++) {
      if (!isBase64(images[i], { mimeRequired: true })) {
        return res
          .status(400)
          .json({ status: "error", message: "invalid base64" });
      }

      const filepath = base64Img.imgSync(
        images[i],
        "./public/images",
        Date.now()
      );
      const filename = filepath.split("/").pop();
      let image = `${FOLDER_URL}/images/${filename}`;

      await submissionImage.create({ submission_id: createdSubmission.id, image });
    }

    return res.json({
      status: "success",
      message: "Your submission successfully submitted",
      data: { title: createdSubmission.title },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
