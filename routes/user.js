const router = require("express").Router();

const userscontroller = require("../controller/user");

router.get("/", userscontroller.getAll);

router.get("/:id", userscontroller.getSingle);

router.post("/", userscontroller.createUser);

router.put("/:id", userscontroller.updateUser);

router.delete("/:id", userscontroller.deleteUser);


module.exports = router;