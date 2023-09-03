const cloudinary = require("../config/photo");
const {
  getUsers,
  getUsersById,
  putUsers,
  deleteUsersById,
} = require("../model/usersModel");
const argon2 = require("argon2");

const UsersController = {
  getData: async (req, res, next) => {
    let dataUsers = await getUsers();
    if (!dataUsers.rows[0]) {
      return res.status(200).json({
        status: 200,
        message: "get data user data not found",
        data: [],
      });
    }
    if (dataUsers) {
      res.status(200).json({
        status: 200,
        message: "get data user success",
        data: dataUsers.rows,
      });
    }
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

      return res
        .status(200)
        .json({
          status: 200,
          message: "update data user success",
          dataBefore: dataUsersId.rows,
          dataAfter: dataAfter.rows,
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
      console.log("put data");
      let data = {
        name: name || dataUsersId.rows[0].name,
        email: email || dataUsersId.rows[0].email,
        password: newPassword || dataUsersId.rows[0].password,
        photo: ImageCloud.secure_url,
      };

      let updateUsersId = await putUsers(parseInt(id), data);
      console.log(updateUsersId);
      let dataAfter = await getUsersById(parseInt(id));

      return res
        .status(200)
        .json({
          status: 200,
          message: "update data user success",
          dataBefore: dataUsersId.rows,
          dataAfter: dataAfter.rows,
        });
    }
  },
  getDataById: async (req, res, next) => {
    const { id } = req.params;
    if (isNaN(id) || id < 0 || !id) {
      return res.status(404).json({ message: "wrong input data" });
    }
    let dataUsers = await getUsersById(parseInt(id));
    if (!dataUsers.rows[0]) {
      return res.status(200).json({
        status: 200,
        message: "get data user data not found",
        data: [],
      });
    }
    if (dataUsers) {
      res.status(200).json({
        status: 200,
        message: "get data user success",
        data: dataUsers.rows,
      });
    }
  },
  deleteDataById: async (req, res, next) => {
    const { id } = req.params;
    if (isNaN(id) || id < 0 || !id) {
      return res.status(404).json({ message: "wrong input data" });
    }

    let dataUsersId = await getUsersById(parseInt(id));
    console.log(dataUsersId);
    if (!dataUsersId.rows[0]) {
      return res.status(200).json({
        status: 200,
        message: "get data user data not found",
        data: [],
      });
    }

    let deleteUsersId = await deleteUsersById(parseInt(id));
    if (deleteUsersId) {
      res.status(200).json({
        status: 200,
        message: "delete data user success",
        data: dataUsersId.rows,
        dataDelete: deleteUsersId.rows,
      });
    }
  },
};

module.exports = UsersController;
