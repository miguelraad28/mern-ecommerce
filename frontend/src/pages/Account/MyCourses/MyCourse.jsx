import { React, useState } from 'react';
import WatchCourse from './WatchCourse';
const MyCourse = ({ _id, name, description, source, tumbnail }) => {
    const [watchingCourse, setWatchingCourse] = useState(false);
    const watchCourse = () => {
        setWatchingCourse(!watchingCourse)
    }
    return (
        <>
            {watchingCourse ? <WatchCourse courseId={_id} source={source} tumbnail={tumbnail}/> :
                <div>
                    <p>{name}</p>
                    <p>{description}</p>
                    <img style={{ width: "300px" }} src={`${process.env.REACT_APP_SERVER_URL}/public/courses/explanatoryVideos/${source[1]}`} />
                    <button onClick={() => watchCourse()}>VER CURSO</button>
                </div>}
        </>
    );
}

export default MyCourse;
