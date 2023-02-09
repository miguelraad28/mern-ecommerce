import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../../../components/Spinner/Spinner';
import { useLocation } from 'react-router-dom';
import MyCoursesList from './MyCoursesList';
import "./MyCoursesListContainer.scss";

const MyCoursesListContainer = () => {
    const [myCourses, setMyCourses] = useState();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    const getMyCourses = async () => {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/myAccount/courses`, {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("x-access-token"))
            }
        })
        setMyCourses(res.data)
    }
    useEffect(() => {
        getMyCourses()
    }, []);
    return (
        <div className='myCoursesListContainer'>
            {myCourses ? <MyCoursesList myCourses={myCourses}/> : <Spinner />}
        </div>
    );
}

export default MyCoursesListContainer;
