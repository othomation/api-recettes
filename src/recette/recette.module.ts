import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recette } from './recette.entity';
import { RecetteService } from './recette.service';
import { RecetteController } from './recette.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Recette])],
  providers: [RecetteService],
  controllers: [RecetteController],
})
export class RecetteModule {}
