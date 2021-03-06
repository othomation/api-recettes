import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

import { Student } from './student.entity';

export function IsAValideStudentName(ValidationOptions?: ValidationOptions) {
  return function (object: Object, propertyname: string) {
    registerDecorator({
      name: 'IsAValideStudentName',
      target: object.constructor,
      propertyName: propertyname,
      constraints: [],
      options: ValidationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return value in Student;
        },
        defaultMessage(message: ValidationArguments) {
          let msg = [...Object.keys(Student)].join(' | ');
          return (
            message.property +
            ' : ' +
            message.value +
            " ==>Merci d'utiliser votre prenom, afin que chacun(e) puisse utiliser ses propres recettes de son côté s'iel le souhaite. --  " +
            msg
          );
        },
      },
    });
  };
}

export function IsAValidDifficulte(ValidationOptions?: ValidationOptions) {
  return function (object: Object, propertyname: string) {
    registerDecorator({
      name: 'IsAValidDifficulte',
      target: object.constructor,
      propertyName: propertyname,
      constraints: [],
      options: ValidationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          console.log(value);
          return value >= 0 && value < 6;
        },
        defaultMessage(message: ValidationArguments) {
          return (
            message.property +
            ' : ' +
            message.value +
            ' ===>' +
            'La difficulté doit être un nombre entier et se situer entre 0 (inclus) et 5 (inclus).'
          );
        },
      },
    });
  };
}

export function IsAValidStep(ValidationOptions?: ValidationOptions) {
  return function (object: Object, propertyname: string) {
    registerDecorator({
      name: 'IsAValdStep',
      target: object.constructor,
      propertyName: propertyname,
      constraints: [],
      options: ValidationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          // if (!Array.isArray(value)) return false;
          return Array.isArray(value);
        },
        defaultMessage(message: ValidationArguments) {
          return (
            message.property +
            ' : ' +
            message.value +
            ' |> ' +
            message.constraints +
            ' -- Avez vous bien enovyer un tableau ?'
          );
        },
      },
    });
  };
}

export function IsAValidIngredient(ValidationOptions?: ValidationOptions) {
  return function (object: Object, propertyname: string) {
    registerDecorator({
      name: 'IsAValidIngredient',
      target: object.constructor,
      propertyName: propertyname,
      constraints: [],
      options: ValidationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          // if (!Array.isArray(value)) return false;
          // let isValid = true;
          // value.forEach((val) => {
          //   if (!isValid) return isValid;
          //   isValid =
          //     val &&
          //     val.nom &&
          //     typeof val.nom === 'string' &&
          //     val.quantite &&
          //     typeof val.quantite === 'number' &&
          //     typeof val.obligatoire === 'boolean' &&
          //     (typeof val.unite === 'string' ||
          //       typeof val.unite ===
          //         'number') /* val.unite in ['gr','kg','ml','cl','l'] */;
          // });
          return Array.isArray(value);
        },
        defaultMessage(message: ValidationArguments) {
          return (
            message +
            "La propriété ingrédients doit être un tableau d'objets correspondant au schema."
          );
        },
      },
    });
  };
}
