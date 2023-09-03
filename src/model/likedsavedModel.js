const pg = require("../config/db");
const getLikedRecipe = () => {
  return new Promise((resolve, reject) => {
    pg.query("SELECT FROM recipe JOIN liked_saved ON ", (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getLikedRecipeById = (id) => {
    return new Promise((resolve, reject) => {
      pg.query(`SELECT * FROM category WHERE category.id=${id}`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

module.exports = { getLikedRecipe,getLikedRecipeById };
