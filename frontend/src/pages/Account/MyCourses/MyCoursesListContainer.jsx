import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../../../components/Spinner/Spinner';
import { useLocation, Link } from 'react-router-dom';
import MyCoursesList from './MyCoursesList';
import "./MyCoursesListContainer.scss";

const MyCoursesListContainer = () => {
    const [myCourses, setMyCourses] = useState(false);
    const location = useLocation();

    
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
        <>
            {myCourses ? <div className='container'>
                <div className='myCoursesListContainer'>
                    <h2 className='titleh2'>MIS CURSOS</h2>
                    {(myCourses.length > 0 ? <MyCoursesList myCourses={myCourses} /> :
                        <div className='emptySection'>
                            <h2>NO HAS ADQUIRIDO NINGÚN CURSO AÚN</h2>
                            <Link to="/courses"><button className='pinkButton'>VER CURSOS</button></Link>
                        </div>
                    )}
                </div>
            </div> : <Spinner />}
        </>
    );
}

export default MyCoursesListContainer;
