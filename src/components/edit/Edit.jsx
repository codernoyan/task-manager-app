import { useGetTaskQuery } from "../../features/tasks/tasksApi";
import { useParams } from "react-router-dom";
import Form from "./Form";
import Loading from "../ui/Loading";
import Error from "../ui/Error";

export default function Edit() {
  const { taskId: id } = useParams();
  const { data: task, isLoading, isError, error } = useGetTaskQuery(id);

  // let's decide what to render
  let content = null;

  if (isLoading) {
    content = <Loading />
  } else if (!isLoading && isError) {
    content = <Error message={error?.error} />
  } else if (!isLoading && !isError && Object.keys(task)?.length === 0) {
    content = <Error message="There is no task found!" />
  } else if (!isLoading && !isError && Object.keys(task)?.length > 0) {
    content = <Form task={task} />
  }

  return (
    <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
      <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
        Edit Task for Your Team
      </h1>
      <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
        {content}
      </div>
    </main>
  )
}