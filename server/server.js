const app = require("./express");
const mongoose = require("mongoose");
const { PORT, MONGO_URI } = require("../config");

mongoose.Promise = global.Promise;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${MONGO_URI}`);
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.info(`Server started on port ${PORT}.`);
});
