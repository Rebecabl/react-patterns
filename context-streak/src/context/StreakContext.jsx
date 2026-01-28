import { createContext, useContext } from "react";
import { useStreak } from "../hooks/useStreak";

const StreakContext = createContext(null);

export function StreakProvider({ children }) {
  const streakData = useStreak();

  return (
    <StreakContext.Provider value={streakData}>
      {children}
    </StreakContext.Provider>
  );
}

export function useStreakContext() {
  const context = useContext(StreakContext);
  if (!context) {
    throw new Error("useStreakContext must be used inside StreakProvider");
  }
  return context;
}
