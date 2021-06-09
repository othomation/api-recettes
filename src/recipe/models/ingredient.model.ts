import IUnit from "./unit.model";

export default interface IIngredient {
	nom: string;
	quantite: number;
	obligatoire: boolean;
	unite: IUnit;
}
