import './App.css'
import { Sidebar } from './Sidebar';
import {
  Outlet,
  Link,
  useLoaderData,
} from 'react-router-dom';
import classes from './classes.json';

export function loader() {
  const classrooms = classes.classrooms;
  return {classrooms}
}

function App() {
  const { classrooms } = useLoaderData();
  return (
    <div id="page">
      <Sidebar>
        {classrooms.map((classroom) => (
          <Link key={classroom.key} to={`classroom/${classroom.key}`} className="room-link">{classroom.name}</Link>
        ))}
      </Sidebar>
      <div id='viewport'>
        <Outlet />
      </div>
    </div>
  )
}

export default App
