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
import { RecetteService } from './recette.service';
import { Recette } from './recette.entity';
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
@ApiTags('recettes')
@Controller('recettes')
export class RecetteController {
  constructor(
    @InjectRepository(Recette)
    private readonly recettesRepository: MongoRepository<Recette>,
  ) {}

  @Get()
  @ApiOperation({
    summary: "Récuperer toutes les recettes indépendaments de l'élève.",
  })
  @ApiResponse({
    description: 'Recettes',
    type: Recette,
    isArray: true,
  })
  async getRecettes(): Promise<Recette[]> {
    return await this.recettesRepository.find();
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
    type: Recette,
    isArray: true,
  })
  async getRecettesByEleveCode(
    @Param('eleve_code') eleve_code,
  ): Promise<Recette[]> {
    return await (await this.recettesRepository.find()).filter(
      (recette) => recette.eleve_code === eleve_code,
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID de la recette.',
  })
  @ApiOperation({ summary: 'Récuperer une recette par son ID.' })
  async getRecette(@Param('id') id): Promise<Recette> {
    const recette =
      ObjectID.isValid(id) && (await this.recettesRepository.findOne(id));
    console.log(recette);
    if (!recette) throw new NotFoundException('Jai pas trouve wsh');
    return recette;
  }

  @Post()
  @ApiOperation({ summary: 'Inserer une nouvelle recette' })
  async createRecette(@Body() recette: Recette): Promise<Recette> {
    if (!recette || !recette.nom) {
      throw new BadRequestException('Le document envoyé est incorred.');
    }
    return await this.recettesRepository.save(new Recette(recette));
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
    @Body() recette: Recette,
  ): Promise<Recette> {
    const isValid =
      ObjectID.isValid(id) && (await this.recettesRepository.findOne(id));
    if (!isValid) throw new NotFoundException();
    await this.recettesRepository.update(id, recette);
    return await this.recettesRepository.findOne(id);
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
      ObjectID.isValid(id) && (await this.recettesRepository.findOne(id));
    if (!isValid) throw new NotFoundException();
    await this.recettesRepository.delete(id);
    return { success: true };
  }
}
