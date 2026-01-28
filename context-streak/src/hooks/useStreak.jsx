import { useEffect, useState } from "react";

export function useStreak() {
  const [streak, setStreak] = useState(0);
  const [checkedToday, setCheckedToday] = useState(false);

  const today = new Date().toDateString();

  useEffect(() => {
    const lastVisit = localStorage.getItem("lastVisit");
    const savedStreak = Number(localStorage.getItem("streak")) || 0;

    if (lastVisit === today) {
      setCheckedToday(true);
      setStreak(savedStreak);
    } else {
      setCheckedToday(false);
      setStreak(savedStreak);
    }
  }, [today]);

  function checkIn() {
    const lastVisit = localStorage.getItem("lastVisit");
    const savedStreak = Number(localStorage.getItem("streak")) || 0;

    if (!lastVisit) {
      localStorage.setItem("streak", "1");
      setStreak(1);
    } else {
      const diffDays =
        (new Date(today) - new Date(lastVisit)) /
        (1000 * 60 * 60 * 24);

      if (diffDays === 1) {
        localStorage.setItem("streak", String(savedStreak + 1));
        setStreak(savedStreak + 1);
      } else if (diffDays > 1) {
        localStorage.setItem("streak", "1");
        setStreak(1);
      }
    }

    localStorage.setItem("lastVisit", today);
    setCheckedToday(true);
  }

  return { streak, checkedToday, checkIn };
}
