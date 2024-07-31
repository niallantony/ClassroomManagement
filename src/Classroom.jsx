import { useLoaderData } from "react-router-dom";
import classes from './classes.json';

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

    return (<h1>{name}</h1>)
}