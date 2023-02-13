import { React } from 'react';
import { Link } from 'react-router-dom';
import "./MyCourse.scss"
const MyCourse = ({ _id, name, source }) => {
    return (
        <div className='myCourseDetail'>
            <h3>{name}</h3>
            <img src={`${process.env.REACT_APP_SERVER_URL}/public/courses/thumbnails/${source[0]}`} />
            <Link to={`/myaccount/courses/${_id}`} className="watchCourseButton"><button className='pinkButton'><i className="bi bi-play-circle-fill"></i><p>VER CURSO</p></button></Link>
        </div>
    );
}

export default MyCourse;
