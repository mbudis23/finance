const router = require("express").Router();
const { registerUser, loginUser } = require("../controller/userController");
const { userExist } = require("../middlewares/userMiddleware");


router.post("/register", userExist, registerUser);
router.post("/login", loginUser);

module.exports = router;