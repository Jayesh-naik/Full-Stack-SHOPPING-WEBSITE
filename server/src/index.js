import dotenv from 'dotenv';
import app from './app.js';
import { connectToDatabase } from './config/db.js';

dotenv.config();

const port = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await connectToDatabase(process.env.MONGODB_URI);

    app.listen(port, () => {
      console.log(`🚀 Server listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled promise rejection:', reason);
});
