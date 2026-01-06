
export interface Issue {
  id: number;
  title: string;
  description: string;
  status: string | null;
  priority: string;
  created_by: number;
  created_at: string;
  updated_at: string;
}

export interface UserWithIssues {
  id: number;
  name: string;
  email: string;
  role: string;
  issues: Issue[];
  issueCount: number;
}


export async function getAllUsers(token: string): Promise<UserWithIssues[]> {
  console.log('getAllUsers token:', token);
  const res = await fetch("/api/auth/users", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch all users");
  const data = await res.json();
  console.log('getAllUsers response:', data);
  return data;
}


export async function getUsersWithIssues(token: string): Promise<UserWithIssues[]> {
  const res = await fetch("/api/auth/users/issues", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}
