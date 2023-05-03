const express = require('express');
const { signUp, myProfile, logout } = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router();

router.route("/signup").post(signUp);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticated, myProfile);

module.exports = router;