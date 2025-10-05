import React, { useEffect, useState } from "react";

type Notification = {
  id: string;
  message: string;
  kind?: "info" | "warning" | "success";
};

type ApiResponse<T> = {
  status?: "ok" | "fail" | "error";
  data: T;
  message?: string;
};

function cardClass(_: Notification["kind"]) {
  return "rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200";
}

export default function Notifications() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Notification[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/notifications", { credentials: "include" });
        const json: ApiResponse<Notification[]> = await res.json();
        if (!cancelled) {
          if (res.ok) {
            setItems(Array.isArray(json.data) ? json.data : []);
          } else {
            setError(json.message || "Failed to load notifications");
          }
        }
      } catch (e: Error) {
        if (!cancelled) setError(e?.message || "Failed to load notifications");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="w-full h-screen flex flex-col gap-5 px-2 py-5">
      <div className="navbar bg-base-100 shadow-sm items-center">
        <a className="btn btn-ghost text-center mt-3 text-xl">Arrow</a>
        <a className="text-4xl font-bold text-center mt-3 items-center">FitnessDuel</a>
      </div>

      {loading && (
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 animate-pulse">
          <h3 className="text-slate-900 text-lg font-semibold">Checking your activity…</h3>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-red-200">
          <h3 className="text-red-700 text-lg font-semibold">{error}</h3>
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h3 className="text-slate-900 text-lg font-semibold">No notifications. Nice work!</h3>
        </div>
      )}

      {!loading &&
        !error &&
        items.map((n) => (
          <div key={n.id} className={cardClass(n.kind)}>
            <h3 className="text-slate-900 text-lg font-semibold">{n.message}</h3>
          </div>
        ))}
    </main>
  );
}
