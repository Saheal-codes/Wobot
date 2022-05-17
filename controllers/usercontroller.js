const usermodel = require("../models/usermodel");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const newuser = await usermodel.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.hpass
      ).toString(),
    });
    res.send({ message: "User added successfully", data: newuser }, 201);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await usermodel.findOne({
      username: req.body.username,
    });
    if (!user) {
      res.status(404).send({ message: "User not found" });
    } else {
      const decrypted = CryptoJS.AES.decrypt(
        user.password,
        process.env.hpass
      ).toString(CryptoJS.enc.Utf8);
      if (decrypted === req.body.password) {
        const { password, ...others } = user._doc;
        const accesstoken = jwt.sign(others, process.env.jwtpass, {
          expiresIn: "6h",
        });
        res.status(200).send({
          message: "User logged in successfully",
          data: others, accesstoken
        });
      } else {
        res.status(401).send({ message: "Invalid Credentials !" });
      }
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

exports.fetch_user_list = async (req, res) => {
  try {
    const users = await usermodel.find({});
    res.status(200).send({ message: "User list fetched successfully", data: users });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
}

exports.fetch_user_details = async (req, res) => {
  try {
    const user = await usermodel.findById(req.params.id);
    if (!user) {
      res.status(404).send({ message: "User not found" });
    } else {
      res.status(200).send({ message: "User details fetched successfully", data: user });
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
}
