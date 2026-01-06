
import React from "react";

interface UserWithIssues {
  id: number;
  name: string;
  email: string;
  role: string;
  issues: {
    id: number;
    title: string;
    description: string;
    status: string | null;
    priority: string;
    created_by: number;
    created_at: string;
    updated_at: string;
  }[];
  issueCount: number;
}

interface AllUsersPageProps {
  users: UserWithIssues[];
}

const AllUsersPage: React.FC<AllUsersPageProps> = ({ users }) => {
  const totalUsers = users.length;
  const totalIssues = users.reduce((sum, user) => sum + user.issueCount, 0);

  return (
    <div className="flex-1 overflow-y-auto pt-20">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-8 px-8 pt-8">
        {/* Page Heading */}
        <div className="flex flex-col gap-2 mb-6">
          <h2 className="text-2xl font-bold text-slate-900">All Users & Issue Details</h2>
          <p className="text-sm text-slate-500 mt-1">View all registered users and their reported issues. Use this page to audit user activity, issue counts, and inspect individual user details.</p>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 text-blue-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 19.25a7.5 7.5 0 0 1 15 0v.25a.75.75 0 0 1-.75.75h-13.5a.75.75 0 0 1-.75-.75v-.25Z" />
              </svg>
            </div>
            <div>
              <div className="text-lg font-semibold text-slate-800">Total Users</div>
              <div className="text-2xl font-bold text-blue-600">{totalUsers}</div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 text-purple-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
              </svg>
            </div>
            <div>
              <div className="text-lg font-semibold text-slate-800">Total Issues</div>
              <div className="text-2xl font-bold text-purple-600">{totalIssues}</div>
            </div>
          </div>
        </div>
     
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto p-6">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500">
                <th className="py-4 px-6 font-semibold uppercase tracking-wider">Name</th>
                <th className="py-4 px-6 font-semibold uppercase tracking-wider">Email</th>
                <th className="py-4 px-6 font-semibold uppercase tracking-wider">Role</th>
                <th className="py-4 px-6 font-semibold uppercase tracking-wider">Issues Reported</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="py-4 px-6 text-sm font-semibold text-slate-900 group-hover:text-blue-600 cursor-pointer transition-colors">{user.name}</td>
                  <td className="py-4 px-6 text-sm text-gray-400 font-mono">{user.email}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{user.role}</td>
                  <td className="py-4 px-6 text-sm text-blue-600 font-semibold">{user.issueCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsersPage;
