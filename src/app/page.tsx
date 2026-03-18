import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Calendar from "@/components/calendar/Calendar";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f0f2f5" }}>
      <Header />
      <Sidebar />
      <main
        className="transition-all duration-300"
        style={{
          marginTop: "48px",
          marginLeft: "210px",
          padding: "24px",
          minHeight: "calc(100vh - 48px)",
        }}
      >
        <div
          style={{
            height: "4px",
            backgroundColor: "#4a90d9",
            marginBottom: "16px",
            borderRadius: "2px",
          }}
        />
        <Calendar />
      </main>
    </div>
  );
}
