const pg = require("../config/db");

// GET RECIPE
const getRecipe = () => {
  return new Promise((resolve, reject) => {
    pg.query(
      "SELECT recipe.id, recipe.recipe_name, recipe.recipe_desc, recipe.recipe_ingredients, recipe.recipe_image, category.category, users.name, users.created_at FROM recipe JOIN category ON recipe.category_id = category.id JOIN users ON recipe.users_id = users.id;",
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const getRecipeById = (id) => {
  return new Promise((resolve, reject) => {
    pg.query(
      `SELECT recipe.id, recipe.recipe_name, recipe.recipe_desc, recipe.recipe_ingredients, recipe.recipe_image, category.category, users.name, users.created_at FROM recipe JOIN category ON recipe.category_id = category.id JOIN users ON recipe.users_id = users.id WHERE recipe.id=${id}`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const getRecipeSearchSortPagination = async (data) => {
  const { search, searchBy, offset, limit, order, sort } = data;
  return new Promise((resolve, reject) => {
    pg.query(
      `SELECT recipe.id, recipe.recipe_name, recipe.recipe_desc, recipe.recipe_ingredients, recipe.recipe_image, category.category, users.name, users.created_at FROM recipe JOIN category ON recipe.category_id = category.id JOIN users ON recipe.users_id = users.id WHERE ${searchBy} ILIKE '%${search}%' ORDER BY ${order} ${sort} OFFSET ${offset} LIMIT ${limit}`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const postRecipe = async (data) => {
  const {
    recipe_name,
    recipe_desc,
    recipe_ingredients,
    category_id,
    users_id,
    recipe_image,
  } = data;
  console.log(data);
  console.log("model postRecipe");
  return new Promise((resolve, reject) =>
    pg.query(
      `INSERT INTO recipe (recipe_name, recipe_desc, recipe_ingredients, category_id, users_id, recipe_image) VALUES('${recipe_name}','${recipe_desc}','${recipe_ingredients}', '${category_id}', '${users_id}', '${recipe_image}')`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    )
  );
};

const putRecipe = async (data, id) => {
  const {
    recipe_name,
    recipe_desc,
    recipe_ingredients,
    category_id,
    recipe_image,
  } = data;
  console.log("model putRecipe");
  return new Promise((resolve, reject) =>
    pg.query(
      `UPDATE recipe SET recipe_name='${recipe_name}', recipe_desc='${recipe_desc}', recipe_ingredients='${recipe_ingredients}', category_id=${category_id}, recipe_image='${recipe_image}' WHERE id=${id}`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    )
  );
};

const deleteRecipeById = (id) => {
  return new Promise((resolve, reject) => {
    pg.query(`DELETE FROM recipe WHERE id = ${id}`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  getRecipe,
  getRecipeById,
  getRecipeSearchSortPagination,
  postRecipe,
  putRecipe,
  deleteRecipeById,
};
