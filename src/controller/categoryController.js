const { getCategory, getCategoryById } = require("../model/categoryModel");
const categoryController = {
    getData: async (req, res, next) => {
      let dataCategory = await getCategory();
      console.log("dataCategory");
      console.log(dataCategory);
      if (dataCategory) {
        res.status(200).json({
          status: 200,
          message: "get data Category success",
          data: dataCategory.rows,
        });
      }
    },

    getDataById: async (req, res, next) => {
        const { id } = req.params;
        if (isNaN(id) || id < 0 || !id) {
          return res.status(404).json({ message: "id wrong" });
        }
    
        let dataCategoryId = await getCategoryById(parseInt(id));
        console.log("dataCategoryId");
        console.log(dataCategoryId);
        if (!dataCategoryId.rows[0]) {
          return res.status(200).json({
            status: 200,
            message: "get data Category data not found",
            data: [],
          });
        }
        if (dataCategoryId) {
          res.status(200).json({
            status: 200,
            message: "get data Category success",
            data: dataCategoryId.rows,
          });
        }
      },

}

module.exports = categoryController;