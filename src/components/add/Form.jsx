import { useGetProjectsQuery } from "../../features/projects/projectsApi";
import { useGetTeamQuery } from "../../features/team/teamApi";
import { useState, useEffect } from "react"
import { useAddTaskMutation } from "../../features/tasks/tasksApi";
import { useNavigate } from "react-router-dom";
import Error from "../ui/Error";

export default function Form() {
  const [input, setInput] = useState({
    taskName: '',
    teamMember: {},
    project: {},
    deadline: '',
  });
  
  const { data: team } = useGetTeamQuery();
  const { data: projects } = useGetProjectsQuery();
  const [addTask, { isLoading, isError, error, isSuccess }] = useAddTaskMutation();
  const navigate = useNavigate();

  const handleAddTask = (e) => {
    e.preventDefault();
    const { taskName, teamMember, project, deadline } = input || {};
    console.log(deadline)
    addTask({
      taskName,
      teamMember: JSON.parse(teamMember),
      project: JSON.parse(project),
      deadline,
    });
    navigate('/');
  };

  return (
    <>
      <form onSubmit={handleAddTask} className="space-y-6">
        <div className="fieldContainer">
          <label htmlFor="lws-taskName">Task Name</label>
          <input onChange={(e) => setInput({ ...input, taskName: e.target.value })} type="text" name="taskName" id="lws-taskName" required placeholder="Implement RTK Query" value={input.taskName} />
        </div>
        <div className="fieldContainer">
          <label>Assign To</label>
          <select name="teamMember" id="lws-teamMember" required
            onChange={(e) => setInput({ ...input, teamMember: e.target.value })} value={input.teamMember}>
            <option value hidden defaultValue>Select Job</option>
            {
              team?.map((t) => <option key={t.id} value={JSON.stringify(t)}>{t.name}</option>)
            }
          </select>
        </div>
        <div className="fieldContainer">
          <label htmlFor="lws-projectName">Project Name</label>
          <select id="lws-projectName" name="projectName" required onChange={(e) => setInput({ ...input, project: e.target.value })} value={input.project}>
            <option value hidden defaultValue>Select Project</option>
            {
              projects?.map((project) => <option key={project.id} value={JSON.stringify(project)}>{project.projectName}</option>)
            }
          </select>
        </div>
        <div className="fieldContainer">
          <label htmlFor="lws-deadline">Deadline</label>
          <input onChange={(e) => setInput({ ...input, deadline: e.target.value })} type="date" name="deadline" id="lws-deadline" required value={input.deadline} />
        </div>
        <div className="text-right">
          <button disabled={isLoading} type="submit" className="lws-submit">Save</button>
        </div>
      </form>
      {
        error?.data && <Error />
      }
    </>
  )
}