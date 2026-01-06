import axios from "axios";
import type { Issue } from "./issueService";

const API_URL = import.meta.env.VITE_API_ISSUES_URL || "http://localhost:5000/api/issues";

export const getFilteredIssues = async (
  token: string,
  filters: { title?: string; status?: string; priority?: string; page?: number; limit?: number }
): Promise<{ total: number; page: number; limit: number; issues: Issue[]; stats: Record<string, number> }> => {
  const params: Record<string, string | number> = {};
  if (filters.title) params.title = filters.title;
  if (filters.status && filters.status !== "All Statuses") params.status = filters.status;
  if (filters.priority && filters.priority !== "All Priorities") params.priority = filters.priority;
  if (filters.page) params.page = filters.page;
  if (filters.limit) params.limit = filters.limit;
  const url = Object.keys(params).length > 0 ? `${API_URL}/search` : API_URL;
  const res = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });
  return res.data;
};
