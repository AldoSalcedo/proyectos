export interface FoodInput {
  name: string;
  calories: number | null;
  portion: number | null;
  date?: string;
}

export type TodayCaloriesProps = {
  total: number | string;
  consumed: number | string;
  remaining: number | string;
  percentage: number;
};
