import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recette } from './recette/recette.entity';
import { RecetteModule } from './recette/recette.module';
import { RecetteService } from './recette/recette.service';
import { configService } from './config/config.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    TypeOrmModule.forFeature([Recette]),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_CONN,
      database: process.env.MONGODB_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      ssl: true,
      useUnifiedTopology: true,
    }),
    ConfigModule.forRoot(),
    RecetteModule,
  ],
  providers: [RecetteService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        {
          path: 'recettes',
          method: RequestMethod.GET,
        },
        {
          path: 'recettes',
          method: RequestMethod.POST,
        },
        'recettes/(.*)',
      )
      .forRoutes('*');
  }
}
