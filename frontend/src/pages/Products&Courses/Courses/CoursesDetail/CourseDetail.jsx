import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const CourseDetail = () => {
    const { courseId } = useParams()
    const [course, setCourse] = useState();
    const getCourse = async () => {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/courses/${courseId}`)
        setCourse(res.data)
    }
    useEffect(() => {
        getCourse()
    });
    return (
        <div>{course ? <div>
            <p>{course.name}</p>
            <p>{course.description}</p>
            <p>{course.price}</p>
            <img style={{width: "300px"}} src={`${process.env.REACT_APP_SERVER_URL}/public/courses/tumbnails/${course.tumbnail}`} />
            <img style={{width: "300px"}} src={`${process.env.REACT_APP_SERVER_URL}/public/courses/explanatoryVideos/${course.source[0]}`} />
        </div> : null}
        </div>
    );
}

export default CourseDetail;
