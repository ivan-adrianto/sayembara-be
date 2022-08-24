const { Op } = require("sequelize");
const { contest, category, User } = require("../../../models");
contest.hasOne(category, { foreignKey: "id", sourceKey: "category_id" });
contest.hasOne(User, {
  foreignKey: "id",
  sourceKey: "provider_id",
  as: "provider",
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
      attributes: ["id", "title", "created_at", "prize", "description"],
    });
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
