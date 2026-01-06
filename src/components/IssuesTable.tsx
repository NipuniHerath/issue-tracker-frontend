import React from "react";
import { statusConfig, priorityConfig } from "../utils/badgeConfig";

interface Issue {
  id: string;
  title: string;
  code: string;
  status: string;
  priority: string;
  createdBy: string;
  created: string;
  creatorEmail?: string;
}

interface IssuesTableProps {
  issues: Issue[];
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  page?: number;
  limit?: number;
  total?: number;
  onPrev?: () => void;
  onNext?: () => void;
  hideCreatedBy?: boolean;
  hideEmail?: boolean;
}

const IssuesTable: React.FC<IssuesTableProps> = ({
  issues,
  onDelete,
  onEdit,
  page = 1,
  limit = 10,
  total,
  onPrev,
  onNext,
  hideCreatedBy,
  hideEmail,
}) => {
  const start = total ? limit * (page - 1) + 1 : 0;
  const end = total
    ? Math.min(start + issues.length - 1, total)
    : issues.length;
  const totalPages = total ? Math.ceil(total / limit) : 1;
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
      <table className="min-w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500">
            <th className="py-4 px-6 w-12">
              <input
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                type="checkbox"
              />
            </th>
            <th className="py-4 px-6 font-semibold uppercase tracking-wider">
              Issue
            </th>
            <th className="py-4 px-6 font-semibold uppercase tracking-wider">
              Status
            </th>
            <th className="py-4 px-6 font-semibold uppercase tracking-wider">
              Priority
            </th>
            {!hideCreatedBy && (
              <th className="py-4 px-6 font-semibold uppercase tracking-wider">
                Created By
              </th>
            )}
            {!hideEmail && (
              <th className="py-4 px-6 font-semibold uppercase tracking-wider">
                Email
              </th>
            )}
            <th className="py-4 px-6 font-semibold uppercase tracking-wider">
              Created
            </th>
            <th className="py-4 px-6 font-semibold uppercase tracking-wider text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {issues.map((issue) => (
            <tr
              key={issue.id}
              className="hover:bg-gray-50 transition-colors group"
            >
              <td className="py-4 px-6">
                <input
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  type="checkbox"
                />
              </td>
              <td className="py-4 px-6">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 cursor-pointer transition-colors">
                    {issue.title}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    {issue.code}
                  </span>
                </div>
              </td>
              <td className="py-4 px-6">
                {(() => {
                  const config =
                    statusConfig[issue.status] || statusConfig["Open"];
                  return (
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text} ${config.border}`}
                    >
                      {config.icon}
                      {issue.status}
                    </span>
                  );
                })()}
              </td>
              <td className="py-4 px-6">
                {(() => {
                  const config =
                    priorityConfig[issue.priority] || priorityConfig["Medium"];
                  return (
                    <div className={`flex items-center gap-2 ${config.color}`}>
                      {config.icon}
                      <span className="text-sm font-medium text-slate-700">
                        {issue.priority}
                      </span>
                    </div>
                  );
                })()}
              </td>
              {!hideCreatedBy && (
                <td className="py-4 px-6">
                  <span className="text-sm text-gray-400">{issue.createdBy}</span>
                </td>
              )}
              {!hideEmail && (
                <td className="py-4 px-6">
                  <span className="text-sm text-gray-400">
                    {issue.creatorEmail || "---"}
                  </span>
                </td>
              )}
              <td className="py-4 px-6">
                <span className="text-sm text-gray-600">{issue.created}</span>
              </td>
              <td className="py-4 px-6 text-right">
                <div className="flex items-center gap-2 justify-end">
                  <button
                    className="text-blue-500 hover:text-blue-700 transition-colors p-1 rounded-lg hover:bg-blue-50"
                    title="Edit"
                    onClick={() => onEdit && onEdit(issue.id)}
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
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 transition-colors p-1 rounded-lg hover:bg-red-50"
                    title="Delete"
                    onClick={() => onDelete && onDelete(issue.id)}
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
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-4 text-sm text-gray-500 flex items-center gap-4 justify-between bg-gray-50 rounded-b-xl border-t border-gray-200">
        <span className="font-medium">
          {total
            ? `Showing ${start} to ${end} of ${total} results`
            : `Showing 0 results`}
          <br />
          <span className="text-xs text-gray-400">{`Current page issues: ${issues.length}`}</span>
        </span>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded text-gray-700 disabled:opacity-50 flex items-center justify-center"
            onClick={onPrev}
            disabled={page === 1}
            aria-label="Previous Page"
            title="Previous Page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <span className="text-gray-500">
            Page {page} of {totalPages}
          </span>
          <button
            className="px-3 py-1 rounded text-gray-700 disabled:opacity-50 flex items-center justify-center"
            onClick={onNext}
            disabled={page === totalPages}
            aria-label="Next Page"
            title="Next Page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssuesTable;
