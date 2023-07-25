const express = require("express");
const morgan = require("morgan");
const cors = require('cors')
const Router = require('./src/router')

const app = express();
const port = 3000;

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.status(200).json({ status: 200, message: "system ready" });
});

app.use(Router)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
