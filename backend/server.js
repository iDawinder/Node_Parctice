// ********************* Express *************************

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("./db.js"); // Import the database connection file
require("dotenv").config();

app.use(cors());

app.use(bodyParser.json());
// const port = 8000;

app.get("/", (req, res) => {
  res.send("welcome to my hotel how can we help u");
});

const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");

app.use("/menuitems", menuRoutes);
app.use("/person", personRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("app is listning on the" + PORT);
});




// const newPerson= new Person()
// newPerson.name=data.name
// newPerson.age=data.age
// newPerson.mobile=data.mobile
// newPerson.email=data.email
// newPerson.adress=data.adress

// const newPerson= new Person({
//     name:req.body.name,
//     age:req.body.age,
//     work:req.body.work,
//     mobile:req.body.mobile,
//     email:req.body.email,
//     adress:req.body.adress,
//     salary:req.body.salary
