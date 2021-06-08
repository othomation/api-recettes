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

export class Etape {
  titre: string;
  description: string;
  numero: number;
}
@Entity()
export class Recipe {
  @ObjectIdColumn() id: ObjectID;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

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
    example: 2,
    description:
      'Le niveau estimé de difficulte du plat entre 1(inclus) et 6(inclus).',
  })
  @Column()
  @IsAValidDifficulte()
  difficulte: 1 | 2 | 3 | 4 | 6;

  @ApiProperty({ example: 'Chebakiya', description: 'Le nom du plat.' })
  @Column()
  @IsString({ message: 'Le nom doit être une chaîne de caractère.' })
  nom: string;

  @Column({ default: [] })
  @IsAValidStep()
  @ApiProperty({
    example: [
      {
        numero: 1,
        titre: 'Allumer le four',
        description:
          "D'abord, il faut allumer le four à 240 degrès, puis enfourner la preparation préalablement refrigérée",
      },
      {
        numero: 2,
        titre: 'Gouter',
        description:
          'Woaw cette recette est si rapide, je peux déjà la déguster',
      },
    ],
    isArray: true,
    description: 'Un tableau des étapes de la recette.',
  })
  etapes: Array<Etape>;

  @ApiProperty({
    example: ['farine', 'lait', 'oeuf'],
    description:
      'Un tableau de chaînes de caractères representants les différents ingrédients du plat.',
  })
  @Column()
  @IsAValidIngredient()
  @IsArray()
  ingredients: Array<string>;

  @Column()
  @ApiProperty({ example: [...Object.keys(Student)].join(' | ') })
  @IsAValideStudentName()
  eleve_code: string;

  constructor(recipe?: Partial<Recipe>) {
    Object.assign(this, recipe);
  }
}
