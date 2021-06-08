import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { RecipeService } from './recipe.service';
import { RecetteController } from './recipe.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe])],
  providers: [RecipeService],
  controllers: [RecetteController],
})
export class RecetteModule {}
