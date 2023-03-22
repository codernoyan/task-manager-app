import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import AddTask from "../pages/AddTask";
import EditTask from "../pages/EditTask";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/add-task',
        element: <AddTask />
      },
      {
        path: '/edit-task/:taskId',
        element: <EditTask />
      }
    ]
  }
])