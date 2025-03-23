import { BadRequestException, CanActivate, ExecutionContext, HttpException, HttpStatus, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/modules/users/entities/user.entity";
import { Repository } from "typeorm";
import * as CryptoJS from 'crypto-js';

export class JwtAuthGuard implements CanActivate {

	private jwtSecretKey: string
	private aesKey: string

	constructor(
		@InjectRepository(User)
		private readonly userRepo: Repository<User>,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {
		this.jwtSecretKey = this.configService.get<string>('SECRET_KEY')
		this.aesKey = this.configService.get<string>('AES_KEY')
	}

	// 
	async canActivate(context: ExecutionContext): Promise<boolean> {
		try {

			const req = context.switchToHttp().getRequest()
			const header = req.headers.authorization

			if (!header || !header.startsWith('Bearer ')) {
				throw new UnauthorizedException(`Missing or invalid authentication token`)
			}

			let token: string = header.split(" ")[1]
			if (!token) throw new UnauthorizedException('Missing authentication token')

			const bytes = CryptoJS.AES.decrypt(token, this.aesKey)
			token = bytes.toString(CryptoJS.enc.Utf8)

			const decoded = await this.jwtService.verify(token, { secret: this.jwtSecretKey })

			if (!decoded.sub) throw new BadRequestException(`The token content is corrupted`)

			const user: User = await this.userRepo.findOne({ where: { id: decoded?.sub } })

			if (!user) throw new UnauthorizedException(`Unauthorized user!`)

			req.user = user
			return true
		} catch (error: any) {
			if (
				error.name === "JsonWebTokenError" ||
				error.message === "Malformed UTF-8 data"
			) throw new UnauthorizedException("Xato token")

			if (error.name === "TokenExpiredError") throw new UnauthorizedException("Token amal qilish muddati tugagan")

			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}
}