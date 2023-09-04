const {
  getUsers,
  getUsersById,
  deleteUsersById,
} = require("../model/usersModel");

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
