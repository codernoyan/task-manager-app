import Sidebar from "../components/sidebar/Sidebar";
import Tasks from "../components/tasksList/Tasks";

export default function Home() {
  return (
    <div className="container relative">
      <Sidebar />
      <div className="lg:pl-[16rem] 2xl:pl-[23rem]">
        <Tasks />
      </div>
    </div>
  )
}