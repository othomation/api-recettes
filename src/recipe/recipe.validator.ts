import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";

import { Student } from "./student.entity";

export function IsAValideStudentName(ValidationOptions?: ValidationOptions) {
  return function (object: Object, propertyname: string) {
    registerDecorator({
      name: "IsAValideStudentName",
      target: object.constructor,
      propertyName: propertyname,
      constraints: [],
      options: ValidationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return value in Student;
        },
        defaultMessage(message: ValidationArguments) {
          let msg = [...Object.keys(Student)].join(" | ");
          return (
            "Merci d'utiliser votre prenom, afin que chacun(e) puisse utiliser ses propres recettes de son côté s'iel le souhaite. --  " +
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
      name: "IsAValidDifficulte",
      target: object.constructor,
      propertyName: propertyname,
      constraints: [],
      options: ValidationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return value >= 0 && value < 6 && Number.isInteger(value);
        },
        defaultMessage(message: ValidationArguments) {
          return "La difficulté doit être un nombre entier et se situer entre 0 (inclus) et 5 (inclus).";
        },
      },
    });
  };
}

export function IsAValidStep(ValidationOptions?: ValidationOptions) {
  return function (object: Object, propertyname: string) {
    registerDecorator({
      name: "IsAValdStep",
      target: object.constructor,
      propertyName: propertyname,
      constraints: [],
      options: ValidationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!Array.isArray(value)) return false;
          let isValid = true;
          value.forEach((val) => {
            if (!isValid) return isValid;
            isValid =
              val &&
              val.ordre &&
              typeof val.ordre === "number" && val.ordre in [0,1,2,3,4,5] &&
              val.description &&
              typeof val.description === "string" &&
              typeof val.obligatoire === "boolean";
          });
          return isValid;
        },
        defaultMessage(message: ValidationArguments) {
          return "A priori, il manquait soit le titre, soit la description, soit le numero, soit plusieurs ou toutes.";
        },
      },
    });
  };
}

export function IsAValidIngredient(ValidationOptions?: ValidationOptions) {
  return function (object: Object, propertyname: string) {
    registerDecorator({
      name: "IsAValidIngredient",
      target: object.constructor,
      propertyName: propertyname,
      constraints: [],
      options: ValidationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!Array.isArray(value)) return false;
          let isValid = true;
          value.forEach((val) => {
            if (!isValid) return isValid;    isValid =
              val &&
              val.nom &&
              typeof val.nom === "string" &&
              val.quantite &&
              typeof val.quantite === "number" &&
              typeof val.obligatoire === "boolean" && val.unite in ['gr','kg','ml','cl','l'];
           });
          return isValid;
        },
        defaultMessage(message: ValidationArguments) {
          return "La propriété ingrédients doit être un tableau d'objets correspondant au schema.";
        },
      },
    });
  };
}
