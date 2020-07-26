const path = require("path");

const express = require("express");

const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");

const devBundle = require("./devBundle");
const template = require("../template");

const roomRoutes = require("./routes/room.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { onConnection } = require("./controllers/socket.controller")(io);
app.set("io", io);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.use(cors());

devBundle.compile(app);

app.use("/dist", express.static(path.join(process.cwd(), "dist")));
app.use(roomRoutes);
app.use(authRoutes);

io.on("connection", onConnection);

app.get("*", (req, res) => {
  res.status(200).send(template());
});

module.exports = server;
