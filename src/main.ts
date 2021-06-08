import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const options = new DocumentBuilder()
    .setTitle('API - Recettes de cuisine !')
    .setDescription(
      'Bienvenue dans la documentation/playground de cette api très simple pour ajouter, consulter, modifier ou supprimer des recettes de cuisine.',
    )
    .setVersion('1.0')
    .build();
  app.useGlobalPipes(new ValidationPipe());
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(process.env.PORT || 5000, () =>
    console.log(`App is listening on port `, process.env.PORT || 5000),
  );
}
bootstrap();
