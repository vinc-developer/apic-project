import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        console.log('Erreurs de validation reçues:', errors); // Débogage

        if (!errors || !Array.isArray(errors)) {
          return new BadRequestException('Données invalides');
        }

        const errorMessages = errors.flatMap((err) => {
          if (err.children && err.children.length > 0) {
            // Traiter les erreurs des enfants (par exemple, pour les tableaux)
            return err.children.flatMap(childError => {
              if (!childError || !childError.constraints) {
                return [`${childError.property} - Erreur de validation inconnue`];
              }
              return Object.values(childError.constraints).map(constraint => `${childError.property} - ${constraint}`);
            });
          }

          // Traiter les erreurs de la propriété actuelle
          if (!err.constraints) {
            return [`${err.property} - Erreur de validation inconnue`];
          }
          return Object.values(err.constraints).map(constraint => `${err.property} - ${constraint}`);
        });

        return new BadRequestException(`Erreurs de validation : ${errorMessages.join(', ')}`);
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
