import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  ObjectID,
} from 'typeorm';
import {
  IsAValidDifficulte,
  IsAValidStep,
  IsAValideStudentName,
  IsAValidIngredient,
} from './recipe.validator';

import { Student } from './student.entity';

import IIngredient from './models/ingredient.model';
import IMaterial from './models/material.model';
import IRange from './models/range.model';
import IStep from './models/step.model';
import IUnit from './models/unit.model';
import IIndicators from './models/indicators.model';

@Entity()
export class Recipe {
  @ObjectIdColumn() id: ObjectID;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  /**
   * nom
   */
  @ApiProperty({ example: 'Chebakiya', description: 'Le nom du plat.' })
  @Column()
  @IsString({ message: 'Le nom doit être une chaîne de caractère.' })
  nom: string;

  /**
   * imageUrl
   */
  @ApiProperty({
    example:
      'https://i.pinimg.com/originals/4a/d6/04/4ad6041e7a4aa1084155c7a349090c37.gif',
    description: "Une url pointant vers l'image du plat.",
  })
  @Column({
    default:
      'https://i.pinimg.com/originals/4a/d6/04/4ad6041e7a4aa1084155c7a349090c37.gif',
  })
  @IsUrl()
  @IsOptional()
  imageUrl: string;

  @ApiProperty({
    example: {
      temps_preparation: 20,
      temps_vaisselle: 10,
      temps_cuisson: 40,
      difficulte: 2,
      nombre_personnes: 4,
      cout: 1,
    },
    description:
      "Les differents indicateurs de temps, dififculte etc.. d'une recette ! ",
  })
  @Column()
  indicateurs: IIndicators;

  @ApiProperty({
    example: [
      { nom: 'Moule à tarte', quantite: 1, obligatoire: true },
      { nom: 'Four', quantite: 1, obligatoire: false },
    ],
    description:
      'La liste des matériaux nécessaires. Comme un four ! Pensez aux étudiant(e)s...',
  })
  @Column()
  materiel: IMaterial[];

  @ApiProperty({
    example: true,
    description: 'Oui ou non selon que cette recette est dans vos favoris.',
  })
  @Column()
  favoris: boolean;

  // @ApiProperty({
  //   example: 2,
  //   description:
  //     'Le niveau estimé de difficulte du plat entre 0(inclus) et 5(inclus).',
  // })
  // @Column()
  // @IsAValidDifficulte()
  // difficulte: IRange.OneToFive | number;

  @Column({ default: [] })
  @IsAValidStep()
  @ApiProperty({
    example: [
      {
        ordre: 1,
        obligatoire: true,
        description:
          "D'abord, il faut allumer le four à 240 degrès, puis enfourner la preparation préalablement refrigérée",
      },
      {
        numero: 2,
        obligatoire: false,
        description:
          'Woaw cette recette est si rapide, je peux déjà la déguster',
      },
    ],
    isArray: true,
    description: 'Un tableau des étapes de la recette.',
  })
  etapes: IStep[];

  @ApiProperty({
    example: [
      { nom: 'farine', quantite: 100, obligatoire: true, unite: 'gr' },
      { nom: 'lait', quantite: 1, obligatoire: true, unite: 'l' },
    ],
    isArray: true,
    description:
      "Une liste des différents ingrédients du plat, sous forme d'objet chacun.",
  })
  @Column({ default: [] })
  @IsAValidIngredient()
  @IsArray()
  ingredients: IIngredient[];

  @Column()
  @ApiProperty({ example: [...Object.keys(Student)].join(' | ') })
  @IsAValideStudentName()
  eleve_code: string;

  constructor(recipe?: Partial<Recipe>) {
    Object.assign(this, recipe);
  }
}
