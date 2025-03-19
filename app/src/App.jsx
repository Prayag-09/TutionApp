import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Login from './pages/login/LogInPage';
import PrincipalDashboard from './pages/principal/Dashboard';
import TeacherDashboard from './pages/teacher/Dashboard';
import StudentDashboard from './pages/student/Dashboard';
import ParentDashboard from './pages/parent/Dashboard';

import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

function ProtectedLayout({ children }) {
	const [role, setRole] = useState(localStorage.getItem('role'));
	const token = localStorage.getItem('token');

	useEffect(() => {
		setRole(localStorage.getItem('role'));
	}, [token]);

	if (!token || !role) {
		return <Navigate to='/login' replace />;
	}

	return (
		<div className='flex min-h-screen'>
			<Sidebar role={role} />
			<div className='flex-1 flex flex-col'>
				<Navbar role={role} />
				<main className='p-6 bg-gray-50 flex-1 overflow-y-auto'>
					{children}
				</main>
			</div>
		</div>
	);
}

function App() {
	return (
		<Routes>
			<Route path='/login' element={<Login />} />

			{/* Principal protected dashboard */}
			<Route
				path='/principal/dashboard'
				element={
					<ProtectedLayout>
						<PrincipalDashboard />
					</ProtectedLayout>
				}
			/>

			<Route
				path='/teacher/dashboard'
				element={
					<ProtectedLayout>
						<TeacherDashboard />
					</ProtectedLayout>
				}
			/>

			{/* Student protected dashboard */}
			<Route
				path='/student/dashboard'
				element={
					<ProtectedLayout>
						<StudentDashboard />
					</ProtectedLayout>
				}
			/>

			{/* Parent protected dashboard */}
			<Route
				path='/parent/dashboard'
				element={
					<ProtectedLayout>
						<ParentDashboard />
					</ProtectedLayout>
				}
			/>

			{/* Default fallback */}
			<Route path='*' element={<Navigate to='/login' replace />} />
		</Routes>
	);
}

export default App;
