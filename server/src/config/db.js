import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let memoryServer;

const connectToMemoryServer = async () => {
  if (!memoryServer) {
    memoryServer = await MongoMemoryServer.create();
  }

  const uri = memoryServer.getUri();
  await mongoose.connect(uri);
  console.log('🧪 Connected to in-memory MongoDB instance');
};

export const connectToDatabase = async (mongoUri) => {
  const shouldUseMemoryDb = process.env.USE_IN_MEMORY_DB === 'true';

  if (shouldUseMemoryDb) {
    await connectToMemoryServer();
    return;
  }

  if (!mongoUri) {
    console.warn('⚠️ MONGODB_URI missing. Falling back to in-memory MongoDB instance.');
    await connectToMemoryServer();
    return;
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);

    if (process.env.NODE_ENV === 'production') {
      throw error;
    }

    console.warn('⚠️ Falling back to in-memory MongoDB instance for development.');
    await connectToMemoryServer();
  }
};
