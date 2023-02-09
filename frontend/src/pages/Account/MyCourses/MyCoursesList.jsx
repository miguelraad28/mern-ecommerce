import { React, useState, useEffect } from 'react';
import LastCourseAdquired from './LastCourseAdquired';
import MyCourse from './MyCourse';
import "./MyCourse.scss";
const MyCoursesList = ({ myCourses }) => {
    const [lastCourseAdquired, setLastCourseAdquired] = useState(false);
    useEffect(() => {
        setLastCourseAdquired(...myCourses.slice(-1))
    }, [myCourses]);
    return (
        <>
            {lastCourseAdquired ?
                <LastCourseAdquired lastCourseAdquired={lastCourseAdquired} />
                : null}
            <div className='myCoursesList'>
                {myCourses.map(myCourse => <MyCourse key={myCourse._id} {...myCourse} />)}
            </div>
        </>
    );
}

export default MyCoursesList;
