import { VpcStack } from "@/types/vpc";

const BASE_URL = "https://69c38ed2b780a9ba03e72550.mockapi.io/api/v1";

export const getStacks = async (): Promise<VpcStack[]> => {
  const res = await fetch(`${BASE_URL}/stacks`);
  if (!res.ok) throw new Error("Failed to fetch stacks");
  return res.json();
};

export const createStack = async (
  data: Omit<VpcStack, "id">
): Promise<VpcStack> => {
  const res = await fetch(`${BASE_URL}/stacks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create stack");
  return res.json();
};
