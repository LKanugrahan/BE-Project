const {
  getUserByEmail,
  createUser,
  getUsersById,
  putUsers
} = require("../model/authModel");
const argon2 = require("argon2");
const { GenerateToken } = require("./../helpers/generateToken");
const cloudinary = require("../config/photo");


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

    let input = {
      email,
      name,
      password,
      photo,
    };

    let regist = await createUser(input);

    if (!regist.rowCount == 1) {
      return res.status(404).json({ status: 404, message: "register failed" });
    }

    let dataUser = await getUserByEmail(email)
    let data = dataUser.rows[0]

    delete data.password

    return res
      .status(200)
      .json({ status: 200, message: "User registration successful", data });
  },

  login: async (req, res, next) => {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        status: 404,
        message: "input correctly, please",
      });
    }

    let dataUser = await getUserByEmail(email);

    if (!dataUser.rows[0]) {
      return res
        .status(404)
        .json({ status: 404, message: "Email is not yet registered" });
    }

    let data = dataUser.rows[0];

    let verify = await argon2.verify(data.password, password);
    if (!verify) {
      return res.status(404).json({ status: 404, message: "Invalid password" });
    }
    delete data.password;
    let token = GenerateToken(data);
    data.token = token;

    res
      .status(200)
      .json({ status: 200, message: "get data profile success", data });
  },

  putData: async (req, res, next) => {
    const { id } = req.params;
    const { name, email, password, photo } = req.body;

    if (!id || id <= 0 || isNaN(id)) {
      return res.status(404).json({ message: "wrong input id" });
    }

    let dataUsersId = await getUsersById(parseInt(id));

    if (!dataUsersId.rows[0]) {
      return res.status(200).json({
        status: 200,
        message: "get data user data not found",
        data: [],
      });
    }

    let users_id = req.payload.id;

    if (users_id != dataUsersId.rows[0].id) {
      return res.status(404).json({ message: "not your profile" });
    }

    let newPassword
    if (password) {
      newPassword = await argon2.hash(password)
    }

    if (!req.file) {
      let data = {
        name: name || dataUsersId.rows[0].name,
        email: email || dataUsersId.rows[0].email,
        password: newPassword || dataUsersId.rows[0].password,
        photo: dataUsersId.rows[0].photo,
      };

      let updateUsersId = await putUsers(parseInt(id), data);
      console.log(updateUsersId);
      let dataAfter = await getUsersById(parseInt(id));

      delete dataUsersId.rows[0].password
      delete dataAfter.rows[0].password

      let token = GenerateToken(data);
      data.token = token;

      return res
        .status(200)
        .json({
          status: 200,
          message: "update data user success",
          dataBefore: dataUsersId.rows,
          data: dataAfter.rows,
        });
    } else {
      if (!req.isFileValid) {
        return res.status(404).json({ message: req.isFileValidMessage });
      }

      const ImageCloud = await cloudinary.uploader.upload(req.file.path, {
        folder: "be-project",
      });

      if (!ImageCloud) {
        return res.status(404).json({ message: "upload photo fail" });
      }
      let data = {
        name: name || dataUsersId.rows[0].name,
        email: email || dataUsersId.rows[0].email,
        password: newPassword || dataUsersId.rows[0].password,
        photo: ImageCloud.secure_url,
      };

      let updateUsersId = await putUsers(parseInt(id), data);
      console.log(updateUsersId);
      let dataAfter = await getUsersById(parseInt(id));

      delete dataUsersId.rows[0].password
      delete dataAfter.rows[0].password

      let token = GenerateToken(data);
      data.token = token;

      return res
        .status(200)
        .json({
          status: 200,
          message: "update data user success",
          dataBefore: dataUsersId.rows,
          data: dataAfter.rows,
        });
    }
  },
};

module.exports = AuthController;