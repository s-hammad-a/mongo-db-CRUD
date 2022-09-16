const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./src/model.js");

const cors = require("cors");

//app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,locale"
  );
  res.header("Access-Control-Allow-Methods", "POST,PUT,GET,DELETE, OPTIONS");

  next();
});


mongoose
  .connect(
    "mongodb+srv://admin:3xBKpCNdgn2xMSGX@cluster0.ezazl.mongodb.net/newDatabase?retryWrites=true&w=majority"
  )
  .then(() => console.log("DBConnection Successfull!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  newUser.save();
  res.json(user);
});

app.put("/:id", async (req, res) => {
  UserModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  )
    .then((updatedMyUser) => {
      res.status(200).json(updatedMyUser);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

app.delete("/:id", (req, res) => {
  UserModel.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({
        message: "User has been deleted...",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});