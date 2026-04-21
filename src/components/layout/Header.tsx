"use client";

type Props = {
  sidebarWidth: number;
  title?: string;
  showAccountInfo?: boolean;
};

export default function Header({
  sidebarWidth,
  title = "管理CMS",
  showAccountInfo = true,
}: Props) {
  const titleLeft = sidebarWidth + 122;

  return (
    <header
      className="fixed top-0 right-0 z-30 flex items-center"
      style={{
        left: "0px",
        height: "44px",
        backgroundColor: "#ffffff",
        paddingRight: "20px",
        borderBottom: "1px solid #d8dde6",
      }}
    >
      <h1
        className="absolute font-semibold"
        style={{
          left: `${titleLeft}px`,
          color: "#8a8d93",
          fontSize: "18px",
          letterSpacing: 0,
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </h1>
      {showAccountInfo && (
        <div
          className="ml-auto flex items-center gap-2 text-sm flex-shrink-0"
          style={{ color: "#6b7280" }}
        >
          <span>admin：Aテスト本社</span>
          <span>テスト管理者 ユーザー</span>
        </div>
      )}
    </header>
  );
}
