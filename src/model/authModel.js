const pg = require("../config/db");

const getUserByEmail = async (email) => {
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

const getUsersById = async (id) => {
  return new Promise((resolve, reject) => {
    pg.query(
      `SELECT id, name, email, photo, password FROM users WHERE id=${id}`,
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

const putUsers = async (id, data) => {
  const { name, email, password, photo } = data;
  return new Promise((resolve, reject) =>
    pg.query(
      `UPDATE users SET name='${name}', email='${email}', password='${password}', photo='${photo}' WHERE id=${id}`,
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

module.exports = { getUserByEmail, createUser, getUsersById, putUsers };
