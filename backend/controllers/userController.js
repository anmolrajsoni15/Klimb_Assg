const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const sendToken = require("../utils/jwtToken");

exports.signUp = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    //checking if user has given password and email both
    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email and Password", 400));
    }

    let user = await User.findOne({email}).select("+password");

    if (user) {
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          return next(new ErrorHandler("Incorrect Email and Password", 401));
        }
      } else {
        user = await User.create({
          name,
          email,
          password
        });
      }
    sendToken(user, 200, res);
    }
);

//Logout a user
exports.logout = catchAsyncErrors(async(req,res,next)=>{
    
    res.cookie("token", null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })
    
    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})

exports.myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
