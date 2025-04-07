import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
// Components
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

// Login Page
import Login from './pages/login/LogInPage';

// Principal Pages
import PrincipalDashboard from './pages/principal/Dashboard';
import PrincipalTeachers from './pages/principal/Teachers';
import PrincipalStudents from './pages/principal/Students';
import PrincipalParents from './pages/principal/Parents';
import PrincipalSubjects from './pages/principal/Subjects';
import PrincipalGradeSubjects from './pages/principal/GradeSubjects';
import PrincipalAssignments from './pages/principal/Assignments';
import PrincipalQuizzes from './pages/principal/Quiz';
import PrincipalFees from './pages/principal/Fees';
import PrincipalReports from './pages/principal/Report';

// Teacher Pages
import TeacherDashboard from './pages/teacher/Dashboard';
import TeacherStudents from './pages/teacher/Students';
import TeacherAssignments from './pages/teacher/Assignments';
import TeacherQuiz from './pages/teacher/Quiz';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import StudentAssignments from './pages/student/Assignments';
import StudentQuiz from './pages/student/Quiz';
import StudentExams from './pages/student/Exams';

// Parent Pages
import ParentDashboard from './pages/parent/Dashboard';
import ParentChildren from './pages/parent/Children';
import ParentFeePayment from './pages/parent/FeePayment';
import Grades from './pages/principal/Grades';
import HomePage from './pages/HomePage';
function ProtectedLayout({ children }) {
	const [role, setRole] = useState(localStorage.getItem('role'));
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const token = localStorage.getItem('token');

	useEffect(() => {
		setRole(localStorage.getItem('role'));
	}, [token]);

	if (!token || !role) {
		return <Navigate to='/login' replace />;
	}

	return (
		<div className='flex min-h-screen bg-gray-50'>
			<div className='hidden lg:block'>
				<Sidebar role={role} />
			</div>
			<AnimatePresence>
				{isSidebarOpen && (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className='fixed inset-0 z-40 bg-black/50 lg:hidden'
							onClick={() => setIsSidebarOpen(false)}
						/>
						<motion.div
							initial={{ x: -256 }}
							animate={{ x: 0 }}
							exit={{ x: -256 }}
							transition={{ type: 'tween', ease: [0.4, 0, 0.2, 1] }}
							className='fixed z-50 w-64 h-full bg-white lg:hidden'>
							<Sidebar role={role} />
						</motion.div>
					</>
				)}
			</AnimatePresence>

			<div className='flex-1 flex flex-col min-w-0'>
				<Navbar
					role={role}
					toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
				/>

				{/* Added smooth page transitions */}
				<main className='p-4 sm:p-6 bg-gray-50 flex-1 overflow-y-auto'>
					<AnimatePresence mode='wait'>
						<motion.div
							key={location.pathname}
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -8 }}
							transition={{ duration: 0.15 }}>
							{children}
						</motion.div>
					</AnimatePresence>
				</main>
			</div>
		</div>
	);
}

function App() {
	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/login' element={<Login />} />

			{/* Principal protected routes */}
			<Route
				path='/principal/dashboard'
				element={
					<ProtectedLayout>
						<PrincipalDashboard />
					</ProtectedLayout>
				}
			/>
			<Route
				path='/principal/teachers'
				element={
					<ProtectedLayout>
						<PrincipalTeachers />
					</ProtectedLayout>
				}
			/>
			<Route
				path='/principal/students'
				element={
					<ProtectedLayout>
						<PrincipalStudents />
					</ProtectedLayout>
				}
			/>
			<Route
				path='/principal/parents'
				element={
					<ProtectedLayout>
						<PrincipalParents />
					</ProtectedLayout>
				}
			/>
			<Route
				path='/principal/grades'
				element={
					<ProtectedLayout>
						<Grades />
					</ProtectedLayout>
				}
			/>
			<Route
				path='/principal/subjects'
				element={
					<ProtectedLayout>
						<PrincipalSubjects />
					</ProtectedLayout>
				}
			/>
			<Route
				path='/principal/grade-subjects'
				element={
					<ProtectedLayout>
						<PrincipalGradeSubjects />
					</ProtectedLayout>
				}
			/>
			<Route
				path='/principal/assignments'
				element={
					<ProtectedLayout>
						<PrincipalAssignments />
					</ProtectedLayout>
				}
			/>
			<Route
				path='/principal/quizzes'
				element={
					<ProtectedLayout>
						<PrincipalQuizzes />
					</ProtectedLayout>
				}
			/>
			<Route
				path='/principal/fees'
				element={
					<ProtectedLayout>
						<PrincipalFees />
					</ProtectedLayout>
				}
			/>
			<Route
				path='/principal/reports'
				element={
					<ProtectedLayout>
						<PrincipalReports />
					</ProtectedLayout>
				}
			/>

			{/* Teacher protected routes */}
			<Route
				path='/teacher/dashboard'
				element={
					<ProtectedLayout>
						<TeacherDashboard />
					</ProtectedLayout>
				}
			/>
			<Route
				path='/teacher/students'
				element={
					<ProtectedLayout>
						<TeacherStudents />
					</ProtectedLayout>
				}
			/>
			<Route
				path='/teacher/assignments'
				element={
					<ProtectedLayout>
						<TeacherAssignments />
					</ProtectedLayout>
				}
			/>
			<Route
				path='/teacher/quizzes'
				element={
					<ProtectedLayout>
						<TeacherQuiz />
					</ProtectedLayout>
				}
			/>
			<Route
				path='/teacher/attendance'
				element={
					<ProtectedLayout>
						<div>Attendance Page (To be implemented)</div>
					</ProtectedLayout>
				}
			/>
			<Route
				path='/teacher/reports'
				element={
					<ProtectedLayout>
						<div>Reports Page (To be implemented)</div>
					</ProtectedLayout>
				}
			/>

			{/* Student protected routes */}
			<Route
				path='/student/dashboard'
				element={
					<ProtectedLayout>
						<StudentDashboard />
					</ProtectedLayout>
				}
			/>
			<Route
				path='/student/assignments'
				element={
					<ProtectedLayout>
						<StudentAssignments />
					</ProtectedLayout>
				}
			/>
			<Route
				path='/student/quizzes'
				element={
					<ProtectedLayout>
						<StudentQuiz />
					</ProtectedLayout>
				}
			/>
			<Route
				path='/student/exams'
				element={
					<ProtectedLayout>
						<StudentExams />
					</ProtectedLayout>
				}
			/>
			<Route
				path='/student/attendance'
				element={
					<ProtectedLayout>
						<div>Attendance Page (To be implemented)</div>
					</ProtectedLayout>
				}
			/>

			{/* Parent protected routes */}
			<Route
				path='/parent/dashboard'
				element={
					<ProtectedLayout>
						<ParentDashboard />
					</ProtectedLayout>
				}
			/>
			<Route
				path='/parent/children'
				element={
					<ProtectedLayout>
						<ParentChildren />
					</ProtectedLayout>
				}
			/>
			<Route
				path='/parent/fee-payment'
				element={
					<ProtectedLayout>
						<ParentFeePayment />
					</ProtectedLayout>
				}
			/>
			<Route
				path='/parent/reports'
				element={
					<ProtectedLayout>
						<div>Reports Page (To be implemented)</div>
					</ProtectedLayout>
				}
			/>
		</Routes>
	);
}

export default App;
