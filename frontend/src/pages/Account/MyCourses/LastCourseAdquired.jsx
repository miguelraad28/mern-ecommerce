import React from 'react';
import { Link } from 'react-router-dom';
const LastCourseAdquired = ({ lastCourseAdquired }) => {
    const { _id, name, description, source } = lastCourseAdquired
    return (
        <div className='lastCourseAdquiredContainer'>
            <div className='lastCourseAdquiredText'>
                <p>¡TU ÚLTIMO CURSO ADQUIRIDO ESTÁ LISTO PARA TÍ!</p>
            </div>
            <div className='lastCourseAdquiredData'>
                <div className='lastCourseAdquiredSourceAndButton'>
                    <img src={`${process.env.REACT_APP_SERVER_URL}/public/courses/thumbnails/${source[0]}`} />
                    <Link to={`/myaccount/courses/${_id}`} className="watchCourseButton"><button className='purpleButton'><i className="bi bi-play-circle-fill"></i><p>VER CURSO</p></button></Link>
                </div>
                <div className='lastCourseAdquiredNameAndDescription'>
                    <p>{name}</p>
                    <p>{description}</p>

                </div>
            </div>
        </div>
    );
}

export default LastCourseAdquired;
