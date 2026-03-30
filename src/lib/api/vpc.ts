import { VpcStack } from "@/types/vpc";

const BASE_URL = "https://69c38ed2b780a9ba03e72550.mockapi.io/api/v1";

export const getStacks = async (): Promise<VpcStack[]> => {
  const res = await fetch(`${BASE_URL}/stacks`);
  if (!res.ok) throw new Error("Failed to fetch stacks");
  return res.json();
};

export const createStack = async (
  data: Omit<VpcStack, "id">,
): Promise<VpcStack> => {
  const res = await fetch(`${BASE_URL}/stacks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create stack");
  return res.json();
};

export const updateStack = async (
  id: string,
  data: Partial<VpcStack>,
): Promise<VpcStack> => {
  const res = await fetch(`${BASE_URL}/stacks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update stack");
  return res.json();
};

export const deleteStack = async (id: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/stacks/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("deleteStack failed:", res.status, text);
    throw new Error(`Failed to delete stack: ${res.status}`);
  }
};
