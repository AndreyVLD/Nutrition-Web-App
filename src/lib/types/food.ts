export interface FoodSearchResponse {
	totalHits: number;
	totalPages: number;
	foods: Food[];
}

interface Food {
	fdcId: number;
	description: string;
	dataType: 'Foundation' | 'Branded' | 'SR Legacy' | 'Survey (FNDDS)' | 'Experimental';
	foodCategory: string;
	foodNutrients: FoodNutrient[];
	brandOwner?: string;
}

interface FoodNutrient {
    nutrientId: number;
    nutrientName: string;
    nutrientNumber: string;
    unitName: string;
    value: number;
}
