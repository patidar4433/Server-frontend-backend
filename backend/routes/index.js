var express = require('express');
var router = express.Router();
var userController = require('../controllers/index');
const validate = require('../middleware/validate');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// user login page by post method
router.post('/userlogin', userController.userLoginController)

// user Profile page {Check status - Active/Inactive} by post method
router.get('/userprofile', userController.userProfileController)

// user register page by post method
router.post('/register', /*validate,*/ userController.userRegisterController)

// forgot password page by post method
router.post('/forgotpassword', userController.userForgotPasswordController)

// Print output in key value pair
router.get('/student', (req, res)=>{
  const person = {
    name: "Ashwin",
    age: 10
  }

  const key = Object.keys(person);
  const value = Object.values(person);
  const values = [];

  for (let i = 0; i < key.length; i++){
    values.push({key : key[i], value : value[i]});
  }
  console.log(values);
  res.send({values:values});
})

// get user details by GET method
router.get('/getuserdetails', userController.getUserDetailsController)

// get specific User Details
router.get('/getuserdetailsbyemail', userController.getUserDetailsbyEmailController)

// get specific User Details by lastname
router.get('/getuserdetailsbylastname', userController.getUserDetailsbyLastNameController)

// user delete
router.post('/userdelete', userController.userDeleteController)

// user update
router.post('/userupdate', userController.userUpdateController)


module.exports = router;
