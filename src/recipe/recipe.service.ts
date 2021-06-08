import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class RecipeService extends TypeOrmCrudService<Recipe> {
  constructor(@InjectRepository(Recipe) recipe) {
    super(recipe);
  }
}
