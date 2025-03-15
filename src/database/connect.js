const mongoose = require('mongoose');

async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error('❌ Database connection error:', error);
    process.exit(1);
  }
}

module.exports = { connectDatabase };