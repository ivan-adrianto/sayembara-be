const { Op } = require("sequelize");
const {
  prizeToText,
  timeDiff,
  formatDate,
} = require("../../../helpers/converter");
const { contest, submission, User } = require("../../../models");
contest.hasOne(User, {
  foreignKey: "id",
  sourceKey: "provider_id",
  as: "provider",
});

module.exports = async (req, res) => {
  const category_id = req.query.category_id || "";
  const title = req.query.title || "";
  try {
    const submissions = await submission.findAll({
      where: { participant_id: req.user.id },
    });
    let data = [];
    for (let i = 0; i < submissions.length; i++) {
      const item = await contest.findOne({
        where: {
          id: submissions[i].contest_id,
          category_id: { [Op.like]: `%${category_id}%` },
          title: { [Op.like]: `%${title}%` },
        },
        include: [{ model: User, attributes: ["fullname"], as: "provider" }],
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
      if (item) {
        if (item.dataValues.winner_id == req.user.id) {
          item.dataValues.join_status = "winner";
        } else {
          item.dataValues.join_status = "joined";
        }
        delete item.dataValues.winner_id;
        item.dataValues.prize_text = prizeToText(item.prize);
        item.dataValues.posted_since = timeDiff(item.created_at);
        item.dataValues.due_date = formatDate(item.dataValues.due_date);
        data.push(item);
      }
    }

    return res.json({
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
