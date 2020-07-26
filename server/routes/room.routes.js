const router = require("express").Router();
const roomCtrl = require("../controllers/room.controller");
const authCtrl = require("../controllers/auth.controller");

router
  .route("/api/rooms")
  .get(authCtrl.requireSignin, roomCtrl.list)
  .post(authCtrl.requireSignin, roomCtrl.create);

router.route("/api/rooms/:roomId").get(authCtrl.requireSignin, roomCtrl.read);

router.param("roomId", roomCtrl.roomById);

module.exports = router;
