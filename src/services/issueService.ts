
import axios from "axios";

const API_URL = import.meta.env.VITE_API_ISSUES_URL || "http://localhost:5000/api/issues";

export interface Issue {
  id?: number;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status?: "Open" | "In Progress" | "Resolved" | "Closed";
  created_by?: number;
  created_at?: string;
  updated_at?: string;
  creator_name?: string;
  creator_email?: string;
}

export const getIssues = async (token: string): Promise<Issue[]> => {
  try {
    const res = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data.message || "Fetch issues failed");
    }
    throw err;
  }
};

export const createIssue = async (
  token: string,
  data: Omit<Issue, "id" | "status">
): Promise<Issue> => {
  try {
    const res = await axios.post(API_URL, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data.message || "Create issue failed");
    }
    throw err;
  }
};

export const updateIssue = async (
  token: string,
  id: number,
  data: Partial<Issue>
): Promise<Issue> => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data.message || "Update issue failed");
    }
    throw err;
  }
};

export const deleteIssue = async (token: string, id: number): Promise<{ message: string }> => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data.message || "Delete issue failed");
    }
    throw err;
  }
};

export const updateIssueStatus = async (
  token: string,
  id: number,
  status: Issue["status"]
): Promise<Issue> => {
  try {
    const res = await axios.patch(
      `${API_URL}/${id}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data.message || "Update status failed");
    }
    throw err;
  }
};

export const getStatusCounts = async (token: string): Promise<{ status: string; count: number }[]> => {
  try {
    const res = await axios.get(`${API_URL}/stats/status`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data.message || "Fetch status counts failed");
    }
    throw err;
  }
};
