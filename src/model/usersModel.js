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


const postUsers = async (data) => {
    const { name, email, phone_number, password } = data;
    console.log(data);
    console.log("model postUsers");
    return new Promise((resolve, reject) =>
      pg.query(
        `INSERT INTO users (name, email, phone_number, password) VALUES('${name}','${email}','${phone_number}', '${password}')`,
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
  

const putUsers = async (id, data) => {
    const { name, email, phone_number, password } = data;
    console.log("model putUsers");
    return new Promise((resolve, reject) =>
      pg.query(
        `UPDATE users SET name='${name}', email='${email}', phone_number='${phone_number}', password='${password}'WHERE id=${id}`,
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

module.exports = {getUsers,postUsers,putUsers,deleteUsersById,/*getUsersById,*/};
