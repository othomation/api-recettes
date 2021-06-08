import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.entity';
import { Crud } from '@nestjsx/crud';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('API-recettes')
@Controller('recettes')
export class RecetteController {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipesRepository: MongoRepository<Recipe>,
  ) {}

  @Get()
  @ApiOperation({
    summary: "Récuperer toutes les recettes indépendaments de l'élève.",
  })
  @ApiResponse({
    description: 'Recettes',
    type: Recipe,
    isArray: true,
  })
  async getRecipes(): Promise<Recipe[]> {
    return await this.recipesRepository.find();
  }

  @Get('custom/:eleve_code')
  @ApiParam({
    name: 'eleve_code',
    required: true,
    description: "Le code de l'élève.",
  })
  @ApiOperation({
    summary: "Récuperer toutes les recettes d'un élève par son eleve_code.",
  })
  @ApiResponse({
    description: 'Recettes',
    type: Recipe,
    isArray: true,
  })
  async getRecipesByEleveCode(
    @Param('eleve_code') eleve_code,
  ): Promise<Recipe[]> {
    return await (await this.recipesRepository.find()).filter(
      (recipe) => recipe.eleve_code === eleve_code,
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID de la recette.',
  })
  @ApiOperation({ summary: 'Récuperer une recette par son ID.' })
  async getRecipe(@Param('id') id): Promise<Recipe> {
    const recipe =
      ObjectID.isValid(id) && (await this.recipesRepository.findOne(id));
    if (!recipe) throw new NotFoundException('Recette non trouvée');
    return recipe;
  }

  @Post()
  @ApiOperation({ summary: 'Inserer une nouvelle recette' })
  async createRecette(@Body() recipe: Recipe): Promise<Recipe> {
    if (!recipe || !recipe.nom) {
      throw new BadRequestException('Le document envoyé est incorred.');
    }
    return await this.recipesRepository.save(new Recipe(recipe));
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID de la recette',
  })
  @ApiOperation({ summary: 'Modifier une recette existante par son ID.' })
  @HttpCode(204)
  async updateRecette(
    @Param('id') id,
    @Body() recipe: Recipe,
  ): Promise<Recipe> {
    const isValid =
      ObjectID.isValid(id) && (await this.recipesRepository.findOne(id));
    if (!isValid) throw new NotFoundException();
    await this.recipesRepository.update(id, recipe);
    return await this.recipesRepository.findOne(id);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID de la recette.',
  })
  @ApiOperation({ summary: 'Supprimer une recette existante par son ID.' })
  @HttpCode(204)
  async deleteRecette(@Param('id') id): Promise<void | { success: boolean }> {
    const isValid =
      ObjectID.isValid(id) && (await this.recipesRepository.findOne(id));
    if (!isValid) throw new NotFoundException();
    await this.recipesRepository.delete(id);
    return { success: true };
  }
}
