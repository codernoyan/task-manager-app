import Projects from "../projectsList/Projects";
import Members from "../teamMembers/Members";

export default function Sidebar() {
  return (
    <div className="sidebar">
      {/* Projects List */}
      <Projects />
      {/* Team Members */}
      <Members />
    </div>
  )
}