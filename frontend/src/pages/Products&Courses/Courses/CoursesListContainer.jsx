import {React, useState, useEffect} from 'react';
import axios from "axios";
import CourseCard from './CourseCard';
import "./CoursesListContainer.scss"
const CoursesListContainer = () => {
    const [courses, setCourses] = useState();
    const getCourses = async() => {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/courses`)
        setCourses(res.data)
    }
    useEffect(() => {
        getCourses()
    }, []);
    return (
        <div className='coursesListContainer'>
            {courses ? courses.map(course => <CourseCard key={course._id} {...course}/>) : <h1>Cargando...</h1>}
        </div>
    );
}

export default CoursesListContainer;
