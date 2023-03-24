import { useGetTasksQuery } from "../../features/tasks/tasksApi";
import { Link } from "react-router-dom";
import Error from "../ui/Error";
import Loading from "../ui/Loading";
import Task from "./Task";
import { useSelector } from "react-redux";

export default function Tasks() {
  const { data: tasks, isLoading, isError, error } = useGetTasksQuery();
  const { filteredProjects, searchText } = useSelector((state) => state.filters);
  // filter by projects
  const filterTasksByProjectName = (task) => {
    const { project } = task || {};
    const { projectName } = project || {};
    const index = filteredProjects.findIndex((project) => project === projectName);
    switch (index) {
      case -1:
        return false;
      case index >= 1:
        return true;
      default:
        return true;
    }
  };

  // search
  const filterTaskByTaskName = (task) => {
    if (task.taskName.toLowerCase().includes(searchText.toLowerCase())) {
      return true;
    } else if (searchText === '') {
      return true;
    }
    return false;
  }

  // let's decide what to render
  let content = null;

  if (isLoading) {
    content = <Loading />
  } else if (!isLoading && isError) {
    content = <Error message={error?.error} />
  } else if (!isLoading && !isError && tasks?.length === 0) {
    content = <Error message="There is no tasks found!" />
  } else if (!isLoading && !isError && tasks?.length > 0) {
    content = tasks.filter(filterTasksByProjectName).filter(filterTaskByTaskName).map((task) => <Task key={task.id} task={task} />)
  }

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
        {content}
      </div>
    </main>
  )
}