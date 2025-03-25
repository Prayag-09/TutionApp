// pages/principal/AccessControl.jsx
import React, { useState, useEffect } from 'react';
import { getUserRoles, updateUserRole } from '../../lib/axios';

const AccessControl = () => {
	const [users, setUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);
	const [editData, setEditData] = useState({ role: '' });
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				setLoading(true);
				const res = await getUserRoles();
				setUsers(res.data.data);
			} catch (err) {
				setError('Failed to load users');
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, []);

	const handleViewDetails = (user) => {
		setSelectedUser(user);
		setEditData({ role: user.role });
	};

	const handleUpdateRole = async (id) => {
		try {
			await updateUserRole(id, editData.role);
			setUsers(
				users.map((user) =>
					user._id === id ? { ...user, role: editData.role } : user
				)
			);
			setSelectedUser(null);
			setEditData({ role: '' });
		} catch (err) {
			setError('Failed to update user role');
		}
	};

	if (loading)
		return <div className='text-center text-gray-500'>Loading...</div>;
	if (error) return <div className='text-center text-red-500'>{error}</div>;

	return (
		<div className='access-control'>
			<h1 className='text-2xl font-bold mb-6'>User Access Control</h1>
			<div className='bg-white p-6 rounded-lg shadow-md'>
				<table className='min-w-full border-collapse'>
					<thead>
						<tr className='bg-gray-100'>
							<th className='border px-4 py-2 text-left'>Email</th>
							<th className='border px-4 py-2 text-left'>Current Role</th>
							<th className='border px-4 py-2 text-left'>Status</th>
							<th className='border px-4 py-2 text-left'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user._id} className='hover:bg-gray-50'>
								<td className='border px-4 py-2'>{user.email}</td>
								<td className='border px-4 py-2'>{user.role}</td>
								<td className='border px-4 py-2'>{user.status}</td>
								<td className='border px-4 py-2'>
									<button
										onClick={() => handleViewDetails(user)}
										className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'>
										Edit Role
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{selectedUser && (
				<div className='mt-6 bg-white p-6 rounded-lg shadow-md'>
					<h2 className='text-xl font-semibold mb-4'>User Details</h2>
					<p className='mb-2'>
						<strong>Email:</strong> {selectedUser.email}
					</p>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleUpdateRole(selectedUser._id);
						}}
						className='space-y-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Role:
							</label>
							<select
								value={editData.role}
								onChange={(e) =>
									setEditData({ ...editData, role: e.target.value })
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'>
								<option value='principal'>Principal</option>
								<option value='teacher'>Teacher</option>
								<option value='student'>Student</option>
								<option value='parent'>Parent</option>
							</select>
						</div>
						<div className='flex space-x-3'>
							<button
								type='submit'
								className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>
								Update Role
							</button>
							<button
								type='button'
								onClick={() => setSelectedUser(null)}
								className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'>
								Cancel
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default AccessControl;
