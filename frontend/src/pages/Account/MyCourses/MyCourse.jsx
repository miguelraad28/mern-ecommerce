import { React } from 'react';
import { Link } from 'react-router-dom';
const MyCourse = ({ _id, name, description, source, tumbnail }) => {
    return (
        <div>
            <p>{name}</p>
            <p>{description}</p>
            <img style={{ width: "300px" }} src={`${process.env.REACT_APP_SERVER_URL}/public/courses/explanatoryVideos/${source[1]}`} />
            <Link to={`/myaccount/courses/${_id}`}><button className='watchCourseButton'><i class="bi bi-play-circle-fill"></i> VER CURSO</button></Link>
        </div>
    );
}

export default MyCourse;
