const router = require("express").Router();
const userController = require("../controller/user.controller");

router.post("/api/users/create", userController.createUser);

router.get("/api/users/:email", userController.getUser);



module.exports = router;