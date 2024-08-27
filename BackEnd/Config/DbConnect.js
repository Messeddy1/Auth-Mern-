const mongoose = require("mongoose");

const ConnectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MGDB_URI);
    console.log(`Connecting to ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  }
};

module.exports = ConnectDb