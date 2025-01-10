import AsyncStorage from "@react-native-async-storage/async-storage";
import { FoodInput } from "@/types/index";
import { isToday } from "date-fns";

const MY_FOOD_KEY = "@MyFood:Key";
const MY_TODAY_FOOD_KEY = "@MyTodayFood:Key";

export const useFoodStorage = () => {
  const saveInfoToStorage = async (storageKey: string, meal: FoodInput) => {
    try {
      const currentSavedFood = await AsyncStorage.getItem(storageKey);

      if (currentSavedFood !== null) {
        const currentSavedFoodParsed = JSON.parse(currentSavedFood);
        currentSavedFoodParsed.push(meal);

        await AsyncStorage.setItem(
          storageKey,
          JSON.stringify(currentSavedFoodParsed),
        );

        return meal;
      }

      await AsyncStorage.setItem(storageKey, JSON.stringify([meal]));
      return meal;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleSaveFood = async ({ calories, name, portion }: FoodInput) => {
    try {
      const result = await saveInfoToStorage(MY_FOOD_KEY, {
        calories,
        name,
        portion,
      });
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleGetFoods = async () => {
    try {
      const foods = await AsyncStorage.getItem(MY_FOOD_KEY);

      if (foods !== null) {
        const parsedFoods = JSON.parse(foods);
        return Promise.resolve(parsedFoods);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleSaveTodayFood = async ({
    calories,
    name,
    portion,
  }: FoodInput) => {
    try {
      const savedMeal = await saveInfoToStorage(MY_TODAY_FOOD_KEY, {
        calories,
        name,
        portion,
        date: new Date().toISOString(),
      });
      console.log(savedMeal); // aqui me arroda undefined
      return Promise.resolve(savedMeal);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleGetTodayFood = async () => {
    try {
      const foods = await AsyncStorage.getItem(MY_TODAY_FOOD_KEY);

      if (foods !== null) {
        const parsedFoods = JSON.parse(foods) as FoodInput[];
        return Promise.resolve(
          parsedFoods.filter(
            (meal) => meal.date && isToday(new Date(meal.date)),
          ),
        );
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    onSaveFood: handleSaveFood,
    onGetFoods: handleGetFoods,
    onSaveTodayFood: handleSaveTodayFood,
    onGetTodayFood: handleGetTodayFood,
  };
};

// metodo para obtener la comida del dia de hoy
