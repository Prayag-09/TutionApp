import connectDB from '../database/connection';
import express from 'express';

const app = express();
import dotenv from 'dotenv';

import subjectRoutes from './routes/subjectRoutes';
import gradeRoutes from './routes/gradeRoutes';
import teacherRoutes from './routes/teacherRoutes';
import parentRoutes from './routes/parentRoutes';
import studentRoutes from './routes/studentRoutes';
import feeRoutes from './routes/feeRoutes';
import assignmentRoutes from './routes/assignmentRoutes';
import quizRoutes from './routes/quizRoutes';
import authRoutes from './routes/authRoutes';

app.use(express.json());
dotenv.config();
const port = process.env.PORT || 3000;

connectDB();
app.use('/auth', authRoutes);

app.use('/api/subjects', subjectRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/parents', parentRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/quizzes', quizRoutes);

app.listen(port, () => console.log(`Server connected to port ${port}`));
