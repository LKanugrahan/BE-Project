const {
  getUserByEmail,
  createUser,
} = require("../model/authModel");
const argon2 = require("argon2");
const { GenerateToken } = require("./../helpers/generateToken");

const AuthController = {
  register: async (req, res, next) => {
    let { email, password, name, photo } = req.body;

    if (!email || !password || !name) {
      return res.status(404).json({
        status: 404,
        message: "input correctly, please",
      });
    }

    let user = await getUserByEmail(email);

    if (user.rows[0]) {
      return res.status(404).json({
        status: 404,
        message: "Email is already registered",
      });
    }

    password = await argon2.hash(password);

    let dataUser = {
      email,
      name,
      password,
      photo,
    };

    let data = await createUser(dataUser);
    console.log("create");
    console.log(data);

    if (!data.rowCount == 1) {
      return res.status(404).json({ status: 404, message: "register failed" });
    }

    return res
      .status(200)
      .json({ status: 200, message: "User registration successful", dataUser });
  },

  login: async (req, res, next) => {
    let { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
      return res.status(404).json({
        status: 404,
        message: "input correctly, please",
      });
    }

    let data = await getUserByEmail(email);
    console.log(data.rows[0]);

    if (!data.rows[0]) {
      return res
        .status(404)
        .json({ status: 404, message: "Email is not yet registered" });
    }

    let users = data.rows[0];
    console.log("users.password");
    console.log(users.password);
    let verify = await argon2.verify(users.password, password);
    if (!verify) {
      return res.status(404).json({ status: 404, message: "Invalid password" });
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
