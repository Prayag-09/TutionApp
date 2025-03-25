import {
	generateUserReportService,
	generateTuitionReportService,
	generateFeeReportService,
	generateAttendanceReportService,
} from '../services/report-services';

// Generate user report
export const generateUserReport = async () => {
	try {
		const report = await generateUserReportService();
		return { success: true, data: report };
	} catch (error: any) {
		throw new Error(error.message || 'Error generating user report');
	}
};

// Generate tuition report
export const generateTuitionReport = async () => {
	try {
		const report = await generateTuitionReportService();
		return { success: true, data: report };
	} catch (error: any) {
		throw new Error(error.message || 'Error generating tuition report');
	}
};

// Generate fee report
export const generateFeeReport = async () => {
	try {
		const report = await generateFeeReportService();
		return { success: true, data: report };
	} catch (error: any) {
		throw new Error(error.message || 'Error generating fee report');
	}
};

// Generate attendance report
export const generateAttendanceReport = async () => {
	try {
		const report = await generateAttendanceReportService();
		return { success: true, data: report };
	} catch (error: any) {
		throw new Error(error.message || 'Error generating attendance report');
	}
};
