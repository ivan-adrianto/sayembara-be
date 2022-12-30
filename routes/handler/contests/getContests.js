const { Op } = require("sequelize");
const { timeDiff, prizeToText, formatDate } = require("../../../helpers/converter");
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

    if (contests.length === 0) {
      return res.status(404).json({ msg: "Contest not found" });
    }

    for (let i = 0; i < contests.length; i++) {
      if (contests[i].winner_id === req.user.id) {
        delete contests[i].dataValues.winner_id;
        contests[i].dataValues = {
          ...contests[i].dataValues,
          join_status: "winner",
        };
      } else {
        const item = contests[i].dataValues
        delete contests[i].dataValues.winner_id;
        const existingSubmission = await submission.findOne({
          where: { contest_id: contests[i].id, participant_id: req.user.id },
        });
        contests[i].dataValues = {
          ...contests[i].dataValues,
          join_status: existingSubmission ? "joined" : "not join",
        };
      }
      contests[i].dataValues.prize_text = prizeToText(contests[i].dataValues.prize)
      contests[i].dataValues.posted_since = timeDiff(
        contests[i].dataValues.created_at
      );
      contests[i].dataValues.due_date = formatDate(contests[i].dataValues.due_date)
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
