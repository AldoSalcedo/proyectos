export interface Meal {
  id: string;
  name: string;
  calories: number;
  portion: number;
  date: string;
}

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
}

export interface AddMealParams {
  name: string;
  calories: number;
  portion: number;
}
