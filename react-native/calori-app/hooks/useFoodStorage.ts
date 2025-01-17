/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Meal, AddMealParams } from '../types'

const STORAGE_KEY = '@food-tracker:meals'

export function useFoodStorage() {
  const saveMeal = useCallback(async (params: AddMealParams): Promise<void> => {
    try {
      const currentMeals = await getMeals()
      const newMeal: Meal = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        ...params,
      }

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([...currentMeals, newMeal])
      )
    } catch (error) {
      console.error('Error saving meal:', error)
      throw new Error('Failed to save meal')
    }
  }, [])

  const getMeals = useCallback(async (): Promise<Meal[]> => {
    try {
      const meals = await AsyncStorage.getItem(STORAGE_KEY)
      return meals ? JSON.parse(meals) : []
    } catch (error) {
      console.error('Error getting meals:', error)
      return []
    }
  }, [])

  const getTodayMeals = useCallback(async (): Promise<Meal[]> => {
    try {
      const meals = await getMeals()
      const today = new Date().toISOString().split('T')[0]

      return meals.filter((meal) => meal.date.split('T')[0] === today)
    } catch (error) {
      console.error('Error getting today meals:', error)
      return []
    }
  }, [])

  const removeMeal = useCallback(async (id: string): Promise<void> => {
    try {
      const meals = await getMeals()
      const filteredMeals = meals.filter((meal) => meal.id !== id)
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredMeals))
    } catch (error) {
      console.error('Error removing meal:', error)
      throw new Error('Failed to remove meal')
    }
  }, [])

  return {
    saveMeal,
    getMeals,
    getTodayMeals,
    removeMeal,
  }
}
