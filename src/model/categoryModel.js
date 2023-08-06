const pg = require("../config/db");
const getCategory = () => {
  return new Promise((resolve, reject) => {
    pg.query("SELECT * FROM category", (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getCategoryById = (id) => {
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

module.exports = { getCategory,getCategoryById };
