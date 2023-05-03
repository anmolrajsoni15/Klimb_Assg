const express = require('express');
const { isAuthenticated } = require('../middlewares/auth');
const { importData } = require('../controllers/dataController');
const upload = require('../config/storage');
const router = express.Router();

router.route("/upload").post(isAuthenticated,upload.single('excel') ,importData)

module.exports = router;