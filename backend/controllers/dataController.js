const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Data = require("../models/dataModel");
const XLSX = require("xlsx");

exports.getData = catchAsyncErrors(async (req, res, next) => {
  const data = await Data.find();
  res.status(200).json({
    success: true,
    data,
  });
});

exports.importData = catchAsyncErrors(async (req, res, next) => {
  var workbook = XLSX.readFile(req.file.path);
  var sheet_namelist = workbook.SheetNames;
  // console.log(sheet_namelist);
  var x = 0;
  sheet_namelist.forEach((element) => {
      var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
      // console.log(xlData);
      Data.insertMany(xlData)
          .then(function() {
              console.log("Successfully saved data to DB");
          })
          .catch(function(err) {
              console.log(err);
          });
      x++;
  });

  res.status(200).json({
      success: true,
      message: "Data Imported Successfully"
  });
});
