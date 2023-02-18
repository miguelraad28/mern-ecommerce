import { React, useState, useEffect } from 'react';
import axios from "axios";
import CourseCard from './CourseCard';
import "./CoursesListContainer.scss"
import Spinner from '../../../components/Spinner/Spinner';
const CoursesListContainer = () => {
    const [courses, setCourses] = useState([]);
    const [coursesFiltered, setCoursesFiltered] = useState(false);
    const [courseToFilter, setCourseToFilter] = useState({
        name: ""
    });
    const getCourses = async () => {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/courses`)
        setCourses(res.data)
    }
    useEffect(() => {
        getCourses()
        window.scrollTo(0, 0);
    }, []);
    const handleOnSubmit = (e) => {
        e.preventDefault()

        if (courseToFilter.name.length > 0) {
            setCoursesFiltered(courses.filter((course) => course.name.includes(courseToFilter.name)))

        } else {
            setCoursesFiltered(false)
        }

    }

    const handleOnChange = (e) => {
        setCourseToFilter({
            ...courseToFilter,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div className='gridContainer'>
            <div className='coursesListContainer'>
                <div className='courseSearcherContainer'>

                    <h2>Aprendé a hacer lo que siempre soñaste</h2>
                    <div className='searcher'>
                        <form onSubmit={handleOnSubmit}>

                            <input
                                onChange={handleOnChange}
                                value={courseToFilter.name}
                                placeholder="Nombre del curso"
                                name='name'
                                type="text"
                            />
                            <i type="submit" onClick={handleOnSubmit} className="bi bi-search"></i>
                            <button type='submit' className='purpleButton'>BUSCAR</button>
                        </form>
                    </div>
                </div>
                {courses.length > 0 ? (coursesFiltered ? (coursesFiltered.length < 1 ? <h2 style={{ gridColumn: "1 / -1", textAlign: "center" }} className='colSpanAll'>Cursos no encontrados</h2> : coursesFiltered.map(course => <CourseCard key={course._id} course={course} />)) : courses.map(course => <CourseCard key={course._id} course={course} />)) : <Spinner />}
            </div>
        </div>
    );
}

export default CoursesListContainer;
