import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Retire automatiquement les propriétés non spécifiées dans le DTO
      forbidNonWhitelisted: true, // Lance une exception si des propriétés non spécifiées sont présentes
      transform: true, // Transforme le payload en une instance du DTO
      exceptionFactory: (errors) => {
        const errorMessages = errors.map(
          (err) =>
            `${err.property} - ${Object.values(err.constraints).join(', ')}`,
        );
        return new BadRequestException(errorMessages);
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
