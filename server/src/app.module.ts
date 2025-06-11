import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ImageModule } from './image/image.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FavoriteModule } from './favorite/favorite.module';
import * as fs from 'fs';
import * as path from 'path';

const rdsCaCertPath =
  process.env.NODE_ENV === 'production'
    ? path.join(__dirname, 'ap-northeast-2-bundle.pem') // 배포 환경
    : path.join(__dirname, '..', 'ap-northeast-2-bundle.pem'); // 개발 환경

if (process.env.NODE_ENV === 'production') {
  if (!fs.existsSync(rdsCaCertPath)) {
    console.error(
      `ERROR: RDS CA cert file does NOT exist at path: ${rdsCaCertPath}`,
    );
  } else {
    console.log('RDS CA cert file exists.');
  }
}

console.log('Resolved RDS CA cert path:', rdsCaCertPath);
console.log(
  'Is path a file:',
  fs.existsSync(rdsCaCertPath),
  fs.statSync(rdsCaCertPath).isFile(),
);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'production' ? '.env' : '.env.dev',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: 5432,
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity.{js,ts}'],
        synchronize: configService.get<string>('NODE_ENV') !== 'production',
        ssl:
          configService.get<string>('NODE_ENV') === 'production'
            ? {
                rejectUnauthorized: true,
                ca: fs.readFileSync(rdsCaCertPath).toString(),
              }
            : false,
      }),
      inject: [ConfigService],
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    PostModule,
    AuthModule,
    ImageModule,
    FavoriteModule,
  ],

  providers: [ConfigService],
})
export class AppModule {}
