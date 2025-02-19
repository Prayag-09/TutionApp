import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connection';

import userManagementRoutes from './routes/user-management-routes';
// import feeRoutes from './routes/fee-routes';
// import reportRoutes from './routes/report-routes';
// import tutionRoutes from './routes/tution-routes';

import { authenticate } from './middlewares/auth';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(authenticate);

app.use('/api/users', userManagementRoutes);
// app.use('/api/fees', feeRoutes);
// app.use('/api/reports', reportRoutes);
// app.use('/api/tution', tutionRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
