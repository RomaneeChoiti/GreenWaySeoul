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

const rdsCaCertPath = join(__dirname, '..', process.env.RDS_CA_CERT_PATH);

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
