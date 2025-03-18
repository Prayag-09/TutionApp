import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Label } from '../components/ui/Label';
import { cn } from '../lib/utils';

const containerVariants = {
	hidden: { opacity: 0, scale: 0.95 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.4, staggerChildren: 0.1 },
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 10 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.3 },
	},
};

export default function Signup() {
	const { register, handleSubmit, watch, control } = useForm();
	const role = watch('role', 'student');
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	// Dynamic fields for teacher & student
	const {
		fields: gradeSubjectFields,
		append: addGradeSubject,
		remove: removeGradeSubject,
	} = useFieldArray({ control, name: 'gradeSubjects' });
	const {
		fields: subjectFields,
		append: addSubject,
		remove: removeSubject,
	} = useFieldArray({ control, name: 'subjects' });

	useEffect(() => {
		// Initialize empty fields when switching roles
		if (role === 'teacher' && gradeSubjectFields.length === 0) {
			addGradeSubject({ gradeSubjectId: '' });
		}
		if (role === 'student' && subjectFields.length === 0) {
			addSubject({ subjectId: '', teacherId: '', status: 'Live' });
		}
	}, [role]);

	const onSubmit = async (data) => {
		setLoading(true);
		const payload = {
			name: data.name,
			mobile: data.mobile,
			email: data.email,
			password: data.password,
			residentialAddress: {
				address: data.residentialAddress?.address,
				city: data.residentialAddress?.city,
				state: data.residentialAddress?.state,
				country: data.residentialAddress?.country,
				zipCode: data.residentialAddress?.zipCode,
			},
			status: 'Live',
		};

		if (role === 'teacher') {
			payload.qualification = data.qualification;
			payload.gradeSubjects = data.gradeSubjects;
		}
		if (role === 'student') {
			payload.parentId = data.parentId;
			payload.gradeId = data.gradeId;
			payload.subjects = data.subjects;
		}

		try {
			await axios.post(
				`http://localhost:3000/api/users/register/${role}`,
				payload
			);
			navigate('/login');
		} catch (err) {
			alert(err.response?.data?.message || 'Signup failed.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
			<motion.div
				variants={containerVariants}
				initial='hidden'
				animate='visible'
				className='bg-white p-8 rounded-xl shadow-xl w-full max-w-2xl'>
				<motion.div className='text-center mb-6' variants={itemVariants}>
					<h1 className='text-2xl font-bold'>Create Your Mentora Account</h1>
					<p className='text-gray-600 text-sm mt-1'>
						Already registered?{' '}
						<Link to='/login' className='text-primary underline'>
							Login here
						</Link>
					</p>
				</motion.div>

				<form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
					{/* Common Fields */}
					{['name', 'email', 'mobile', 'password'].map((field) => (
						<motion.div key={field} variants={itemVariants}>
							<Label htmlFor={field}>
								{field.charAt(0).toUpperCase() + field.slice(1)}
							</Label>
							<Input
								id={field}
								{...register(field)}
								placeholder={`Enter your ${field}`}
								type={
									field === 'password'
										? 'password'
										: field === 'email'
										? 'email'
										: 'text'
								}
							/>
						</motion.div>
					))}

					{/* Role Selector */}
					<motion.div variants={itemVariants}>
						<Label htmlFor='role'>Select Role</Label>
						<select
							id='role'
							{...register('role')}
							className='h-10 w-full border rounded-md px-3 bg-gray-50 focus:ring-primary/30'>
							<option value='student'>Student</option>
							<option value='teacher'>Teacher</option>
							<option value='parent'>Parent</option>
						</select>
					</motion.div>

					{/* Address Fields */}
					<motion.div variants={itemVariants} className='grid gap-3'>
						<Label>Address Details</Label>
						<Input
							{...register('residentialAddress.address')}
							placeholder='Street Address'
						/>
						<div className='grid grid-cols-2 gap-3'>
							<Input
								{...register('residentialAddress.city')}
								placeholder='City'
							/>
							<Input
								{...register('residentialAddress.state')}
								placeholder='State'
							/>
						</div>
						<div className='grid grid-cols-2 gap-3'>
							<Input
								{...register('residentialAddress.country')}
								placeholder='Country'
							/>
							<Input
								{...register('residentialAddress.zipCode')}
								placeholder='Zip Code (Optional)'
							/>
						</div>
					</motion.div>

					{/* Teacher-specific fields */}
					{role === 'teacher' && (
						<motion.div variants={itemVariants} className='space-y-3'>
							<Label>Qualification</Label>
							<Input
								{...register('qualification')}
								placeholder='e.g., M.Sc, B.Ed'
							/>
							<Label>Grade Subjects</Label>
							{gradeSubjectFields.map((field, index) => (
								<div key={field.id} className='flex items-center gap-2'>
									<Input
										{...register(`gradeSubjects.${index}.gradeSubjectId`)}
										placeholder='Grade Subject ID'
									/>
									<Button
										type='button'
										variant='destructive'
										onClick={() => removeGradeSubject(index)}>
										<Trash2 size={16} />
									</Button>
								</div>
							))}
							<Button
								type='button'
								variant='outline'
								onClick={() => addGradeSubject({ gradeSubjectId: '' })}>
								<Plus size={16} /> Add Subject
							</Button>
						</motion.div>
					)}

					{/* Student-specific fields */}
					{role === 'student' && (
						<motion.div variants={itemVariants} className='space-y-3'>
							<Input {...register('parentId')} placeholder='Parent ID' />
							<Input {...register('gradeId')} placeholder='Grade ID' />
							<Label>Subjects</Label>
							{subjectFields.map((field, index) => (
								<div
									key={field.id}
									className='grid grid-cols-2 gap-2 items-center'>
									<Input
										{...register(`subjects.${index}.subjectId`)}
										placeholder='Subject ID'
									/>
									<Input
										{...register(`subjects.${index}.teacherId`)}
										placeholder='Teacher ID'
									/>
									<Button
										type='button'
										variant='destructive'
										onClick={() => removeSubject(index)}>
										<Trash2 size={16} />
									</Button>
								</div>
							))}
							<Button
								type='button'
								variant='outline'
								onClick={() =>
									addSubject({ subjectId: '', teacherId: '', status: 'Live' })
								}>
								<Plus size={16} /> Add Subject
							</Button>
						</motion.div>
					)}

					{/* Submit */}
					<motion.div variants={itemVariants}>
						<Button type='submit' className={cn('w-full')} disabled={loading}>
							{loading ? (
								<span className='flex items-center justify-center gap-2'>
									<Loader2 size={16} className='animate-spin' /> Creating
									Account...
								</span>
							) : (
								'Create Account'
							)}
						</Button>
					</motion.div>
				</form>
			</motion.div>
		</div>
	);
}
