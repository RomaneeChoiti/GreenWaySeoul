import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3030;
  if (process.env.NODE_ENV === 'production') {
    app.enableCors({
      origin: 'https://greenwayseoul.p-e.kr',
      credentials: true,
    });
  } else {
    app.enableCors({
      origin: 'http://localhost:3030',
      credentials: true,
    });
  }

  await app.listen(port);
  console.log(`http://localhost:${port}`);
}
bootstrap();
