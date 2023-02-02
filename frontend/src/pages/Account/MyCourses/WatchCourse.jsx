import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const WatchCourse = () => {
    const [videoURL, setVideoURL] = useState(false);
    const [courseSource, setCourseSource] = useState(false);
    const { courseId } = useParams()
    const getCourseSource = async () => {
        try {
            const course = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/courses/${courseId}`)
            setCourseSource(course.data.source)
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/private/courses/${course.data.source[2]}`, {
                headers: {
                    "x-access-token": JSON.parse(localStorage.getItem("x-access-token")),
                    "course-id": courseId
                },
                responseType: "blob"
            })
            console.log(res.data)
            setVideoURL(URL.createObjectURL(res.data))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getCourseSource()
    }, []);
    console.log(videoURL)
    return (
        <div>
            <video poster={`${process.env.REACT_APP_SERVER_URL}/public/courses/thumbnails/${courseSource[0]}`} style={{ width: "500px", height: "100%" }} controls src={videoURL} />
        </div>
    );
}

export default WatchCourse;
