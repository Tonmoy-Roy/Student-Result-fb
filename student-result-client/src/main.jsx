import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root from './components/Root/Root.jsx';
import Error from './components/Error/Error.jsx';
import Home from './components/Home/Home.jsx';
import StudentDetails from './components/StudentDetails/StudentDetails.jsx';
import UpdateStudent from './components/UpdateStudent/UpdateStudent.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/details",
        element: <StudentDetails></StudentDetails>,
        loader: () => fetch('http://localhost:5000/students')
      },
      {
        path: "update/:id",
        element: <UpdateStudent></UpdateStudent>,
        loader: ({ params }) => fetch(`http://localhost:5000/students/${params.id}`)
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
