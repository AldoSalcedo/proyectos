import React, { createContext, useContext, useState, useCallback } from "react";

interface FoodContextType {
  refreshFoods: () => void;
  refreshTimestamp: number;
}

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export function FoodProvider({ children }: { children: React.ReactNode }) {
  const [refreshTimestamp, setRefreshTimestamp] = useState(0);

  const refreshFoods = useCallback(() => {
    setRefreshTimestamp(Date.now());
  }, []);

  return (
    <FoodContext.Provider value={{ refreshFoods, refreshTimestamp }}>
      {children}
    </FoodContext.Provider>
  );
}

export function useFoodContext() {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error("useFoodContext must be used within a FoodProvider");
  }
  return context;
}
