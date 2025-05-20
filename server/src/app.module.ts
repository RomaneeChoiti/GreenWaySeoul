import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username : 'choeseung-won',
      password : 'postgres',
      database : 'greenWaySeoul-server',
      entities: [__dirname + '/**/*.entity{js,ts}'],
      synchronize: true, // 개발용에서만 true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
