const router = require("express").Router();
const userController = require('../controllers/user.controller');

router.get("/", userController.getUsers);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/auth", userController.authUser);
router.put("/", userController.updateUser);



module.exports = router;
