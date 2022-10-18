const express = require("express");
const mongoose = require("mongoose");
const People = require("./Schema/schema");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/People", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((req, res) => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log(err);
  });

//  Password hashing using bcrypt
app.post("/addToDatabase", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();

    const password = await bcrypt.hash(req.body.password, salt);

    const { name, dob, Gender, phoneNumber, email } = req.body;
    const people = await People.create({
      name,
      dob,
      Gender,
      phoneNumber,
      email,
      password,
    });

    if (people) {
      res.status(200).json({
        status: true,
        message: "data  sent to database",
        data: people,
      });
    } else {
      res.status(404).json({
        status: false,
        message: "data rejected by database",
      });
    }
  } catch (err) {
    i;
    console.log(err);
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/register.html");
});

// app.get("/", (req, res) => {
//   res.redirect(__dirname + "/index.html");
// });

// New login route
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  People.findOne({ email }).then((People) => {
    // Checking if the email is valid or invalide

    if (!People) throw res.status(400).json({ message: "invalid email" });

    // If email is valid then check for the password and
    // Using the bcrypt.compare to check what the (person) typed and what we have in our DB

    bcrypt.compare(password, People.password, (err, data) => {
      if (err) throw err;

      if (data) {
        res.status(200).json({ message: "welcome back person" });
      } else {
        res.status(400).json({ message: "invalid password" });
      }
    });
  });
});

app.get("/getAllPeople", async (req, res) => {
  const Peoples = await People.find();
  if (Peoples) {
    res.status(200).json({
      status: true,
      message: "Bingo, You doing great",
      data: Peoples,
    });
  } else {
    res.status(400).json({
      status: false,
      message: "Sorry, something went wrong",
    });
  }
});

app.listen(8000, () => {
  console.log("server connected");
});
