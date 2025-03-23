import { INestApplication } from "@nestjs/common";

export const CorsConfig = (app: INestApplication) => {
	app.enableCors({
		origin: true,
		allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		credentials: true
	})
}