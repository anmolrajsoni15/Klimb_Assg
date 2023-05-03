const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please Enter your Name"],
        maxlength: [30, "Cannot exceed 30 characters"],
        minlength: [4, "Name should have more than 4 characters"],
    },
    email:{
        type: String,
        required: [true, "Please Enter your Email"],
        // unique: true,
        validate: [validator.isEmail, "Please Enter a Valid Email"]
    },
    password:{
        type: String,
        required: [true, "Please Enter your Password"],
        minlength:[8, "Password should be greater than 8 characters"],
        select: false,
    }
    
});

userSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password,10)
})

//JWT TOKEN
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
}

//Compare Password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model("User", userSchema);