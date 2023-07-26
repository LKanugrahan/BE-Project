const { getUserByEmail, createUser } = require("../model/authModel");
const argon2 = require("argon2");
const { GenerateToken } = require("./../helpers/generateToken");

const AuthController = {
  register: async (req, res, next) => {
    let { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res
        .status(404)
        .json({
          status: 404,
          message: "email, password dan username harus diisi dengan benar",
        });
    }

    let user = await getUserByEmail(email);

    if (user.rows[0]) {
      return res
        .status(404)
        .json({
          status: 404,
          message: "email sudah terdaftar, silahkan login",
        });
    }

    password = await argon2.hash(password);

    let dataUser = {
      email,
      name,
      password,
    };

    let data = await createUser(dataUser);
    console.log(data);

    if (!data.rowCount == 1) {
      return res.status(404).json({ status: 404, message: "register gagal" });
    }

    return res
      .status(200)
      .json({ status: 200, message: "register user berhasil" });
  },

  login: async (req, res, next) => {
    let { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
      return res.status(404).json({
        status: 404,
        message: "email atau password harus diisi dengan benar",
      });
    }

    let data = await getUserByEmail(email);
    console.log(data.rows[0]);

    if (!data.rows[0]) {
      return res
        .status(404)
        .json({ status: 404, message: "email belum terdaftar" });
    }

    let users = data.rows[0];
    console.log("users.password");
    console.log(users.password);
    let verify = await argon2.verify(users.password, password);
    if (!verify) {
      return res.status(404).json({ status: 404, message: "password salah" });
    }
    delete users.password;
    let token = GenerateToken(users);
    users.token = token;

    res
      .status(200)
      .json({ status: 200, message: "get data profile success", users });
  },
};

module.exports = AuthController;

// try {
  //   const hash = await argon2.hash(password);
  //   if (hash) {
  //     return res
  //       .status(200)
  //       .json({ status: 200, message: "hash user berhasil", hash:hash,password:password });
  //   }
  // } catch (err) {
  //   return res.status(404).json({ status: 404, message: "hash user gagal",err });
  // }