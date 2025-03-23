import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const SwaggerConfig = (app: INestApplication) => {

	const configService = app.get(ConfigService); // ConfigService ni olish

	const baseUrl = configService.get<string>('API_URL') || 'http://localhost:3000';

	const options = new DocumentBuilder()
		.setTitle('House market')
		.setDescription('House market API documentation')
		.setVersion('1.0')
		.addTag('House market API')
		.addServer(`${baseUrl}/`, `Dynamic Server`)
		.addBearerAuth()
		.build()

	const document = SwaggerModule.createDocument(app, options)
	SwaggerModule.setup('api/docs', app, document)
}