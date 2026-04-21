"use client";

type Tab = {
  label: string;
  value: string;
};

const TABS: Tab[] = [
  { label: "すべて", value: "all" },
  { label: "ア", value: "ア" },
  { label: "カ", value: "カ" },
  { label: "サ", value: "サ" },
  { label: "タ", value: "タ" },
  { label: "ナ", value: "ナ" },
  { label: "ハ", value: "ハ" },
  { label: "マ", value: "マ" },
  { label: "ヤ", value: "ヤ" },
  { label: "ラ", value: "ラ" },
  { label: "ワ", value: "ワ" },
  { label: "A〜Z", value: "A" },
  { label: "0〜9", value: "0" },
  { label: "その他", value: "other" },
  { label: "名前なし", value: "none" },
];

const KANA_ROWS: Record<string, string[]> = {
  ア: ["ア", "イ", "ウ", "エ", "オ"],
  カ: ["カ", "キ", "ク", "ケ", "コ"],
  サ: ["サ", "シ", "ス", "セ", "ソ"],
  タ: ["タ", "チ", "ツ", "テ", "ト"],
  ナ: ["ナ", "ニ", "ヌ", "ネ", "ノ"],
  ハ: ["ハ", "ヒ", "フ", "ヘ", "ホ"],
  マ: ["マ", "ミ", "ム", "メ", "モ"],
  ヤ: ["ヤ", "ユ", "ヨ"],
  ラ: ["ラ", "リ", "ル", "レ", "ロ"],
  ワ: ["ワ", "ヲ", "ン"],
};

type Props = {
  activeTab: string;
  onTabChange: (value: string) => void;
  onCreateClick: () => void;
};

export default function KanaTab({
  activeTab,
  onTabChange,
  onCreateClick,
}: Props) {
  return (
    <div
      className="flex items-center gap-0.5 px-4 py-2 overflow-x-auto"
      style={{ borderBottom: "1px solid #e2e8f0", backgroundColor: "#ffffff" }}
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.value;
        return (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className="px-1.5 py-1 rounded text-xs whitespace-nowrap transition-colors"
            style={{
              color: isActive ? "#38a169" : "#718096",
              borderBottom: isActive
                ? "2px solid #38a169"
                : "2px solid transparent",
              fontWeight: isActive ? 600 : 400,
            }}
          >
            {tab.label}
          </button>
        );
      })}
      <button
        onClick={onCreateClick}
        className="ml-auto px-3 py-1.5 rounded text-xs text-white flex-shrink-0 font-medium"
        style={{ backgroundColor: "#38a169" }}
      >
        アカウント作成 ＋
      </button>
    </div>
  );
}

export function filterUsersByTab(
  users: { lastNameKana: string; firstName: string; lastName: string }[],
  tab: string,
) {
  if (tab === "all") return users;
  if (tab === "none") return users.filter((u) => !u.lastName && !u.firstName);

  if (tab === "A") {
    return users.filter((u) => /^[A-Za-z]/.test(u.lastNameKana || u.lastName));
  }

  if (tab === "0") {
    return users.filter((u) => /^[0-9]/.test(u.lastNameKana || u.lastName));
  }

  if (tab === "other") {
    const allKana = Object.values(KANA_ROWS).flat();
    return users.filter((u) => {
      const first = (u.lastNameKana || u.lastName).charAt(0);
      return first && !allKana.includes(first) && !/^[A-Za-z0-9]/.test(first);
    });
  }

  const kanaRow = KANA_ROWS[tab] || [];
  return users.filter((u) => {
    const first = u.lastNameKana.charAt(0);
    return kanaRow.includes(first);
  });
}
