import { useGetProjectsQuery } from "../../features/projects/projectsApi";
import { useEditTaskMutation } from "../../features/tasks/tasksApi";
import { useGetTeamQuery } from "../../features/team/teamApi";
import { useNavigate } from "react-router-dom";
import Error from "../ui/Error";
import { useState } from "react";

export default function Form({ task }) {
  const { data: team } = useGetTeamQuery();
  const { data: projects } = useGetProjectsQuery();
  const [editTask, { isLoading, isError, error, isSuccess }] = useEditTaskMutation();
  const { id, taskName, teamMember, project, deadline } = task || {};
  const navigate = useNavigate();

  // edit form state
  const [input, setInput] = useState({
    id,
    taskName,
    teamMember: JSON.stringify(teamMember),
    project: JSON.stringify(project),
    deadline,
  });

  // console.log(input);

  const handleEditTask = (e) => {
    e.preventDefault();
    editTask({
      id: id,
      data: {
        id: input.id,
        taskName: input.taskName,
        teamMember: JSON.parse(input.teamMember),
        project: JSON.parse(input.project),
        deadline: input.deadline
      }
    });
    navigate('/');
  }

  return (
    <>
      <form onSubmit={handleEditTask} className="space-y-6">
        <div className="fieldContainer">
          <label htmlFor="lws-taskName">Task Name</label>
          <input onChange={(e) => setInput({ ...input, taskName: e.target.value })} type="text" name="taskName" id="lws-taskName" required placeholder="Implement RTK Query" value={input.taskName} />
        </div>
        <div className="fieldContainer">
          <label>Assign To</label>
          <select name="teamMember" id="lws-teamMember" required
            onChange={(e) => setInput({ ...input, teamMember: e.target.value })} value={input.teamMember}>
            <option value hidden defaultValue>Select Member</option>
            {
              team?.map((selectedTeam) => <option key={selectedTeam?.id} value={JSON.stringify(selectedTeam)}>{selectedTeam?.name}
              </option>)
            }
          </select>
        </div>
        <div className="fieldContainer">
          <label htmlFor="lws-projectName">Project Name</label>
          <select id="lws-projectName" name="projectName" required onChange={(e) => setInput({ ...input, project: e.target.value })} value={input.project}>
            <option value hidden defaultValue>Select Project</option>
            {
              projects?.map((project) => <option key={project?.id} value={JSON.stringify(project)}>
                {project?.projectName}
              </option>)
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
        error?.data && <Error message={error?.data} />
      }
    </>
  )
}