import { React, useState, useEffect } from 'react';
import axios from 'axios';
import MyCourse from './MyCourse';
const MyCourses = () => {
    const [myCourses, setMyCourses] = useState();

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
        <div>
            {myCourses ? myCourses.map(myCourse => <MyCourse key={myCourse._id} {...myCourse}/>): <h1>Cargando</h1>}
        </div>
    );
}

export default MyCourses;
