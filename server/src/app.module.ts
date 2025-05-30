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

console.log('RDS_CA_CERT_PATH env:', process.env.RDS_CA_CERT_PATH);

const rdsCaCertPath = join(__dirname, process.env.RDS_CA_CERT_PATH ?? '');

console.log('Resolved RDS CA Cert Path:', rdsCaCertPath);

if (!fs.existsSync(rdsCaCertPath)) {
  console.error(
    `ERROR: RDS CA cert file does NOT exist at path: ${rdsCaCertPath}`,
  );
} else {
  console.log('RDS CA cert file exists.');
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: false, // Set to false in production

      ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync(rdsCaCertPath).toString(),
      },
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
