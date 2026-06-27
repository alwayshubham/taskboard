// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { redirect } from "next/navigation";
// import { prisma } from "@/lib/prisma";
// import { TaskBoard } from "@/components/TaskBoard";
// import { LogoutButton } from "@/components/LogoutButton";

// export default async function DashboardPage() {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.email) {
//     redirect("/login");
//   }

//   const tasks = await prisma.task.findMany({
//     where: { userId: session.user.id },
//     orderBy: { createdAt: 'desc' }
//   });

//   return (
//     <div className="min-h-screen bg-slate-900 text-slate-200">
//       <header className="bg-slate-800/50 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-10">
//         <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-white tracking-tight">Task Board</h1>
//           <div className="flex items-center gap-4">
//             <span className="text-sm text-slate-400 hidden sm:inline-block">{session.user.email}</span>
//             <LogoutButton />
//           </div>
//         </div>
//       </header>
      
//       <main className="max-w-5xl mx-auto px-4 py-8">
//         <TaskBoard initialTasks={tasks} />
//       </main>
//     </div>
//   );
// }
"use client";
// app/dashboard/page.tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
type Task = { id: string; title: string; status: TaskStatus; createdAt: string; };

const STATUS_LABELS: Record<TaskStatus, string> = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};

const STATUS_COLORS: Record<TaskStatus, string> = {
  TODO: "bg-gray-100 text-gray-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  DONE: "bg-green-100 text-green-700",
};

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  // Load tasks on mount
  useEffect(() => { fetchTasks(); }, []);

  async function fetchTasks() {
    setLoading(true);
    const res = await fetch("/api/tasks");
    if (res.status === 401) { router.push("/"); return; }
    const data = await res.json();
    setTasks(data);
    setLoading(false);
  }

  async function createTask(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setCreating(true);
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle.trim() }),
    });
    if (res.ok) {
      const task = await res.json();
      setTasks((prev) => [task, ...prev]);
      setNewTitle("");
    }
    setCreating(false);
  }

  async function updateStatus(id: string, status: TaskStatus) {
    // Optimistic update – update UI immediately
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, status } : t));
    await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex
                         items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">My Tasks</h1>
        <button onClick={logout}
          className="text-sm text-gray-500 hover:text-red-500 transition-colors">
          Log Out
        </button>
      </header>

      <main className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Create Task Form */}
        <form onSubmit={createTask} className="flex gap-3">
          <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
            placeholder="What needs to be done?" maxLength={200}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button type="submit" disabled={creating || !newTitle.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg
                       text-sm font-medium transition-colors disabled:opacity-50">
            {creating ? "Adding..." : "Add Task"}
          </button>
        </form>

        {/* Task List */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">📋</p>
            <p className="text-lg font-medium text-gray-600">No tasks yet!</p>
            <p className="text-sm mt-1">Add your first task above to get started.</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li key={task.id}
                className="bg-white border border-gray-200 rounded-xl px-5 py-4
                           flex items-center justify-between gap-4">
                <span className="text-gray-800 text-sm flex-1">{task.title}</span>
                <select value={task.status}
                  onChange={(e) => updateStatus(task.id, e.target.value as TaskStatus)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border-0
                             cursor-pointer focus:outline-none ${STATUS_COLORS[task.status]}`}>
                  {(Object.keys(STATUS_LABELS) as TaskStatus[]).map((s) => (
                    <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                  ))}
                </select>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
