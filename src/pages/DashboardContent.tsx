import React from "react";
import StatsCard from "../components/StatsCard";
import IssuesTable from "../components/IssuesTable";

interface DashboardContentProps {
  issues: {
    id: string;
    title: string;
    code: string;
    status: string;
    priority: string;
    createdBy: string;
    created: string;
  }[];
  search: string;
  setSearch: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
  priority: string;
  setPriority: (v: string) => void;
  handleExport: () => void;
  setModalOpen: (v: boolean) => void;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
  page: number;
  limit: number;
  total: number;
  setPage: (v: number) => void;
  stats: {
    open: number;
    inProgress: number;
    resolved: number;
    closed: number;
    total: number;
  };
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  issues,
  search,
  setSearch,
  status,
  setStatus,
  priority,
  setPriority,
  handleExport,
  setModalOpen,
  handleEdit,
  handleDelete,
  page,
  limit,
  total,
  setPage,
  stats,
}) => {

  const totalPages = Math.ceil(total / limit) || 1;

  const handlePrev = () => setPage(Math.max(1, page - 1));
  const handleNext = () => setPage(Math.min(totalPages, page + 1));
  return (
  <div className="flex-1 overflow-y-auto pt-20">
    <div className="max-w-7xl mx-auto w-full flex flex-col gap-8 px-8 pt-8">
     
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Dashboard Overview</h2>
          <p className="text-sm text-slate-500 mt-1">View, filter, and manage all issues reported in the system. Use the dashboard to monitor project health and take action on open items.</p>
        </div>
        <button
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all shadow-sm shadow-blue-500/30"
          onClick={() => setModalOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Create Issue</span>
        </button>
      </div>
      
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Total Issues",
            value: stats.total,
            color: "purple",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-purple-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
              </svg>
            ),
          },
          {
            title: "Open Issues",
            value: stats.open,
            color: "red",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
            ),
          },
          {
            title: "In Progress",
            value: stats.inProgress,
            color: "blue",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-blue-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            ),
          },
          {
            title: "Resolved",
            value: stats.resolved,
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
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                </svg>
              </div>
              <input
                type="text"
                name="search"
                id="search"
                className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Filter issues..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full md:w-45">
            <label htmlFor="status" className="sr-only">Status</label>
            <select
              id="status"
              name="status"
              className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 appearance-none"
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option>All Statuses</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Closed</option>
            </select>
          </div>
          <div className="w-full md:w-45 hidden sm:block">
            <label htmlFor="priority" className="sr-only">Priority</label>
            <select
              id="priority"
              name="priority"
              className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 appearance-none"
              value={priority}
              onChange={e => setPriority(e.target.value)}
            >
              <option>All Priorities</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2">
          {(search || status !== "All Statuses" || priority !== "All Priorities") && (
            <button
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-all"
              onClick={() => {
                setSearch("");
                setStatus("All Statuses");
                setPriority("All Priorities");
              }}
              title="Reset filters"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Export
          </button>
        </div>
      </div>
     
      <IssuesTable
        issues={issues}
        onDelete={handleDelete}
        onEdit={handleEdit}
        page={page}
        limit={limit}
        total={total}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    
    </div>
  </div>
  );
}

export default DashboardContent;
