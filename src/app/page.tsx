import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f0f2f5" }}>
      <Header />
      <Sidebar />
      <main
        style={{
          marginTop: "48px",
          marginLeft: "210px",
          padding: "24px",
          minHeight: "calc(100vh - 48px)",
        }}
      >
        {/*コンテンツを追加 */}
      </main>
    </div>
  );
}
