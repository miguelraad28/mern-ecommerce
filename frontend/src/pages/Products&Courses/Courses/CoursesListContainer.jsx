import {React, useState, useEffect} from 'react';
import axios from "axios";
import CourseCard from './CourseCard';
import "./CoursesListContainer.scss"
import Spinner from '../../../components/Spinner/Spinner';
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
            {courses ? courses.map(course => <CourseCard key={course._id} {...course}/>) : <Spinner/>}
        </div>
    );
}

export default CoursesListContainer;
