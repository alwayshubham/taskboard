// "use client";

// import { useState } from "react";
// import { createTask } from "@/app/actions/task";
// // import { TaskItem } from "./TaskItem";
// import { Task } from "@prisma/client";
// import { TaskItem } from "./TaskItem";

// export function TaskBoard({ initialTasks }: { initialTasks: Task[] }) {
//   const [title, setTitle] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleCreate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!title.trim()) return;
//     setLoading(true);
//     await createTask(title);
//     setTitle("");
//     setLoading(false);
//   };

//   const todoTasks = initialTasks.filter(t => t.status === "TODO");
//   const inProgressTasks = initialTasks.filter(t => t.status === "IN_PROGRESS");
//   const doneTasks = initialTasks.filter(t => t.status === "DONE");

//   return (
//     <div className="space-y-8">
//       <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50 shadow-xl backdrop-blur-sm">
//         <h2 className="text-xl font-semibold text-white mb-4">Create New Task</h2>
//         <form onSubmit={handleCreate} className="flex gap-3">
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="What needs to be done?"
//             className="flex-1 bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-500"
//             disabled={loading}
//           />
//           <button
//             type="submit"
//             disabled={loading || !title.trim()}
//             className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? "Adding..." : "Add Task"}
//           </button>
//         </form>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Column title="Todo" tasks={todoTasks} color="bg-slate-600" />
//         <Column title="In Progress" tasks={inProgressTasks} color="bg-amber-600" />
//         <Column title="Done" tasks={doneTasks} color="bg-emerald-600" />
//       </div>
//     </div>
//   );
// }

// function Column({ title, tasks, color }: { title: string; tasks: Task[]; color: string }) {
//   return (
//     <div className="bg-slate-800/30 rounded-2xl p-4 border border-slate-700/50 flex flex-col h-full">
//       <div className="flex items-center gap-2 mb-4 px-2">
//         <div className={`w-3 h-3 rounded-full ${color}`}></div>
//         <h3 className="font-semibold text-slate-200">{title}</h3>
//         <span className="ml-auto bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded-full font-medium">
//           {tasks.length}
//         </span>
//       </div>
//       <div className="space-y-3 flex-1">
//         {tasks.length === 0 ? (
//           <div className="text-center py-8 text-slate-500 text-sm border-2 border-dashed border-slate-700 rounded-xl">
//             No tasks here
//           </div>
//         ) : (
//           tasks.map(task => <TaskItem key={task.id} task={task} />)
//         )}
//       </div>
//     </div>
//   );
// }
