import { useMemo } from "react";
import { useGetAllUsers } from "../../hooks/useGet.hook";
import { useOnlineUsersStore } from "../../store/onlineUsers";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function DashboardPage() {
  const { users: onlineUsers } = useOnlineUsersStore();
  const { data: users = [], isLoading, isError, error } = useGetAllUsers();
  const onlineUsersById = useMemo(
    () => new Map(onlineUsers.map((user) => [user.id, user])),
    [onlineUsers],
  );

  return (
    <main className="min-h-screen px-6 py-10 text-slate-900 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
            WhoIsOnline
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
            Active users
          </h1>
          <p className="text-sm text-slate-500">
            Live status for registered users.
          </p>
        </header>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50 text-left text-sm font-semibold text-slate-600">
              <tr>
                <th className="px-6 py-4">Username</th>
                <th className="px-6 py-4">Is Online</th>
                <th className="px-6 py-4">Last Seen At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {isLoading ? (
                <tr>
                  <td
                    className="px-6 py-8 text-center text-slate-500"
                    colSpan={3}
                  >
                    Loading users...
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td
                    className="px-6 py-8 text-center text-red-500"
                    colSpan={3}
                  >
                    {error.message}
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td
                    className="px-6 py-8 text-center text-slate-500"
                    colSpan={3}
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => {
                  const onlineUser = onlineUsersById.get(user.id);
                  const isOnline = Boolean(onlineUser?.isOnline);
                  const lastSeenAt = isOnline
                    ? "Online now"
                    : dayjs(
                        onlineUser?.lastSeenAt ?? user.lastOnline,
                      ).fromNow();

                  return (
                    <tr key={user.id} className="hover:bg-slate-50/80">
                      <td className="px-6 py-4 font-medium text-slate-950">
                        {user.username}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            isOnline
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-500"
                          }`}
                        >
                          {isOnline ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="px-6 py-4">{lastSeenAt}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
