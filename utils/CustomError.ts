export class CustomError extends Error {
	status: string;
	constructor(public message: string, public statusCode: number) {
		super(message);
		this.status = String(statusCode).startsWith('4') ? 'error' : 'fail';

		Error.captureStackTrace(this, this.constructor);
	}
}
