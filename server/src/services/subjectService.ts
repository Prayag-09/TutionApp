import { Subject } from '../models/schema';

export interface ISubject {
	name: string;
	description?: string;
	status?: 'Live' | 'Archive';
}

const createSubject = async (subjectData: ISubject): Promise<any> => {
	const subject = new Subject(subjectData);
	await subject.save();
	return subject;
};

const updateSubject = async (
	subjectId: string,
	updateData: Partial<ISubject>
): Promise<any> => {
	return await Subject.findByIdAndUpdate(subjectId, updateData, { new: true });
};

const changeSubjectStatus = async (
	subjectId: string,
	status: 'Live' | 'Archive'
): Promise<any> => {
	return await Subject.findByIdAndUpdate(subjectId, { status }, { new: true });
};

export default {
	createSubject,
	updateSubject,
	changeSubjectStatus,
};
