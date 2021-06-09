type IRange = 0 | 1 | 2 | 3 | 4 | 5
type IUnite = 'gr' | 'kg' | 'ml' | 'cl' | 'l'

interface IMateriel {
	nom: string;
	quantite: number;
	obligatoire: boolean;
}

interface IIngredient {
	nom: string;
	quantite: number;
	obligatoire: boolean;
	unite: IUnite;
}

interface IEtape {
	ordre: number;
	description: string;
	unite: IUnite;
}

interface IRecipe  {
	nom: string;
	indicateurs: {
		temps_preparation: number;
		temps_vaisselle: number;
		temps_cuisson: number;
		difficulte: IRange;
		nombre_personnes: number;
		cout: IRange;
	};
	materiel: IMateriel[];
	photo: string;
	favori: boolean;
	ingredients: IIngredient[];
	etapes: IEtape[]
}