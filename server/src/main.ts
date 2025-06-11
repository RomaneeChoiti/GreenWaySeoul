import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3030;
  // TODO : CORS 설정을 환경변수로 관리할 수 있도록 변경
  app.enableCors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://greenwayseoul.p-e.kr'
        : 'http://localhost:3030',
    credentials: true,
  });

  await app.listen(port);
  console.log(`http://localhost:${port}`);
}
bootstrap();
