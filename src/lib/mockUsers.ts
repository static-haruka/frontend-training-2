import { User } from "@/types/user";

export type OrgNode = {
  id: string;
  name: string;
  children?: OrgNode[];
};

export const orgTree: OrgNode[] = [
  { id: "ht", name: "テストHT社", children: [] },
  { id: "toranomon", name: "虎ノ門オフィス", children: [] },
  {
    id: "a-honsha",
    name: "Aテスト本社",
    children: [
      {
        id: "a-shisha",
        name: "Aテスト支社",
        children: [
          {
            id: "a-honbu",
            name: "Aテスト本部",
            children: [{ id: "a-ka", name: "Aテスト課" }],
          },
        ],
      },
    ],
  },
  {
    id: "b-honsha",
    name: "Bテスト本社",
    children: [
      {
        id: "b-shisha",
        name: "Bテスト支社",
        children: [
          {
            id: "b-honbu",
            name: "Bテスト本部",
            children: [{ id: "b-ka", name: "Bテスト課" }],
          },
        ],
      },
    ],
  },
];

export type UserWithOrg = User & { orgId: string };

export const mockUsers: UserWithOrg[] = [
  {
    id: "1",
    orgId: "a-honsha",
    lastName: "外部会社テスト",
    firstName: "1",
    lastNameKana: "ガイブカイシャテスト",
    firstNameKana: "イチ",
    employeeId: "000000001",
    role: "Aテスト本社",
    department: "Aテスト本社",
    company: "外部会社",
    email: "test1@example.com",
    phone: "090-0000-0001",
    gender: "男性",
    joinedAt: "2020-04-01",
    password: "",
  },
  {
    id: "2",
    orgId: "a-honsha",
    lastName: "外部会社",
    firstName: "誠",
    lastNameKana: "ガイブカイシャ",
    firstNameKana: "マコト",
    employeeId: "000000001",
    role: "Aテスト本社",
    department: "Aテスト本社",
    company: "test",
    email: "makoto@example.com",
    phone: "090-0000-0002",
    gender: "男性",
    joinedAt: "2019-04-01",
    password: "",
  },
  {
    id: "3",
    orgId: "a-honsha",
    lastName: "本社社員",
    firstName: "1",
    lastNameKana: "ホンシャシャイン",
    firstNameKana: "イチ",
    employeeId: "000000001",
    role: "Aテスト本社",
    department: "Aテスト本社",
    company: "テスト社員",
    email: "honsha1@example.com",
    phone: "090-0000-0003",
    gender: "女性",
    joinedAt: "2021-04-01",
    password: "",
  },
  {
    id: "4",
    orgId: "a-honsha",
    lastName: "森",
    firstName: "誠",
    lastNameKana: "モリ",
    firstNameKana: "マコト",
    employeeId: "000000001",
    role: "Aテスト本社",
    department: "Aテスト本社",
    company: "マネージャー",
    email: "mori@example.com",
    phone: "090-0000-0004",
    gender: "男性",
    joinedAt: "2018-04-01",
    password: "",
  },
  {
    id: "5",
    orgId: "a-honsha",
    lastName: "大江",
    firstName: "博之",
    lastNameKana: "オオエ",
    firstNameKana: "ヒロユキ",
    employeeId: "000000001",
    role: "Aテスト本社",
    department: "Aテスト本社",
    company: "一般社員",
    email: "ooe@example.com",
    phone: "090-0000-0005",
    gender: "男性",
    joinedAt: "2022-04-01",
    password: "",
  },
  {
    id: "6",
    orgId: "a-honsha",
    lastName: "大高",
    firstName: "慎太郎",
    lastNameKana: "オオタカ",
    firstNameKana: "シンタロウ",
    employeeId: "000000001",
    role: "Aテスト本社",
    department: "Aテスト本社",
    company: "一般社員",
    email: "otaka@example.com",
    phone: "090-0000-0006",
    gender: "男性",
    joinedAt: "2022-04-01",
    password: "",
  },
  {
    id: "7",
    orgId: "a-honsha",
    lastName: "曽我",
    firstName: "裕貴",
    lastNameKana: "ソガ",
    firstNameKana: "ユウキ",
    employeeId: "000000001",
    role: "Aテスト本社",
    department: "Aテスト本社",
    company: "一般社員",
    email: "soga@example.com",
    phone: "090-0000-0007",
    gender: "女性",
    joinedAt: "2023-04-01",
    password: "",
  },
  {
    id: "8",
    orgId: "a-honsha",
    lastName: "土屋",
    firstName: "誠",
    lastNameKana: "ツチヤ",
    firstNameKana: "マコト",
    employeeId: "000000001",
    role: "Aテスト本社",
    department: "Aテスト本社",
    company: "一般社員",
    email: "tutiya@example.com",
    phone: "090-0000-0008",
    gender: "女性",
    joinedAt: "2023-04-01",
    password: "",
  },
  {
    id: "9",
    orgId: "a-honsha",
    lastName: "テスト",
    firstName: "ユーザー",
    lastNameKana: "テスト",
    firstNameKana: "ユーザー",
    employeeId: "000000001",
    role: "Aテスト本社",
    department: "Aテスト本社",
    company: "SES",
    email: "testuser@example.com",
    phone: "090-0000-0009",
    gender: "男性",
    joinedAt: "2023-04-01",
    password: "",
  },
  {
    id: "10",
    orgId: "a-honsha",
    lastName: "テスト",
    firstName: "ユーザー",
    lastNameKana: "テスト",
    firstNameKana: "ユーザー",
    employeeId: "000000001",
    role: "Aテスト本社",
    department: "Aテスト本社",
    company: "SES",
    email: "testuser@example.com",
    phone: "090-0000-0009",
    gender: "男性",
    joinedAt: "2023-04-01",
    password: "",
  },
  {
    id: "11",
    orgId: "a-honsha",
    lastName: "テスト",
    firstName: "ユーザー",
    lastNameKana: "テスト",
    firstNameKana: "ユーザー",
    employeeId: "000000001",
    role: "Aテスト本社",
    department: "Aテスト本社",
    company: "SES",
    email: "testuser@example.com",
    phone: "090-0000-0009",
    gender: "男性",
    joinedAt: "2023-04-01",
    password: "",
  },
];

export function getDescendantIds(nodes: OrgNode[], targetId: string): string[] {
  for (const node of nodes) {
    if (node.id === targetId) {
      const ids = [node.id];
      const collectChildren = (n: OrgNode) => {
        n.children?.forEach((c) => {
          ids.push(c.id);
          collectChildren(c);
        });
      };
      collectChildren(node);
      return ids;
    }
    if (node.children) {
      const found = getDescendantIds(node.children, targetId);
      if (found.length > 0) return found;
    }
  }
  return [];
}
