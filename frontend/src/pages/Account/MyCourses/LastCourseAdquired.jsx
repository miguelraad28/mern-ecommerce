import React from 'react';
import { Link } from 'react-router-dom';
const LastCourseAdquired = ({ lastCourseAdquired }) => {
    const { _id, name, description, source } = lastCourseAdquired
    return (
        <div className='lastCourseAdquiredContainer'>
            <h3>¡TU ÚLTIMO CURSO ADQUIRIDO ESTÁ LISTO PARA TÍ!</h3>
            <div className='lastCourseAdquiredSourceAndButton'>
                <img src={`${process.env.REACT_APP_SERVER_URL}/public/courses/thumbnails/${source[0]}`} />
                <Link to={`/myaccount/courses/${_id}`} className="watchCourseButton"><button className='purpleButton'><i className="bi bi-play-circle-fill"></i><p>VER CURSO</p></button></Link>
            </div>
            <div className='lastCourseAdquiredNameAndDescription'>
                <h3>{name}</h3>
                <p>{description}</p>

            </div>

        </div>
    );
}

export default LastCourseAdquired;
