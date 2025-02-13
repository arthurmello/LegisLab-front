const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchParlamentares() {
  const res = await fetch(`${API_URL}/parlamentares`);
  if (!res.ok) throw new Error("Failed to fetch parlamentares");
  return res.json();
}