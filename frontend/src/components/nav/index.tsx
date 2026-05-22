import { Link, useLocation, useNavigate } from "react-router-dom";
import { token } from "../../lib/helpers.lib";

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();

  const linkClass = (path: string) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      location.pathname === path
        ? "text-blue-600"
        : "text-gray-700 hover:text-gray-900"
    }`;

  return token("get") ? (
    <nav className="bg-blue-100 shadow">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className={linkClass("/")}>
              Home
            </Link>
            <Link to="/dashboard" className={linkClass("/dashboard")}>
              Dashboard
            </Link>
          </div>
          <div>
            <button
              onClick={() => {
                token("clear");
                navigate("/login");
              }}
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  ) : null;
}
