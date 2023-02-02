import {React, useState, useEffect, useContext} from 'react';
import axios from "axios";
import CourseCard from './CourseCard';
import "./CoursesListContainer.scss"
import Spinner from '../../../components/Spinner/Spinner';
import { AuthContext } from '../../../context/auth/AuthProvider';
const CoursesListContainer = () => {
    const [courses, setCourses] = useState();
    const {userLoggedIn} = useContext(AuthContext);
    const getCourses = async() => {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/courses`)
        setCourses(res.data)
    }
    useEffect(() => {
        getCourses()
        console.log(userLoggedIn)
    }, []);
    return (
        <div className='coursesListContainer'>
            {courses ? courses.map(course => <CourseCard key={course._id} {...course}/>) : <Spinner/>}
        </div>
    );
}

export default CoursesListContainer;
