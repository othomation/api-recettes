import IRange from "./range.model";
export default interface IIndicators {
	temps_preparation: number;
	temps_vaisselle: number;
	temps_cuisson: number;
	difficulte: IRange.OneToFive;
	nombre_personnes: number;
	cout: IRange.OneToFive;
}