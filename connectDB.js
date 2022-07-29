const mongoose = require("mongoose");

require("dotenv").config();

const uri = process.env.MONGODB_CLUSTER_URI;
const client = mongoose
  .connect(uri)
  .then(() => {
    console.log("Connection established");
  })
  .catch((err) => console.log(err));

module.exports = client;
