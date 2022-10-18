const mongoose = require("mongoose");

const peopleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    Dob: {
      type: String,
      require: true,
    },
    Gender: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: Number,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const people = mongoose.model("People", peopleSchema);
module.exports = people;
