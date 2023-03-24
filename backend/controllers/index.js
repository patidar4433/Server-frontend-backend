const dbConnect = require("../database/config");
const jwt = require('jsonwebtoken');
const otp = require("otp-generator");

// user login controller
const userLoginController = async (req, res) => {
  console.log(req);
  const userName = req.body.email;
  const password = req.body.password;
  console.log(userName, password);
  const response = await dbConnect.getConnect();
  const data = await response
    .find({ email: userName, password: password })
    .toArray();
  if (data.length > 0) {
    if (data[0].email === userName && data[0].password === password) {
      const token = jwt.sign({ userName: data[0].email}, process.env.token, {expiresIn:'5m'});
      console.log("token-->",token);
      res.send({
        message: "User Login Successfully",
        status: 1,
        email: userName, token: token
      });
    } else {
      res.send({ message: "Invalid email or Password", status: 0 });
    }
  } else {
    res.send({ message: "User not found register yourself.", status: 0 });
  }
};

// function to check user is active or not
const isActive = async (active) => {
  return new Promise((resolve, reject) => {
    if (active == 1) {
      return resolve({ message: "User Active", status: 1 });
    } else {
      return resolve({ message: "User Inactive", status: 0 });
    }
  });
};

// user profile controller
const userProfileController = async (req, res) => {
  const result = await isActive(req.body.active);
  if (result.status === 1) {
    res.send({
      message: "This is an active user",
      status: 1,
      email: req.body.email,
    });
  } else {
    res.send({ message: "This is NOT an active user", status: 0 });
  }
};

// user register controller
const userRegisterController = async (req, res) => {
  console.log(req);
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const mobNo = req.body.mobno;
  const email = req.body.email;
  const password = req.body.password;
  // otp generate
  const otpCode = otp.generate(4, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: true,
    specialChars: false,
  });
  console.log("OTP: ", otpCode);
  // return
  if (
    firstName === "" &&
    lastName === "" &&
    mobNo === "" &&
    email === "" &&
    password === ""
  ) {
    res.send({ message: "Please fill all the fields", status: 0 });
  } else {
    const response = await dbConnect.getConnect();
    const data = await response.find({ email: req.body.email }).toArray();
    if (data.length > 0) {
      if (data[0].email === req.body.email) {
        res.send({
          message: "user already exists",
        });
        console.log("user already exists");
      }
    } else {
      console.log("new entry");
      const data = await response.insertOne({
        firstname: firstName,
        lastname: lastName,
        mobno: mobNo,
        email: email,
        password: password,
      });
      console.log(data);
      if (data.insertedId) {
        res.send({
          message: "User Registered Successfully",
          status: 1,
        });
      } else {
        res.send({
          message: "User Registration Failed",
          status: 0,
        });
      }
    }
  }
};

// user forgot password controller
const userForgotPasswordController = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;
  const response = await dbConnect.getConnect();
  const data = await response.find({ email: email }).toArray();
  console.log("data", data);
  if (data[0].email) {
    const updatedData = await response.updateOne(
      { email: email },
      { $set: { password: password } }
    );
    console.log("updatedData", updatedData)
    if (updatedData) {
      if (password === confirm_password) {
        res.send({
          message: "Password reset successfully..!",
          email: email,
          password: password,
          confirm_password: confirm_password,
          status: 1,
        });
      } else {
        res.send({
          message: "Password reset failed..!",
          email: email,
          password: password,
          confirm_password: confirm_password,
          status: 0,
        });
      }
    }
  }
};

// get User Details Controller
const getUserDetailsController = async (req, res) => {
  const response = await dbConnect.getConnect();
  const data = await response.find().toArray();
  // console.log(data);
  res.send({ message: "Data fetched successfully", status: 1, response: data });
};

// get User Details by Email
const getUserDetailsbyEmailController = async (req, res) => {
  const response = await dbConnect.getConnect();
  console.log("response-->", response);
  const data = await response.find({ email: req.body.email }).toArray();
  console.log("data-->", data);
  if (data.length > 0) {
    res.send({
      message: "Data fetched successfully",
      status: 1,
      response: data,
    });
  } else {
    console.log(data);
    res.send({ message: "Data NOT found", status: 0, response: data });
  }
};

// get User details by lastname
const getUserDetailsbyLastNameController = async (req, res) => {
  const response = await dbConnect.getConnect();
  const data = await response.find({ lastname: req.body.lastname }).toArray();
  if (data.length > 0) {
    console.log(data);
    res.send({
      message: "Data fetched successfully",
      status: 1,
      response: data,
    });
  } else {
    console.log(data);
    res.send({ message: "Data NOT found", status: 0, response: data });
  }
};

// user delete controller
const userDeleteController = async (req, res) => {
  const emailDelete = req.body.email;
  const response = await dbConnect.getConnect();
  const findData = await response.find({ email: emailDelete }).toArray();
  console.log("findData", emailDelete);
  if (findData[0].email) {
    const deleteData = await response.deleteOne({ email: emailDelete });
    if (deleteData) {
      res.send({ message: "User Deleted Successfully", status: 1, data: findData });
    } else {
      res.send({ message: "User Not Deleted", status: 0 });
    }
  } else {
    res.send({ message: "User Not Found", status: 0 });
  }
};

// user update controller
const userUpdateController = async (req, res) => {
  const email = req.body.email;
  const firstName = req.body.firstname;
  const lastname = req.body.lastname;
  const mobno = req.body.mobno;
  const response = await dbConnect.getConnect();
  const findData = await response.find({ email: email }).toArray();
  if (findData[0].email) {
    const updateData = await response.updateOne(
      { email: email },
      { $set: { firstname: firstName, lastname: lastname, mobno: mobno } }
    );
    if (updateData) {
      res.send({ message: "User Updated Successfully", status: 1 });
    } else {
      res.send({ message: "User Not update", status: 0 });
    }
  } else {
    res.send({ message: "User Not Found", status: 0 });
  }
};

module.exports = {
  userLoginController,
  userProfileController,
  userRegisterController,
  userForgotPasswordController,
  getUserDetailsController,
  getUserDetailsbyEmailController,
  getUserDetailsbyLastNameController,
  userDeleteController,
  userUpdateController,
};
