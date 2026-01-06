import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SidebarNav from "../components/SidebarNav";
import IssuesTable from "../components/IssuesTable";
import StatsCard from "../components/StatsCard";
import CreateIssueModal from "../components/CreateIssueModal";
import EditIssueModal from "../components/EditIssueModal";
import {
  getIssues,
  deleteIssue as apiDeleteIssue,
  updateIssue as apiUpdateIssue,
  createIssue as apiCreateIssue,
} from "../services/issueService";
import { getFilteredIssues } from "../services/filterService";
import {
  setIssues,
  addIssue as addIssueAction,
  updateIssue as updateIssueAction,
  deleteIssue as deleteIssueAction,
} from "../redux/slices/issueSlice";
import type { RootState } from "../redux/store";
import type { Issue } from "../services/issueService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token") || "";
  const issues = useSelector((state: RootState) => state.issues.issues);
  const user = useSelector((state: RootState) => state.auth.user);

  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingIssue, setEditingIssue] = useState<Issue | null>(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Statuses");
  const [priority, setPriority] = useState("All Priorities");

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
      URL.revokeObjectURL(url);
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

  const handleEdit = (id: string) => {
    const found = issues.find((i) => i.id?.toString() === id) || null;
    setEditingIssue(found);
    setEditModalOpen(true);
  };

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const filters: { title?: string; status?: string; priority?: string } =
          {};
        if (search) filters.title = search;
        if (status && status !== "All Statuses") filters.status = status;
        if (priority && priority !== "All Priorities")
          filters.priority = priority;
        if (Object.keys(filters).length > 0) {
          const data = await getFilteredIssues(token, filters);
          dispatch(setIssues(data.issues || data));
        } else {
          const data = await getIssues(token);
          dispatch(setIssues(data));
        }
      } catch (err) {
        console.error("Failed to fetch issues", err);
      }
    };
    fetchIssues();
  }, [dispatch, token, search, status, priority]);

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
            const newIssue = await apiCreateIssue(token, data);
            if (newIssue && newIssue.id) {
              dispatch(addIssueAction(newIssue));
            } else {
              const data = await getIssues(token);
              dispatch(setIssues(data));
            }
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
          selectedPage={"dashboard"}
          setSelectedPage={() => {}}
          isAdmin={false}
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

          <div className="flex-1 overflow-y-auto pt-20">
            <div className="max-w-7xl mx-auto w-full flex flex-col gap-8 px-8 pt-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    All Issues
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Manage and track all reported system anomalies and feature
                    requests.
                  </p>
                </div>
                <button
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all shadow-sm shadow-blue-500/30"
                  onClick={() => setModalOpen(true)}
                >
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
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  <span>Create Issue</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  {
                    title: "Total Issues",
                    value: issues.length,
                    color: "purple",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-purple-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
                      </svg>
                    ),
                  },
                  {
                    title: "Open Issues",
                    value: issues.filter((i) => i.status === "Open").length,
                    color: "red",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                      </svg>
                    ),
                  },
                  {
                    title: "In Progress",
                    value: issues.filter((i) => i.status === "In Progress").length,
                    color: "blue",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-blue-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                      </svg>
                    ),
                  },
                  {
                    title: "Resolved",
                    value: issues.filter((i) => i.status === "Resolved").length,
                    color: "green",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-green-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    ),
                  },
                ].map((s, i) => (
                  <StatsCard
                    key={i}
                    title={s.title}
                    value={s.value}
                    icon={s.icon}
                    iconBg={`bg-${s.color}-50`}
                  />
                ))}
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
                <div className="flex flex-col w-full gap-4 md:flex-row md:gap-4 flex-1">
                  <div className="flex-1 w-full">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="search"
                        id="search"
                        className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Filter issues..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-45">
                    <label htmlFor="status" className="sr-only">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 appearance-none"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option>All Statuses</option>
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                      <option>Closed</option>
                    </select>
                  </div>
                  <div className="w-full md:w-45 hidden sm:block">
                    <label htmlFor="priority" className="sr-only">
                      Priority
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 appearance-none"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                    >
                      <option>All Priorities</option>
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  {(search ||
                    status !== "All Statuses" ||
                    priority !== "All Priorities") && (
                    <button
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-all"
                      onClick={() => {
                        setSearch("");
                        setStatus("All Statuses");
                        setPriority("All Priorities");
                      }}
                      title="Reset filters"
                    >
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
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                      Reset
                    </button>
                  )}
                  <button
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all shadow-sm shadow-green-500/20"
                    onClick={handleExport}
                    title="Export filtered data"
                    type="button"
                  >
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
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                      />
                    </svg>
                    Export
                  </button>
                </div>
              </div>

              <IssuesTable
                issues={tableIssues}
                onDelete={handleDelete}
                onEdit={handleEdit}
                hideCreatedBy
                hideEmail
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default UserDashboard;
