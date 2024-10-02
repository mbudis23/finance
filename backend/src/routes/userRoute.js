const router = require("express").Router();
const { registerUser } = require("../controller/userController");
const { userExist } = require("../middlewares/userMiddleware");


router.post("/register", userExist, registerUser);

module.exports = router;