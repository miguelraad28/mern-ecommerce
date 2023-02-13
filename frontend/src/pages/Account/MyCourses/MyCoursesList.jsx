import { React, useState, useEffect } from 'react';
import LastCourseAdquired from './LastCourseAdquired';
import MyCourse from './MyCourse';
import Glider from 'react-glider';
import 'glider-js/glider.min.css';
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
                <Glider
                    hasArrows
                    slidesToShow={4}
                    slidesToScroll={1}
                    duration={2}
                    responsive={[
                        {
                            breakpoint: 864,
                            settings: {
                                slidesToShow: 3,
                            },
                        },
                    ]}
                >

                    {myCourses.map(myCourse => <MyCourse key={myCourse._id} {...myCourse} />)}
                </Glider>
            </div>
        </>
    );
}

export default MyCoursesList;
