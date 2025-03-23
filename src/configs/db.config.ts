import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { User } from "src/modules/users/entities/user.entity";

export const TypeOrmConfig: TypeOrmModuleAsyncOptions = {
	useFactory: async (configService: ConfigService) => ({
		type: "postgres",
		url: configService.get<string>('DB_URL'),
		synchronize: true,
		logging: false,
		autoLoadEntities: true,
		entities: [User],
	}),
	inject: [ConfigService]
}