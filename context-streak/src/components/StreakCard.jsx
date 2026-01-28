import { useStreakContext } from "../context/StreakContext";

export default function StreakCard() {
  const { streak, checkedToday, checkIn } = useStreakContext();
  const progress = Math.min(streak, 7);

  return (
    <div style={styles.card}>
      <div style={styles.number}>{streak}</div>

      <div style={styles.label}>
        {streak === 1 ? "dia de ofensiva" : "dias de ofensiva"}
      </div>

      <div style={styles.dots}>
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            style={{
              ...styles.dot,
              background: i < progress ? "#facc15" : "#e5e7eb",
            }}
          />
        ))}
      </div>

      {checkedToday ? (
        <div style={styles.success}>
          ✓ Presença de hoje confirmada
        </div>
      ) : (
        <button style={styles.button} onClick={checkIn}>
          Marcar presença hoje
        </button>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "#ffffff",
    width: 420,
    padding: "48px 32px",
    borderRadius: 32,
    textAlign: "center",
    border: "1px solid #e5e7eb",
  },
  number: {
    fontSize: 96,
    fontWeight: 800,
    color: "#2563eb",
    lineHeight: 1,
  },
  label: {
    marginTop: 8,
    fontSize: 20,
    color: "#1e3a8a",
    fontWeight: 500,
  },
  dots: {
    display: "flex",
    justifyContent: "center",
    gap: 12,
    marginTop: 32,
    marginBottom: 28,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: "50%",
  },
  success: {
    fontSize: 16,
    color: "#16a34a",
    fontWeight: 600,
  },
  button: {
    marginTop: 12,
    width: "100%",
    padding: 16,
    borderRadius: 999,
    border: "none",
    background: "#2563eb",
    color: "#ffffff",
    fontSize: 18,
    fontWeight: 700,
    cursor: "pointer",
  },
};
