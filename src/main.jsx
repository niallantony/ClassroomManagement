import React from 'react'
import ReactDOM from 'react-dom/client'
import App, {
  loader as appLoader,
} from './App.jsx'
import {
  Classroom,
  loader as classroomLoader,
} from './Classroom.jsx'
import { ErrorPage } from './ErrorPage.jsx'
import { 
  createBrowserRouter,
  RouterProvider,
 } from 'react-router-dom'
import './index.css'



const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: appLoader,
    children: [
      {
        path:'classroom/:classroomKey',
        element: <Classroom />,
        loader: classroomLoader,
      }
    ]
  },
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
