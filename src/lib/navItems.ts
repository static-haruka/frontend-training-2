import {
  LayoutDashboard,
  Grid3X3,
  Cloud,
  BookOpen,
  Film,
  Network,
  BarChart3,
  UserCog,
  DollarSign,
  Server,
  Upload,
  Library,
  FolderOpen,
  Video,
} from "lucide-react";

export type NavItem = {
  label: string;
  icon: React.ElementType;
  href?: string;
  children?: { label: string; href: string; icon: React.ElementType }[];
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
      { label: "AWS利用料金",        href: "/aws/cost",        icon: DollarSign },
      { label: "AWSインスタンス一覧", href: "/aws/instances",   icon: Server },
    ],
  },
  {
    label: "電子書籍",
    icon: BookOpen,
    children: [
      { label: "アップロード",   href: "/ebooks/upload", icon: Upload },
      { label: "電子書籍管理",   href: "/ebooks/manage", icon: Library },
    ],
  },
  {
    label: "動画管理",
    icon: Film,
    children: [
      { label: "カテゴリ管理", href: "/videos/categories", icon: FolderOpen },
      { label: "動画管理",     href: "/videos/manage",     icon: Video },
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
