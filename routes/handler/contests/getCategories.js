const { category } = require("../../../models");

module.exports = async (req, res) => {
  try {
    const categories = await category.findAll();
    return res.json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
