import { React, useState, useEffect } from 'react';
import axios from "axios";
import CourseCard from './CourseCard';
import "./CoursesListContainer.scss"
import Spinner from '../../../components/Spinner/Spinner';
const CoursesListContainer = () => {
    const [courses, setCourses] = useState();
    const getCourses = async () => {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/courses`)
        setCourses(res.data)
    }
    useEffect(() => {
        getCourses()
    }, []);
    return (
        <div className='gridContainer'>
            <div className='coursesListContainer'>
                <div className='courseSearcherContainer'>

                    <h2>Aprendé a hacer lo que siempre soñaste</h2>
                    <div className='searcher'>

                        <input
                            name='course'
                            type="text"
                        />
                        <i class="bi bi-search"></i>
                        <button className='purpleButton'>BUSCAR</button>
                    </div>
                </div>
                {courses ? courses.map(course => <CourseCard key={course._id} course={course} />) : <Spinner />}
            </div>
        </div>
    );
}

export default CoursesListContainer;
