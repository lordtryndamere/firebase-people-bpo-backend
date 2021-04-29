const router = require("express").Router();
const userController = require("../controller/user.controller");

router.post("/api/users/create", userController.createUser);

router.get("/api/users/:id", userController.getUser);

router.put("/api/users/update", userController.updateUser);

router.delete("/api/users/delete/:id", userController.deleteUser);

module.exports = router;