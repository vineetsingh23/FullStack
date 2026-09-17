import express from 'express'
// import 
import { connectDB} from './config/db'

const app = express();


// Middleware
app.use(express.json());

// Connection Status API Endpoint
app.get('/api/status', (req, res) => {
  const dbStatus = getDBStatus();
  
  res.status(dbStatus.readyState === 1 ? 200 : 503).json({
    server: 'Active',
    database: dbStatus,
    timestamp: new Date().toISOString(),
  });
});

// Start server and connect to DB
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});