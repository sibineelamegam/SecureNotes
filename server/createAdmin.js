// createAdmin.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ DB connection failed:', err);
    process.exit(1);
  }
};

const createAdmin = async () => {
  await connectDB();

  const existingAdmin = await User.findOne({ role: 'admin' });
  if (existingAdmin) {
    console.log('⚠️ Admin user already exists!');
    return process.exit(0);
  }

  const hashedPassword = await bcrypt.hash('Admin@123', 10);

  const admin = new User({
    username: 'admin',
    email: 'admin@example.com',
    password: hashedPassword,
    firstName: 'Super',
    lastName: 'Admin',
    age: 30,
    gender: 'male',
    dob: new Date('1995-01-01'),
    phone: '+11234567890',
    status: 'active',
    role: 'admin',
    address: {
      city: 'AdminCity',
      state: 'AdminState',
    },
  });

  try {
    await admin.save();
    console.log('✅ Admin user created successfully!');
  } catch (err) {
    console.error('❌ Failed to create admin user:', err.message);
  } finally {
    mongoose.connection.close();
  }
};

createAdmin();
