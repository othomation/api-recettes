import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recette } from './recette.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class RecetteService extends TypeOrmCrudService<Recette> {
  constructor(@InjectRepository(Recette) recette) {
    super(recette);
  }
}
