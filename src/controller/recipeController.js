const {
  getRecipe,
  getRecipeById,
  getRecipeSearchSortPagination,
  deleteRecipeById,
  postRecipe,
  putRecipe,
} = require("../model/recipeModel");

const recipeController = {
  getData: async (req, res, next) => {
    let dataRecipe = await getRecipe();
    console.log("dataRecipe");
    console.log(dataRecipe);
    if (dataRecipe) {
      res.status(200).json({
        status: 200,
        message: "get data recipe success",
        data: dataRecipe.rows,
      });
    }
  },
  getDataSearch: async (req, res, next) => {
    const { search, searchBy, offset, limit, order, sort } = req.query;
    let page = req.query.page || 1;
    let limiter = limit || 3;

    data = {
      order: order || "recipe.id",
      sort: sort || "ASC",
      search: search || "",
      searchBy: searchBy || "recipe_name",
      offset: (page - 1) * limiter,
      limit: limit || 3,
    };
    let dataSearch = await getRecipeSearchSortPagination(data);
    if (dataSearch) {
      res.status(200).json({
        status: 200,
        message: "get data recipe success",
        data: dataSearch.rows,
      });
    }
  },
  getDataById: async (req, res, next) => {
    const { id } = req.params;
    if (isNaN(id) || id < 0 || !id) {
      return res.status(404).json({ message: "id wrong" });
    }

    let dataRecipeId = await getRecipeById(parseInt(id));
    console.log("dataRecipeId");
    console.log(dataRecipeId);
    if (!dataRecipeId.rows[0]) {
      return res.status(200).json({
        status: 200,
        message: "get data recipe data not found",
        data: [],
      });
    }
    if (dataRecipeId) {
      res.status(200).json({
        status: 200,
        message: "get data recipe success",
        data: dataRecipeId.rows,
      });
    }
  },
  deleteDataById: async (req, res, next) => {
    const { id } = req.params;
    if (isNaN(id) || id < 0 || !id) {
      return res.status(404).json({ message: "id wrong" });
    }

    let deleteRecipeId = await deleteRecipeById(parseInt(id));
    console.log("deleteRecipeId");
    console.log(deleteRecipeId);
    if (deleteRecipeId) {
      res.status(200).json({
        status: 200,
        message: "delete data recipe success",
        data: deleteRecipeId.rows,
      });
    }
  },
  postData: async (req, res, next) => {
    const { recipe_name, recipe_desc, recipe_ingredients, category_id } =
      req.body;
    console.log("post data ");
    console.log(recipe_name, recipe_desc, recipe_ingredients, category_id);

    if (!recipe_name || !recipe_desc || !recipe_ingredients) {
      return res.status(404).json({
        message: "input recipe_name, recipe_desc, recipe_ingredients required",
      });
    }

    let data = {
      recipe_name: recipe_name,
      recipe_desc: recipe_desc,
      recipe_ingredients: recipe_ingredients,
      category_id: category_id,
    };

    console.log("data");
    console.log(data);

    try {
      let result = await postRecipe(data);
      console.log(result);

      return res
        .status(200)
        .json({ status: 200, message: "data recipe success", data });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  putData: async (req, res, next) => {
    const { id } = req.params;
    const { recipe_name, recipe_desc, recipe_ingredients } = req.body;

    if (!id || id <= 0 || isNaN(id)) {
      return res.status(404).json({ message: "id wrong" });
    }

    let data = {
      recipe_name: recipe_name,
      recipe_desc: recipe_desc,
      recipe_ingredients: recipe_ingredients,
    };

    try {
      let result = await putRecipe(parseInt(id), data); // Menggunakan putRecipe untuk update
      console.log(result);

      // delete data.id;
      return res
        .status(200)
        .json({ status: 200, message: "update data recipe success", data });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = recipeController;
