const router = require("express").Router();
const { registerUser, loginUser, deleteUser } = require("../controller/userController");
const { emailExist, authenticateToken, userExistByCookies } = require("../middlewares/userMiddleware");


router.post("/register", emailExist, registerUser);
router.post("/login", loginUser);
router.delete("/", authenticateToken, userExistByCookies, deleteUser)

module.exports = router;