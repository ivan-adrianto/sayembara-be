const { Op } = require("sequelize");
const { contest, category, submission, User } = require("../../../models");
contest.hasOne(category, { foreignKey: "id", sourceKey: "category_id" });
contest.hasOne(User, {
  foreignKey: "id",
  sourceKey: "provider_id",
});

module.exports = async (req, res) => {
  const category_id = req.query.category_id || "";
  const title = req.query.title || "";
  try {
    const contests = await contest.findAll({
      where: {
        category_id: { [Op.like]: `%${category_id}%` },
        title: { [Op.like]: `%${title}%` },
      },
      include: [
        { model: category },
        { model: User, attributes: ["fullname"], as: "provider" },
      ],
      attributes: [
        "id",
        "winner_id",
        "title",
        "created_at",
        "prize",
        "description",
        "due_date",
      ],
    });

    for (let i = 0; i < contests.length; i++) {
      if (contests[i].winner_id === req.user.id) {
        delete contests[i].dataValues.winner_id;
        contests[i].dataValues = {
          ...contests[i].dataValues,
          join_status: "winner",
        };
      } else {
        delete contests[i].dataValues.winner_id;
        const existingSubmission = await submission.findOne({
          where: { contest_id: contests[i].id, participant_id: req.user.id },
        });
        contests[i].dataValues = {
          ...contests[i].dataValues,
          join_status: existingSubmission ? "joined" : "not join",
        };
      }
      contests[i].dataValues.prize_text = contests[i].dataValues.prize
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return res.json({
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
