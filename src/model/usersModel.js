const pg = require("../config/db");

// GET Users
const getUsers = () => {
  return new Promise((resolve, reject) => {
    pg.query("SELECT * FROM users;", (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// Buat validasi deleteUsersById
const getUsersById = async (id) => {
  return new Promise((resolve, reject) => {
    pg.query(
      `SELECT name, email, photo, password FROM users WHERE id=${id}`,
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

const deleteUsersById = (id) => {
  return new Promise((resolve, reject) => {
    pg.query(`DELETE FROM users WHERE id = ${id}`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  getUsers,
  getUsersById,
  deleteUsersById,
};
