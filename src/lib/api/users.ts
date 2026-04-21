import { User } from "@/types/user";
import { UserWithOrg } from "@/lib/mockUsers";

const BASE_URL = "https://69c38ed2b780a9ba03e72550.mockapi.io/api/v1";

type CreateUserData = Omit<User, "id"> & { orgId: string };

export const getUsers = async (): Promise<UserWithOrg[]> => {
  const res = await fetch(`${BASE_URL}/users`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

export const createUser = async (
  data: CreateUserData,
): Promise<UserWithOrg> => {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create user");
  return res.json();
};

export const updateUser = async (
  id: string,
  data: Partial<User>,
): Promise<UserWithOrg> => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update user");
  return res.json();
};

export const deleteUser = async (id: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/users/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`Failed to delete user: ${res.status}`);
};
