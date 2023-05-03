const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  'Name of the Candidate': {
    type: String,
    required: [true, "Please enter the name of the candidate"],
  },
  Email: {
    type: String,
    required: [true, "Please enter the email"],
    // unique: true,
  },
  'Mobile No.': {
    type: Number,
    required: [true, "Please enter the mobile number"],
    // unique: true,
  },
  'Date of Birth': {
    type: Date,
    required: [true, "Please enter the date of birth"],
  },
  'Work Experience': {
    type: String,
    required: [true, "Please enter the work experience"],
  },
  'Resume Title': {
    type: String,
    required: [true, "Please enter the resume title"],
  },
  'Current Location': {
    type: String,
    required: [true, "Please enter the current location"],
  },
  'Postal Address': {
    type: String,
    required: [true, "Please enter the postal address"],
  },
  'Current Employer': {
    type: String,
    // required: [true, "Please enter the current employer"],
  },
  'Current Designation': {
    type: String,
    // required: [true, "Please enter the current designation"],
  },
});

dataSchema.pre('save', function(next) {
    if (this['Date of Birth']) {
      const date = new Date(this['Date of Birth']);
      this['Date of Birth'] = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
    next();
  });

const Data = mongoose.model("Data", dataSchema);

// Data.collection.dropIndex("mobileNo", function(err, result) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(result);
//     }
// });

module.exports = Data;