import connectDB from './config/connection';
import express from 'express';

const app = express();
import dotenv from 'dotenv';

import subjectRoutes from './routes/subjectRoutes';
import gradeRoutes from './routes/gradeRoutes';
import teacherRoutes from './routes/teacherRoutes';
import parentRoutes from './routes/parentRoutes';
import studentRoutes from './routes/studentRoutes';
import feeRoutes from './routes/fee-routes';
import assignmentRoutes from './routes/assignmentRoutes';
import quizRoutes from './routes/quizRoutes';
import authorize from './middlewares/assignRoles';
import authenticate from './middlewares/auth';
import { loginSchema } from './validators';
import authRoutes from './routes/authRoutes';
import reportRoutes from './routes/report-routes';
import tutionRoutes from './routes/tution-routes';
import userManagementRoutes from './routes/user-management-routes';

app.use(express.json());
dotenv.config();
const port = process.env.PORT || 3000;

connectDB();
app.use('/auth', authRoutes);
app.use(
	'/api/subjects',
	authorize(['admin', 'teacher', 'student']),
	subjectRoutes
);
app.use('/api/grades', authorize(['admin', 'teacher', 'student']), gradeRoutes);
app.use('/api/teachers', authorize(['admin', 'teacher']), teacherRoutes);
app.use('/api/parents', authorize(['admin', 'parent']), parentRoutes);
app.use('/api/students', authorize(['admin', 'student']), studentRoutes);
app.use('/api/fees', authorize(['admin', 'teacher', 'student']), feeRoutes);
app.use(
	'/api/assignments',
	authorize(['admin', 'teacher', 'student']),
	assignmentRoutes
);
app.use('/api/quizzes', authorize(['admin', 'teacher', 'student']), quizRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/tution', tutionRoutes);
app.use('/api/users', userManagementRoutes);

app.listen(port, () => console.log(`Server connected on port ${port}`));
