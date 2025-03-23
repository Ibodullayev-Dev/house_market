import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class LoginAuthDto {

	@ApiProperty({ example: "johndoe", description: "Foydalanuvchi logini" })
	@IsNotEmpty()
	@IsString()
	login: string;

	@ApiProperty({
		example: "Aaa123",
		description: "Parol 4-8 ta belgidan iborat bo‘lishi kerak. Kamida 1 ta katta harf, 1 ta kichik harf va 3 ta raqam bo‘lishi shart.",
		minLength: 4,
		maxLength: 8
	})
	@IsNotEmpty()
	@IsString()
	@Length(4, 8, { message: "Password must be at least 4 characters and at most 8 characters." })
	@Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=(?:.*\d){3,})[A-Za-z\d]{4,8}$/, {
		message: "Parol kamida 1 ta katta harf, 1 ta kichik harf va 3 ta raqamdan iborat bo‘lishi kerak (maxsus belgilar kiritilmasin)"
	})
	password: string;

}
