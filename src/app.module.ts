import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'spotify_clone',
      host: '127.0.0.1',

      port: 5432,
      username: 'postgres',
      password: 'root',
      synchronize: true,
      entities: [],
    }),
    SongsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {
    console.log('Data Base: ', dataSource.driver.database);
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('songs');
  }
}
