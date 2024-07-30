import './App.css'
import { Sidebar } from './Sidebar';
import { populateClassrooms } from './testClasses';

function App() {
  const classrooms = populateClassrooms();

  return (
    <div id="page">
      <Sidebar>
        {classrooms.map((classroom) => (
          <p key={classroom.key}>{classroom.name}</p>
        ))}
      </Sidebar>
      <div id='viewport'>
        
      </div>
    </div>
  )
}

export default App
