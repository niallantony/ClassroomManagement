import { useLoaderData } from "react-router-dom";
import classes from './classes.json';
import { Student } from './Student';

export function loader({ params }) {
    const classrooms = classes.classrooms;
    for (const classroom of classrooms) {
        if (classroom.key === params.classroomKey) {
            return classroom;
        }
    }
    throw new Error("Classroom not found...")
} 

export const Classroom = () => {

    const {name, students} = useLoaderData();
    console.log(students);

    return (
        <>
            <h1 className="classroom-name">{name}</h1>
            <ul className="student-list">
                {students.map((student) => (
                    <Student key={student.studentID} info={student} />
                ))}
            </ul>
        </>)

}