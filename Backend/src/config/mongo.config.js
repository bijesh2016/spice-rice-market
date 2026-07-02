const mongoose = require("mongoose");
const { mongoConfig } = require("./config");

const connectMongo = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  await mongoose.connect(mongoConfig.mongoURI);
  console.log("MongoDB connected");
  return mongoose.connection;
};

module.exports = connectMongo;
