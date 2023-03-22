import { Link } from "react-router-dom";
import Task from "./Task";

export default function Tasks() {
  return (
    <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
      <div className="justify-between mb-10 space-y-2 md:flex md:space-y-0">
        <Link to="/add-task" className="lws-addnew group">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 group-hover:text-indigo-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span className="group-hover:text-indigo-500">Add New</span>
        </Link>
      </div>
      <div className="lws-task-list">
        <Task />
      </div>
    </main>
  )
}