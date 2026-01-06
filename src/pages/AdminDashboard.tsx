

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../redux/store";
import SidebarNav from "../components/SidebarNav";
import DashboardContent from "./DashboardContent";
import CreateIssueModal from "../components/CreateIssueModal";
import EditIssueModal from "../components/EditIssueModal";
import {
  deleteIssue as apiDeleteIssue,
  updateIssue as apiUpdateIssue,
  createIssue as apiCreateIssue,
} from "../services/issueService";
import { getFilteredIssues } from "../services/filterService";
import {
  setIssues,
  updateIssue as updateIssueAction,
  deleteIssue as deleteIssueAction,
} from "../redux/slices/issueSlice";
import { fetchAllUsers } from "../redux/slices/userSlice";
import type { RootState } from "../redux/store";
import AllUsersPage from "./AllUsersPage";
import type { Issue } from "../services/issueService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = localStorage.getItem("token") || "";
  const issues = useSelector((state: RootState) => state.issues.issues);
  const users = useSelector((state: RootState) => state.users.users);
  const usersLoading = useSelector((state: RootState) => state.users.loading);
  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.role === "ADMIN";

  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingIssue, setEditingIssue] = useState<Issue | null>(null);
  const [selectedPage, setSelectedPage] = useState("dashboard");

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Statuses");
  const [priority, setPriority] = useState("All Priorities");
 
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const handleEdit = (id: string) => {
    const found = issues.find((i) => i.id?.toString() === id) || null;
    setEditingIssue(found);
    setEditModalOpen(true);
  };

 
  const [stats, setStats] = useState({
    open: 0,
    inProgress: 0,
    resolved: 0,
    closed: 0,
    total: 0,
  });

  useEffect(() => {
    if (selectedPage === "dashboard") {
      const fetchIssues = async () => {
        try {
          const filters: {
            title?: string;
            status?: string;
            priority?: string;
            page?: number;
            limit?: number;
          } = {};
          if (search) filters.title = search;
          if (status && status !== "All Statuses") filters.status = status;
          if (priority && priority !== "All Priorities")
            filters.priority = priority;
          filters.page = page;
          filters.limit = limit;
          const data = await getFilteredIssues(token, filters);
          dispatch(setIssues(data.issues));
          setTotal(data.total || data.issues.length);
          setStats({
            open: data.stats.Open || 0,
            inProgress: data.stats["In Progress"] || 0,
            resolved: data.stats.Resolved || 0,
            closed: data.stats.Closed || 0,
            total: data.total || 0,
          });
        } catch (err) {
          console.error("Failed to fetch issues", err);
        }
      };
      fetchIssues();
    } else if (selectedPage === "users") {
      dispatch(fetchAllUsers(token));
    }
  }, [dispatch, token, search, status, priority, selectedPage, page, limit]);

  const tableIssues = issues.map((issue) => ({
    id: issue.id?.toString() || "",
    title: issue.title,
    code: `ISS-${issue.id}`,
    status: issue.status || "Open",
    priority: issue.priority || "Medium",
    createdBy: issue.creator_name || "---",
    created: issue.created_at
      ? new Date(issue.created_at).toLocaleDateString()
      : "---",
    creatorEmail: issue.creator_email || "",
  }));

 
  const handleDelete = async (id: string) => {
    if (!id) return;
    try {
      await apiDeleteIssue(token, Number(id));
      dispatch(deleteIssueAction(Number(id)));
      toast.success("Issue deleted successfully");
    } catch {
      toast.error("Failed to delete issue");
    }
  };


  function downloadFile(filename: string, content: string, mime: string) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url)
    }, 0);
  }

  function issuesToCSV(issues: typeof tableIssues) {
    if (!issues.length) return "";
    const headers = Object.keys(issues[0]);
    const csvRows = [headers.join(",")];
    for (const row of issues) {
      const rowObj = row as Record<string, unknown>;
      csvRows.push(
        headers
          .map((h) => '"' + String(rowObj[h] ?? "").replace(/"/g, '""') + '"')
          .join(",")
      );
    }
    return csvRows.join("\n");
  }

  function handleExport() {
    const csv = issuesToCSV(tableIssues);
    downloadFile("issues.csv", csv, "text/csv");
  }

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <CreateIssueModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={async (data) => {
          try {
            await apiCreateIssue(token, data);

            const filters: {
              title?: string;
              status?: string;
              priority?: string;
              page?: number;
              limit?: number;
            } = {};
            if (search) filters.title = search;
            if (status && status !== "All Statuses") filters.status = status;
            if (priority && priority !== "All Priorities")
              filters.priority = priority;
            filters.page = page;
            filters.limit = limit;
            const result = await getFilteredIssues(token, filters);
            dispatch(setIssues(result.issues));
            setTotal(result.total || result.issues.length);
            toast.success("Issue created successfully");
            setModalOpen(false);
          } catch (err) {
            toast.error(
              (err instanceof Error && err.message) || "Failed to create issue"
            );
          }
        }}
      />
      <EditIssueModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        issue={editingIssue}
        onUpdate={async (data) => {
          if (!editingIssue || editingIssue.id === undefined) return;
          try {
            const updated = await apiUpdateIssue(token, editingIssue.id, data);
            dispatch(updateIssueAction(updated));
            toast.success("Issue updated successfully");
            setEditModalOpen(false);
          } catch (err) {
            toast.error(
              (err instanceof Error && err.message) || "Failed to update issue"
            );
          }
        }}
      />
      <div className="min-h-screen bg-gray-100 flex">
        <SidebarNav
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          isAdmin={isAdmin}
          user={user}
        />
      
        <main className="flex-1 flex flex-col min-w-0 bg-background-light p-0 ml-64">
     
          <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 z-20 fixed top-0 left-64 right-0 w-auto">
          
            <div className="flex items-center gap-4 ml-auto">
              <button className="relative p-2 rounded-full text-slate-500 hover:bg-gray-100 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                  />
                </svg>
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <button className="p-2 rounded-full text-slate-500 hover:bg-gray-100 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                  />
                </svg>
              </button>
              <div className="h-8 w-px bg-gray-200 mx-2"></div>
              <button className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full bg-cover bg-center border border-gray-200"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA-06ZXy3aCGxujFAEMsb3Pk8rJKOzkoCRW9lsq1x6hXT1rhiLZWitCjHg92Ytxg-XO3VzVmq0_dHe-RnLfFrZE2cYY13qR9Jw2-mc4-732tPAIkseUb-v_R_Lim7znk35ZQt_hld2dZNOpw79qssXiXi8-IZ466HzsVLF5QyNR-1bkhfUUASkPiknKmsixRJz-g-VLr87a7k5R6Mm6N1vkccyjEJXMpvlKPO02nlAYEtiqQnL-rU0BgFAYkQKeSSxqhWyHpP_WJck')",
                  }}
                ></div>
              </button>
            </div>
          </header>
   
          {selectedPage === "dashboard" ? (
            <DashboardContent
              issues={tableIssues}
              search={search}
              setSearch={setSearch}
              status={status}
              setStatus={setStatus}
              priority={priority}
              setPriority={setPriority}
              handleExport={handleExport}
              setModalOpen={setModalOpen}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              page={page}
              limit={limit}
              total={total}
              setPage={setPage}
              stats={stats}
            />
          ) : usersLoading ? (
            <div className="pt-24 px-8 text-lg text-slate-500">
              Loading users...
            </div>
          ) : (
            (() => {
            
              return <AllUsersPage users={users} />;
            })()
          )}
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
