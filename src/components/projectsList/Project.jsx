import { filterProject } from "../../features/filtersSlice/filtersSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function Project({ project }) {
  const { projectName, colorClass } = project || {};
  const [projectChecked, setProjectChecked] = useState(true);
  const dispatch = useDispatch();

  const handleFilterProject = (e) => {
    setProjectChecked(e.target.checked)
    dispatch(filterProject(projectName))
  }

  return (
    <div className="checkbox-container">
      <input onChange={handleFilterProject} checked={projectChecked} type="checkbox" className={colorClass} />
      <p className="label">{projectName}</p>
    </div>
  )
}