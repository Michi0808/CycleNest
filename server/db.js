import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

try {
  mongoose.connect(process.env.DB_URI);
  console.log('Connected to MongoDB');
} catch (error) {
  console.error('MongoDB connection error:', error);
}

export default mongoose;
