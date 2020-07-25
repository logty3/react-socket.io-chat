const router = require("express").Router();
const roomCtrl = require("../controllers/room.controller");

router.route("/api/rooms").get(roomCtrl.list).post(roomCtrl.create);
router.route("/api/rooms/:roomId").get(roomCtrl.read);

router.param("roomId", roomCtrl.roomById);

module.exports = router;
