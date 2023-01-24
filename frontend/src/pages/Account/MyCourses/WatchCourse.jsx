import { React, useState, useEffect } from 'react';
import axios from 'axios';
const WatchCourse = ({ courseId, source, tumbnail }) => {
    const [videoURL, setVideoURL] = useState();
    console.log(source)
    const watchCourse = async () => {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/private/courses/${source}`, {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("x-access-token")),
                "course-id": courseId
            },
            responseType: "blob"
        })
        setVideoURL(URL.createObjectURL(res.data))
    }
    useEffect(() => {
        watchCourse()
    }, []);
    console.log(videoURL)
    return (
        <div>
            <video poster={`${process.env.REACT_APP_SERVER_URL}/public/courses/tumbnails/${tumbnail}`} style={{width: "500px", height: "100%"}} controls src={videoURL}/>
        </div>
    );
}

export default WatchCourse;
