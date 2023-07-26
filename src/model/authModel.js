const pg = require("../config/db");

const getUserByEmail = async (email) => {
  console.log("model getUserByEmail");
  return new Promise((resolve, reject) =>
    pg.query(`SELECT * FROM users WHERE email='${email}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  );
};

const createUser = async (data) => {
  let { name, email, password } = data;
  console.log("model createUser");
  return new Promise((resolve, reject) =>
    pg.query(
      `INSERT INTO users(name,email,password) VALUES('${name}','${email}','${password}')`,
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

module.exports = { getUserByEmail, createUser };
