const {
    getUsers,postUsers,putUsers,deleteUsersById,/*getUsersById,*/
  } = require("../model/usersModel");
  
  const UsersController = {
    getData: async (req, res, next) => {
      let dataUsers = await getUsers();
      console.log("dataUsers");
      console.log(dataUsers);
      if (dataUsers) {
        res.status(200).json({
          status: 200,
          message: "get data Users success",
          data: dataUsers.rows,
        });
      }
    },

    deleteDataById: async (req, res, next) => {
      const { id } = req.params;
      if (isNaN(id) || id < 0 || !id) {
        return res.status(404).json({ message: "id wrong" });
      }
  
      let deleteUsersId = await deleteUsersById(parseInt(id));
      console.log("deleteUsersId");
      console.log(deleteUsersId);
      if (deleteUsersId) {
        res.status(200).json({
          status: 200,
          message: "delete data Users success",
          data: deleteUsersId.rows,
        });
      }
    },
    postData: async (req, res, next) => {
      const { name, email, phone_number, password } = req.body;
      console.log("post data ");
      console.log(name, email, phone_number, password);
    
      if (!name || !email || !phone_number) {
        return res
          .status(404)
          .json({
            message:
              "input name, email, phone_number, password required",
          });
      }
    
      let data = {
        name: name,
        email: email,
        phone_number: phone_number,
        password: password
      };
    
      console.log("data");
      console.log(data);
    
      try {
        let result = await postUsers(data);
        console.log(result);
    
        return res
          .status(200)
          .json({ status: 200, message: "data Users success", data });
      } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
    },
    
    putData: async (req, res, next) => {
      const { id } = req.params;
      const { name, email, phone_number, password } = req.body;
    
      if (!id || id <= 0 || isNaN(id)) {
        return res.status(404).json({ message: "id wrong" });
      }
    
      let data = {
        name: name,
        email: email,
        phone_number: phone_number,
        password: password
      };
    
      try {
        let result = await putUsers(parseInt(id), data); 
        console.log(result);
    
        // delete data.id;
        return res
          .status(200)
          .json({ status: 200, message: "update data Users success", data });
      } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
    },
    
  };
  
  module.exports = UsersController;
  