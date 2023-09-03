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
      `INSERT INTO users(name,email,password,photo) VALUES('${name}','${email}','${password}', 'https://res.cloudinary.com/dafjb9vn7/image/upload/v1693639658/profile_cmqdrx.png')`,
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
