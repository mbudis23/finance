const router = require("express").Router();
const { registerUser, loginUser, deleteUser } = require("../controller/userController");
const { userExistByEmail, authenticateToken, userExistByCookies } = require("../middlewares/userMiddleware");


router.post("/register", userExistByEmail, registerUser);
router.post("/login", loginUser);
router.delete("/", authenticateToken, userExistByCookies, deleteUser)

module.exports = router;