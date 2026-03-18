import {
  LayoutDashboard,
  Grid3X3,
  Cloud,
  BookOpen,
  Film,
  Network,
  BarChart3,
  UserCog,
} from "lucide-react";

export type NavItem = {
  label: string;
  icon: React.ElementType;
  href?: string;
  children?: { label: string; href: string }[];
};

export const navItems: NavItem[] = [
  {
    label: "ダッシュボード",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "ポータル",
    icon: Grid3X3,
    href: "/portal",
  },
  {
    label: "AWS",
    icon: Cloud,
    children: [
      { label: "AWS利用料金", href: "/aws/cost" },
      { label: "AWSインスタンス一覧", href: "/aws/instances" },
    ],
  },
  {
    label: "電子書籍",
    icon: BookOpen,
    children: [
      { label: "アップロード", href: "/ebooks/upload" },
      { label: "電子書籍管理", href: "/ebooks/manage" },
    ],
  },
  {
    label: "動画管理",
    icon: Film,
    children: [
      { label: "カテゴリ管理", href: "/videos/categories" },
      { label: "動画管理", href: "/videos/manage" },
    ],
  },
  {
    label: "VPC",
    icon: Network,
    href: "/vpc",
  },
  {
    label: "経営ダッシュボード",
    icon: BarChart3,
    href: "/management-dashboard",
  },
  {
    label: "ユーザー管理",
    icon: UserCog,
    href: "/users",
  },
];
