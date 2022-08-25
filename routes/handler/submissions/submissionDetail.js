const { submission, submissionImage, User } = require("../../../models");
submission.hasOne(User, {
  foreignKey: "id",
  sourceKey: "participant_id",
  as: "participant",
});

module.exports = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await submission.findOne({
      where: { id },
      include: [{ model: User, attributes: ["fullname"], as: "participant" }],
      attributes: ["id", "title", "description"],
    });

    if (data) {
      const images = await submissionImage.findAll({
        where: { submission_id: id },
        attributes: ["id", "image"],
      });
      data.dataValues.images = images;
    } else {
      return res.status(400).json({
        status: "error",
        message: "submission not found",
      });
    }

    res.json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
