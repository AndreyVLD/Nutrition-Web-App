// This file contains TypeScript interfaces for the FoodData Central API responses.

export interface FoodSearchResponse {
	totalHits: number;
	totalPages: number;
	foods: Food[];
}

export interface Food {
	fdcId: number;
	description: string;
	dataType: 'Foundation' | 'Branded' | 'SR Legacy' | 'Survey (FNDDS)' | 'Experimental';
	foodCategory: string;
	foodNutrients: FoodNutrient[];
	brandOwner?: string;
}

export interface FoodNutrient {
	nutrientId: number;
	nutrientName: string;
	nutrientNumber: string;
	unitName: string;
	value: number;
}
