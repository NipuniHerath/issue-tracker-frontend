import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

interface SidebarNavProps {
  selectedPage: string;
  setSelectedPage: (page: string) => void;
  isAdmin?: boolean;
  user?: { id: string; role: string; name?: string; email?: string } | null;
}

const SidebarNav: React.FC<SidebarNavProps> = ({
  selectedPage,
  setSelectedPage,
  isAdmin,
  user,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between fixed inset-y-0 left-0 z-30">
      <div>
        <div className="p-6 flex items-center gap-2">
          <div className="bg-blue-600 aspect-square rounded-lg size-10 flex items-center justify-center text-white">
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
                d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0 1 12 12.75Zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 0 1-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 0 0 2.248-2.354M12 12.75a2.25 2.25 0 0 1-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 0 0-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 0 1 .4-2.253M12 8.25a2.25 2.25 0 0 0-2.248 2.146M12 8.25a2.25 2.25 0 0 1 2.248 2.146M8.683 5a6.032 6.032 0 0 1-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0 1 15.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 0 0-.575-1.752M4.921 6a24.048 24.048 0 0 0-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 0 1-5.223 1.082"
              />
            </svg>
          </div>
          <div className="flex flex-col ml-3">
            <h1 className="text-slate-900 text-base font-bold leading-none">
              IssueTracker
            </h1>
            <p className="text-slate-500 text-xs font-medium mt-1">
              Admin Panel
            </p>
          </div>
        </div>
        <nav className="mt-8">
          <ul className="space-y-2">
            <li
              className={`px-6 py-2 rounded font-semibold flex items-center gap-3 cursor-pointer ${
                selectedPage === "dashboard"
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-100 text-slate-700"
              }`}
              onClick={() => setSelectedPage("dashboard")}
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
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              Dashboard
            </li>
            {isAdmin && (
              <li
                className={`px-6 py-2 rounded font-semibold flex items-center gap-3 cursor-pointer ${
                  selectedPage === "users"
                    ? "bg-blue-50 text-blue-600"
                    : "hover:bg-gray-100 text-slate-700"
                }`}
                onClick={() => setSelectedPage("users")}
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
                    d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                  />
                </svg>
                Users
              </li>
            )}
          </ul>
        </nav>
      </div>
      <div className="p-6 border-t border-gray-200 flex items-center gap-2">
        <div className="bg-orange-100 rounded-full w-8 h-8 flex items-center justify-center text-orange-600 font-bold border-2 border-white">
          {user?.name ? user.name[0]?.toUpperCase() : isAdmin ? "A" : "U"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold truncate">
            {isAdmin ? "Admin Profile" : "User Profile"}
          </div>
          {isAdmin && user?.email ? (
            <div className="text-xs text-gray-400 truncate">{user.email}</div>
          ) : null}
        </div>
        <button
          className="ml-auto p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          title="Logout"
          onClick={handleLogout}
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
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
            />
          </svg>
        </button>
      </div>
    </aside>
  );
};

export default SidebarNav;
