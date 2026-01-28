import StreakCard from "./components/StreakCard";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StreakCard />
    </div>
  );
}
