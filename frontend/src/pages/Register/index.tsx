import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { API_ENDPIINTS, PATH } from "../../constants";
import { useApi } from "../../hooks";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const { isLoading, post } = useApi();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = await post(API_ENDPIINTS.AUTH.REGISTER, form);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success(result.message);
    navigate(PATH.LOGIN);
  }

  return (
    <main className="min-h-screen px-6 py-10 text-slate-900 sm:px-10 lg:px-16">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60"
        >
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
              WhoIsOnline
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
              Register
            </h1>
          </div>

          <div className="mt-8 space-y-5">
            <label className="block space-y-2 text-sm font-medium text-slate-700">
              <span>Username</span>
              <input
                value={form.username}
                onChange={(event) =>
                  setForm({ ...form, username: event.target.value })
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                placeholder="Enter username"
              />
            </label>

            <label className="block space-y-2 text-sm font-medium text-slate-700">
              <span>Password</span>
              <input
                type="password"
                value={form.password}
                onChange={(event) =>
                  setForm({ ...form, password: event.target.value })
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                placeholder="Enter password"
              />
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-sky-600 px-4 py-3 font-semibold text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>

            <p className="text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link className="font-semibold text-sky-600" to={PATH.LOGIN}>
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
