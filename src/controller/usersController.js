const {
  getUsers,
  getUsersById,
  // postUsers,
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
        message: "get data recipe data not found",
        data: [],
      });
    }
    if (dataUsers) {
      res.status(200).json({
        status: 200,
        message: "get data Users success",
        data: dataUsers.rows,
      });
    }
  },

  putData: async (req, res, next) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (!id || id <= 0 || isNaN(id)) {
      return res.status(404).json({ message: "wrong input id" });
    }

    let dataUsersId = await getUsersById(parseInt(id));
    if (!dataUsersId.rows[0]) {
      return res.status(200).json({
        status: 200,
        message: "get data recipe data not found",
        data: [],
      });
    }

    let data = {
      name: name || dataUsersId.rows[0].name,
      email: email || dataUsersId.rows[0].email,
      password: await argon2.hash(password)  || dataUsersId.rows[0].password,
    };

    let updateUsersId = await putUsers(parseInt(id), data);
    let dataAfter = await getUsersById(parseInt(id));

    return res
      .status(200)
      .json({ status: 200, message: "update data Users success", dataBefore: dataUsersId.rows, dataAfter: dataAfter.rows});
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
        message: "get data recipe data not found",
        data: [],
      });
    }

    let deleteUsersId = await deleteUsersById(parseInt(id));
    if (deleteUsersId) {
      res.status(200).json({
        status: 200,
        message: "delete data Users success",
        data: dataUsersId.rows,
        dataDelete: deleteUsersId.rows,
      });
    }
  },
  // postData: async (req, res, next) => {
  //   const { name, email, password } = req.body;
  //   console.log("post data ");
  //   console.log(name, email, password);

  //   if (!name || !email || !password) {
  //     return res.status(404).json({
  //       message: "input name, email, password required",
  //     });
  //   }

  //   let data = {
  //     name,
  //     email,
  //     password,
  //   };

  //   console.log("data");
  //   console.log(data);

  //   let result = await postUsers(data);
  //   console.log(result);

  //   return res
  //     .status(200)
  //     .json({ status: 200, message: "data Users success", data });
  // },
};

module.exports = UsersController;
