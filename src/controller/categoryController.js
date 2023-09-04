const { getCategory, getCategoryById } = require("../model/categoryModel");
const categoryController = {
    getData: async (req, res, next) => {
      let dataCategory = await getCategory();
      if (!dataCategory.rows[0]) {
        return res.status(200).json({
          status: 200,
          message: "get data category data not found",
          data: [],
        });
      }
      if (dataCategory) {
        res.status(200).json({
          status: 200,
          message: "get data category success",
          data: dataCategory.rows,
        });
      }
    },

    getDataById: async (req, res, next) => {
        const { id } = req.params;
        if (isNaN(id) || id < 0 || !id) {
          return res.status(404).json({ message: "wrong input id" });
        }
    
        let dataCategoryId = await getCategoryById(parseInt(id));
        if (!dataCategoryId.rows[0]) {
          return res.status(200).json({
            status: 200,
            message: "get data category data not found",
            data: [],
          });
        }
        if (dataCategoryId) {
          res.status(200).json({
            status: 200,
            message: "get data category success",
            data: dataCategoryId.rows,
          });
        }
      },

}

module.exports = categoryController;