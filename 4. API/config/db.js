const mongoose = require("mongoose");

const conenctDB = async () => {
  try {
    await mongoose.connect(`mongodb://localhost/turing-api`);
    console.log(`MongoDB connected successfully`);
  } catch (error) {
    console.log(`Could\'t connect to database: ${error}`);
  }
};

module.exports = conenctDB;
