import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CorsConfig, SetupGlobalPipes, SwaggerConfig } from './configs';
import { NotFoundExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configServie = app.get(ConfigService)

  app.setGlobalPrefix('api')

  CorsConfig(app)
  SwaggerConfig(app)
  SetupGlobalPipes(app)

  app.useGlobalFilters(new NotFoundExceptionFilter())

  const port = configServie.get<number>("PORT")

  await app.listen(port, () => {
    console.log(`Server run on port: ${port}`)
  });
}
bootstrap();
