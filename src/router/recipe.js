const {
  getData,
  getDataById,
  getDataSearch,
  deleteDataById,
  postData,
  putData,
} = require("../controller/recipeController");
const app = require("express");
const router = app.Router();
const { Protect } = require("./../middleware/protect");

router.get("/", getData);
router.get("/detail", getDataSearch);
router.get("/:id", getDataById);
router.post("/", postData);
router.put("/:id", putData);
router.delete("/:id", deleteDataById);

module.exports = router;

// app.get("/users", (req, res) => {
//   res.status(200).json({ name: "F Kanugrahan" });
// });

// let data = ["a", "b", "c", "d"];

// app.get("/recipe", (req, res) => {
//   res.status(200).json({ status: 200, message: "post recipe success", data });
// });

// app.get("/recipe/:id", (req, res) => {
//   console.log(req.params);
//   const { id } = req.params;
//   res.status(200).json({
//     status: 200,
//     message: "post recipe success",
//     data: `${data[id - 1]}`,
//   });
// });

// app.post("/recipe", (req, res) => {
//   console.log(req.body);
//   const { name } = req.body;
//   if (!name) {
//     return res.status(404).json({ message: "name input required" });
//   } else {
//     console.log(name);
//     console.log(data);
//     data = [...data, name];
//     console.log(data);
//     res.status(200).json({ status: 200, message: "post recipe success", data });
//   }
// });

// app.put("/recipe/:id", (req, res) => {
//   const { name } = req.body;
//   let { id } = req.params;
//   id = parseInt(id);

//   if (!name || !id) {
//     return res.status(404).json({ message: "name input or id required" });
//   } else if (id > data.length || id < 0) {
//     return res.status(404).json({ message: "data not found" });
//   } else {
//     data[id - 1] = name; // Gantikan data lama pada indeks yang sesuai
//     return res.status(200).json({
//       status: 200,
//       message: "put recipe success",
//       data: `${data[id - 1]}`,
//     });
//   }
// });

// app.delete("/recipe/:id", (req, res) => {
//   let { id } = req.params;
//   id = parseInt(id);
//   if (id > data.length || id < 0 || isNaN(id)) {
//     return res.status(404).json({ message: "data not found" });
//   } else {
//     // data.shift();
//     // data.splice(id-1,1)
//     data.pop();
//     return res.status(200).json({
//       status: 200,
//       message: "delete recipe success",
//       data,
//     });
//   }
// });
