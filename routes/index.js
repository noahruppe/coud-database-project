const router = require('express').Router();

router.use("/user", require("./user"));

router.use("/playlist", require("./playlist"));

router.use("/song", require("./song"));

router.use("/", require("./swagger"));

module.exports = router;