import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connection';
import { authenticate } from './middlewares/auth';

import authRoutes from './routes/auth-routes';
import userManagementRoutes from './routes/user-management-routes';
// import feeRoutes from './routes/fee-routes';
// import reportRoutes from './routes/report-routes';
// import tutionRoutes from './routes/tution-routes';


dotenv.config();

const app = express();
const port = process.env.PORT;

connectDB();
app.use(express.json());

app.use('/api/auth', authRoutes);

// ✅ Protect only required routes
app.use('/api/v1/users', authenticate, userManagementRoutes);
// app.use('/api/fees', authenticate, feeRoutes);
// app.use('/api/reports', authenticate, reportRoutes);
// app.use('/api/tution', authenticate, tutionRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));