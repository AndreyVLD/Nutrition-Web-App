// This file contains TypeScript interfaces for the Users saved when the user logs in.

export interface SessionUser {
	id: number;
	email: string;
	isAdmin: boolean;
}
