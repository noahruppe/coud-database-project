const router = require("express").Router();

const playlistcontroller = require("../controller/playlist");


router.get("/:userId", playlistcontroller.getAll);

router.get("/:userId/:playlistId", playlistcontroller.getSingle);

router.post("/:userId", playlistcontroller.createPlaylist);

router.put("/:userId/:playlistId", playlistcontroller.updatePlaylist);

router.delete("/:userId/:playlistId", playlistcontroller.deletePlaylist);

module.exports = router;