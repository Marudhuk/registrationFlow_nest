import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  const config = new DocumentBuilder()
    .setTitle('Simple CRUD API')
    .setDescription('CRUD Using NestJS and MySQL').
    setVersion('1.0')
    .addTag('CRUD').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api',app, document);
    app.useGlobalPipes(new ValidationPipe( { transform : true } ));
  await app.listen(4000);
}
bootstrap();
