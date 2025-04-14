const router = require("express").Router();


const songController = require("../controller/song");

router.get("/:playlistId", songController.getAll);

router.get("/:playlistId/:songId", songController.getSingle );

router.post("/:playlistId", songController.createSong);

router.put("/:playlistId/:songId", songController.updatesong);

router.delete("/:playlistId/:songId", songController.deletesong);



module.exports = router;