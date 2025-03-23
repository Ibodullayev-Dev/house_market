import { User } from "src/modules/users/entities/user.entity";

declare module 'express' {
	export interface Request {
		user?:User
	}
}
