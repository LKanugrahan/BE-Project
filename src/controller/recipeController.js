const {
  getRecipe,
  getRecipeById,
  getRecipeSearchSortPagination,
  getCount,
  postRecipe,
  putRecipe,
  deleteRecipeById,
  //TODO: KHUSUS MOBILE
  getRecipeByUserId,
} = require("../model/recipeModel");

const cloudinary = require("../config/photo");

const recipeController = {
  getData: async (req, res, next) => {
    let dataRecipe = await getRecipe();

    if (!dataRecipe.rows[0]) {
      return res.status(200).json({
        status: 200,
        message: "get data recipe data not found",
        data: [],
      });
    }
    if (dataRecipe) {
      res.status(200).json({
        status: 200,
        message: "get data recipe success",
        data: dataRecipe.rows,
      });
    }
  },
  getDataById: async (req, res, next) => {
    const { id } = req.params;

    if (isNaN(id) || id < 0 || !id) {
      return res.status(404).json({ message: "wrong input id" });
    }
    let dataRecipeId = await getRecipeById(parseInt(id));

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
  getDataSearch: async (req, res, next) => {
    const { order, sort, search, searchBy, limit, offset } = req.query;
    let limiter = limit || 5;
    let page = req.query.page || 1,
      data = {
        order: order || "recipe.id",
        sort: sort || "ASC",
        search: search || "",
        searchBy: searchBy || "recipe_name",
        limit: limit || 3,
        offset: (page - 1) * limiter || 0,
      };

    let dataSearch = await getRecipeSearchSortPagination(data);
    if (!dataSearch.rows[0]) {
      return res.status(200).json({
        status: 200,
        message: "get data recipe data not found",
        data: [],
      });
    }

    let dataCount = await getCount(data);

    let pagination = {
      totalPage: Math.ceil(dataCount.rows[0].count / limiter),
      totalData: parseInt(dataCount.rows[0].count),
      pageNow: parseInt(page),
    };
    if (dataSearch) {
      res.status(200).json({
        status: 200,
        message: "get data recipe success",
        data: dataSearch.rows,
        pagination,
      });
    }
  },
  postData: async (req, res, next) => {
    const { recipe_name, recipe_ingredients, category_id, recipe_image } =
      req.body;

    if (!req.isFileValid) {
      return res.status(404).json({ message: req.isFileValidMessage });
    }

    const ImageCloud = await cloudinary.uploader.upload(req.file.path, {
      folder: "be-project",
    });

    if (!ImageCloud) {
      return res.status(404).json({ message: "upload photo fail" });
    }

    let users_id = req.payload.id;

    if (!recipe_name || !recipe_ingredients || !category_id || !users_id) {
      return res.status(404).json({
        message: "input correctly",
      });
    }

    let dataRecipe = {
      recipe_name,
      recipe_ingredients,
      category_id,
      users_id,
      recipe_image: ImageCloud.secure_url,
    };

    let data = await postRecipe(dataRecipe);

    return res
      .status(200)
      .json({ status: 200, message: "data recipe success", data });
  },

  putData: async (req, res, next) => {
    const { id } = req.params;
    const { recipe_name, recipe_ingredients, category_id, recipe_image } =
      req.body;

    if (!id || id <= 0 || isNaN(id)) {
      return res.status(404).json({ message: "wrong input id" });
    }

    let dataRecipeId = await getRecipeById(parseInt(id));

    let users_id = req.payload.id;

    if (users_id != dataRecipeId.rows[0].users_id) {
      return res.status(404).json({ message: "not your recipe" });
    }

    if (!dataRecipeId.rows[0]) {
      return res.status(200).json({
        status: 200,
        message: "get data recipe data not found",
        data: [],
      });
    }

    if (!req.file) {
      let data = {
        recipe_name: recipe_name || dataRecipeId.rows[0].recipe_name,
        recipe_ingredients:
          recipe_ingredients || dataRecipeId.rows[0].recipe_ingredients,
        users_id: parseInt(users_id) || dataRecipeId.rows[0].users_id,
        category_id: parseInt(category_id) || dataRecipeId.rows[0].category_id,
        recipe_image: dataRecipeId.rows[0].recipe_image,
      };

      let result = await putRecipe(parseInt(id), data);
      let after = await getRecipeById(parseInt(id));
      return res.status(200).json({
        status: 200,
        message: "update data recipe success",
        data,
        after: after.rows[0],
      });
    } else {
      if (!req.isFileValid) {
        return res.status(404).json({ message: req.isFileValidMessage });
      }

      const ImageCloud = await cloudinary.uploader.upload(req.file.path, {
        folder: "be-project",
      });

      if (!ImageCloud) {
        return res.status(404).json({ message: "upload photo fail" });
      }

      let data = {
        recipe_name: recipe_name || dataRecipeId.rows[0].recipe_name,
        recipe_ingredients:
          recipe_ingredients || dataRecipeId.rows[0].recipe_ingredients,
        users_id: parseInt(users_id) || dataRecipeId.rows[0].users_id,
        category_id: parseInt(category_id) || dataRecipeId.rows[0].category_id,
        recipe_image: ImageCloud.secure_url,
      };

      let result = await putRecipe(parseInt(id), data);
      let after = await getRecipeById(parseInt(id));
      return res.status(200).json({
        status: 200,
        message: "update data recipe success",
        data,
        after: after.rows[0],
      });
    }
  },

  deleteDataById: async (req, res, next) => {
    const { id } = req.params;
    if (isNaN(id) || id < 0 || !id) {
      return res.status(404).json({ message: "wrong input id" });
    }
    let dataRecipeId = await getRecipeById(parseInt(id));

    let users_id = req.payload.id;

    if (!dataRecipeId.rows[0]) {
      return res.status(200).json({
        status: 200,
        message: "get data recipe data not found",
        data: [],
      });
    }

    if (users_id != dataRecipeId.rows[0].users_id) {
      return res.status(404).json({ message: "not your recipe" });
    }

    let deleteRecipeId = await deleteRecipeById(parseInt(id));

    if (deleteRecipeId) {
      res.status(200).json({
        status: 200,
        message: "delete data recipe success",
        data: dataRecipeId.rows,
        dataDelete: deleteRecipeId.rows,
      });
    }
  },
  //TODO: KHUSUS MOBILE
  getDataByUserId: async (req, res, next) => {
    const { id } = req.params;

    if (isNaN(id) || id < 0 || !id) {
      return res.status(404).json({ message: "wrong input id" });
    }
    let dataRecipeId = await getRecipeByUserId(parseInt(id));
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
};

module.exports = recipeController;
