import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

const App = () => {
	return (
		<div>
			<h1>Welcome Page</h1>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/login' element={<LogIn />} />
				<Route path='/signup' element={<SignUp />} />
				<Route path='/dashboard' element={<Dashboard />} />
			</Routes>
		</div>
	);
};

export default App;
