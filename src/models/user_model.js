const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    phoneNumber: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: String, required: true },
    age: { type: Number },
    images: [{ type: String }],
    location: [{ latitude: Number, longitude: Number }],
    intro: String,
    nature: [{ type: String }],
    hobbies: String,
    lookingFor: [{ type: String }],
    height_cm: { type: Number, required: true },
    favList: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    checkedList: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const today = new Date();
  const birthDate = new Date(this.dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();
  if (
    month < birthDate.getMonth() ||
    (month === birthDate.getMonth() && day < birthDate.getDate())
  ) {
    age--;
  }

  this.age = age;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
