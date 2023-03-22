import { useGetProjectsQuery } from "../../features/projects/projectsApi";
import Error from "../ui/Error";
import Loading from "../ui/Loading";
import Project from "./Project";

export default function Projects() {
  const { data: projects, isLoading, isError, error } = useGetProjectsQuery();

  // let's decide what to render
  let content = null;

  if (isLoading) {
    content = <Loading />
  } else if (!isLoading && isError) {
    content = <Error message={error?.data} />
  } else if (!isLoading && !isError && projects?.length === 0) {
    content = <Error message="There is no projects found!" />
  } else if (!isLoading && !isError && projects?.length > 0) {
    content = projects?.map((project) => <Project key={project.id} project={project} />)
  }

  return (
    <div>
      <h3 className="text-xl font-bold">Projects</h3>
      <div className="mt-3 space-y-4">
        {content}
      </div>
    </div>
  )
}