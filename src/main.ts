import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://10.0.0.39:3000',
      'https://gerenciamento-lw-frontend.vercel.app',
    ], // coloque aqui a URL do seu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // se usar cookies
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
