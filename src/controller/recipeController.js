const {
  getRecipe,
  getRecipeById,
  getRecipeSearchSortPagination,
  postRecipe,
  putRecipe,
  deleteRecipeById,
} = require("../model/recipeModel");

const cloudinary = require("../config/photo");

const recipeController = {
  getData: async (req, res, next) => {
    let dataRecipe = await getRecipe();
    console.log("data Recipe");
    console.log(dataRecipe);
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
    // let numberId = parseInt(req.params.id)
    // console.log(numberId)
    if (isNaN(id) || id < 0 || !id) {
      return res.status(404).json({ message: "wrong input id" });
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
  getDataSearch: async (req, res, next) => {
    const { page, order, sort, search, searchBy, limit, offset } = req.query;
    data = {
      page: page || 1,
      order: order || "recipe.id",
      sort: sort || "ASC",
      search: search || "",
      searchBy: searchBy || "recipe_name",
      limit: limit || 3,
      offset: (page - 1) * limit,
    };
    console.log(data);
    let dataSearch = await getRecipeSearchSortPagination(data);
    if (!dataSearch.rows[0]) {
      return res.status(200).json({
        status: 200,
        message: "get data recipe data not found",
        data: [],
      });
    }
    if (dataSearch) {
      res.status(200).json({
        status: 200,
        message: "get data recipe success",
        data: dataSearch.rows,
      });
    }
  },
  postData: async (req, res, next) => {
    const {
      recipe_name,
      recipe_desc,
      recipe_ingredients,
      category_id,
      recipe_image,
    } = req.body;
    console.log("post file");
    console.log(req.file);

    console.log(req.body);

    console.log("post data");

    console.log(
      recipe_name,
      recipe_desc,
      recipe_ingredients,
      category_id,
      recipe_image
    );

    if (!req.isFileValid) {
      return res.status(404).json({ message: req.isFileValidMessage });
    }

    const ImageCloud = await cloudinary.uploader.upload(req.file.path, {
      folder: "be-project",
    });

    if (!ImageCloud) {
      return res.status(404).json({ message: "upload photo fail" });
    }
    console.log(ImageCloud);




    let users_id = req.payload.id;
    console.log("payload");
    console.log(req.payload);

    if (
      !recipe_name ||
      !recipe_desc ||
      !recipe_ingredients ||
      !category_id ||
      !users_id
    ) {
      return res.status(404).json({
        message: "input correctly",
      });
    }

    let data = {
      recipe_name,
      recipe_desc,
      recipe_ingredients,
      category_id,
      users_id,
      recipe_image: ImageCloud.secure_url,
    };

    console.log("data");
    console.log(data);

    let result = await postRecipe(data);
    console.log(result);

    return res
      .status(200)
      .json({ status: 200, message: "data recipe success", data });
  },

  putData: async (req, res, next) => {
    const { id } = req.params;
    const {
      recipe_name,
      recipe_desc,
      recipe_ingredients,
      category_id,
      recipe_image,
    } = req.body;
    console.log("req.body")
    console.log(req.body)

    if (!id || id <= 0 || isNaN(id)) {
      return res.status(404).json({ message: "wrong input id" });
    }

    let dataRecipeId = await getRecipeById(parseInt(id));

    let users_id = req.payload.id;

    console.log("id data");
    console.log(users_id);
    console.log(dataRecipeId.rows[0].users_id);
    if (users_id != dataRecipeId.rows[0].users_id) {
      return res.status(404).json({ message: "not your recipe" });
    }

    console.log("dataRecipeId");
    console.log(dataRecipeId);
    if (!dataRecipeId.rows[0]) {
      return res.status(200).json({
        status: 200,
        message: "get data recipe data not found",
        data: [],
      });
    }

    if (!req.isFileValid) {
      return res.status(404).json({ message: req.isFileValidMessage });
    }

    const ImageCloud = await cloudinary.uploader.upload(req.file.path, {
      folder: "be-project",
    });

    if (!ImageCloud) {
      return res.status(404).json({ message: "upload photo fail" });
    }
    console.log(ImageCloud);

    console.log("put data");
    console.log(dataRecipeId.rows[0]);
    let data = {
      recipe_name: recipe_name || dataRecipeId.rows[0].recipe_name,
      recipe_desc: recipe_desc || dataRecipeId.rows[0].recipe_desc,
      recipe_ingredients:
        recipe_ingredients || dataRecipeId.rows[0].recipe_ingredients,
      users_id: parseInt(users_id) || dataRecipeId.rows[0].users_id,
      category_id: parseInt(category_id) || dataRecipeId.rows[0].category_id,
      recipe_image: ImageCloud.secure_url || dataRecipeId.rows[0].recipe_image,
    };

    let result = await putRecipe(parseInt(id), data);
    let after = await getRecipeById(parseInt(id))
    console.log(result);
    return res
      .status(200)
      .json({ status: 200, message: "update data recipe success", data, after: after.rows[0] });
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

    console.log("id data");
    console.log(users_id);
    console.log(dataRecipeId.rows[0]);
    if (users_id != dataRecipeId.rows[0].users_id) {
      return res.status(404).json({ message: "not your recipe" });
    }

    let deleteRecipeId = await deleteRecipeById(parseInt(id));
    console.log("deleteRecipeId");
    console.log(deleteRecipeId);
    console.log(dataRecipeId.rows);
    if (deleteRecipeId) {
      res.status(200).json({
        status: 200,
        message: "delete data recipe success",
        data: dataRecipeId.rows,
        dataDelete: deleteRecipeId.rows,
      });
    }
  },
};

module.exports = recipeController;
