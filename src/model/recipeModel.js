const pg = require("../config/db");

// GET RECIPE
const getRecipe = () => {
  return new Promise((resolve, reject) => {
    pg.query(
      "SELECT recipe.id, recipe.recipe_name, recipe.recipe_ingredients, recipe.recipe_image, category.category, users.name, users.created_at FROM recipe JOIN category ON recipe.category_id = category.id JOIN users ON recipe.users_id = users.id;",
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
      `SELECT recipe.id, recipe.recipe_name, recipe.recipe_ingredients, recipe.recipe_image, recipe.users_id, recipe.category_id, category.category, users.name, users.created_at FROM recipe JOIN category ON recipe.category_id = category.id JOIN users ON recipe.users_id = users.id WHERE recipe.id=${id}`,
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
      `SELECT recipe.id, recipe.recipe_name, recipe.recipe_ingredients, recipe.recipe_image, recipe.users_id, category.category, users.name, users.created_at FROM recipe JOIN category ON recipe.category_id = category.id JOIN users ON recipe.users_id = users.id WHERE ${searchBy} ILIKE '%${search}%' ORDER BY ${order} ${sort} OFFSET ${offset} LIMIT ${limit}`,
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

const getCount = async () => {
  console.log("model getHomeCount")
  return new Promise((resolve,reject)=>
      pg.query(`SELECT COUNT(*) FROM recipe`,(err,result)=>{
          if(!err){
              resolve(result)
          } else{
              reject(err)
          }
      })
  )
}

const postRecipe = async (data) => {
  const {
    recipe_name,
    recipe_ingredients,
    category_id,
    users_id,
    recipe_image,
  } = data;
  return new Promise((resolve, reject) =>
    pg.query(
      `INSERT INTO recipe (recipe_name, recipe_ingredients, category_id, users_id, recipe_image) VALUES('${recipe_name}','${recipe_ingredients}', '${category_id}', '${users_id}', '${recipe_image}')`,
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

const putRecipe = async (id, data) => {
  const {
    recipe_name,
    recipe_ingredients,
    category_id,
    users_id,
    recipe_image,
  } = data;
  return new Promise((resolve, reject) =>
    pg.query(
      `UPDATE recipe SET recipe_name='${recipe_name}', recipe_ingredients='${recipe_ingredients}', category_id=${category_id}, recipe_image='${recipe_image}' WHERE recipe.id=${id}`,
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

//TODO: KHUSUS MOBILE
const getRecipeByUserId = (id) => {
  return new Promise((resolve, reject) => {
    pg.query(
      `SELECT recipe.id, recipe.recipe_name, recipe.recipe_ingredients, recipe.recipe_image, recipe.users_id, recipe.category_id, category.category, users.name, users.created_at FROM recipe JOIN category ON recipe.category_id = category.id JOIN users ON recipe.users_id = users.id WHERE recipe.users_id=${id}`,
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


module.exports = {
  getRecipe,
  getRecipeById,
  getRecipeSearchSortPagination,
  getCount,
  postRecipe,
  putRecipe,
  deleteRecipeById,
  //TODO: KHUSUS MOBILE
  getRecipeByUserId
};
