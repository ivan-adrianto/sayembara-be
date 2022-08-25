const { Op } = require("sequelize");
const { contest, category, User, submission } = require("../../../models");
contest.hasOne(category, { foreignKey: "id", sourceKey: "category_id" });
contest.hasOne(User, {
  foreignKey: "id",
  sourceKey: "provider_id",
});

module.exports = async (req, res) => {
  const id = req.params.id;
  try {
    const contests = await contest.findOne({
      where: { id },
      include: [{ model: category }, { model: User, attributes: ["fullname"], as: "provider" }],
      attributes: [
        "id",
        "title",
        "created_at",
        "prize",
        "description",
        "due_date",
        "announcement_date",
      ],
    });

    const submissions = await submission.findAll({
      where: { contest_id: id },
      attributes: ["id", "thumbnail", "title", "description"],
    });
    contests.dataValues.submissions = submissions;

    res.json({
      status: "success",
      data: contests,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
