// "use client";

// import { useState } from "react";
// import { updateTaskStatus } from "@/app/actions/task";
// import { Task, TaskStatus } from "@prisma/client";

// export function TaskItem({ task }: { task: Task }) {
//   const [status, setStatus] = useState(task.status);
//   const [loading, setLoading] = useState(false);

//   const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const newStatus = e.target.value as TaskStatus;
//     setStatus(newStatus);
//     setLoading(true);
//     await updateTaskStatus(task.id, newStatus);
//     setLoading(false);
//   };

//   return (
//     <div className={`bg-slate-800 rounded-xl p-4 border transition-all ${loading ? 'opacity-50' : 'opacity-100'} ${task.status === 'DONE' ? 'border-emerald-500/30 bg-emerald-900/10' : 'border-slate-700 hover:border-slate-600'}`}>
//       <h4 className={`font-medium mb-3 ${task.status === 'DONE' ? 'text-slate-400 line-through' : 'text-slate-200'}`}>
//         {task.title}
//       </h4>
//       <div className="flex justify-between items-center mt-2">
//         <span className="text-xs text-slate-500">
//           {new Date(task.createdAt).toLocaleDateString()}
//         </span>
//         <select
//           value={status}
//           onChange={handleStatusChange}
//           disabled={loading}
//           className="bg-slate-900 border border-slate-700 text-slate-300 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-1.5 focus:outline-none"
//         >
//           <option value="TODO">Todo</option>
//           <option value="IN_PROGRESS">In Progress</option>
//           <option value="DONE">Done</option>
//         </select>
//       </div>
//     </div>
//   );
// }
