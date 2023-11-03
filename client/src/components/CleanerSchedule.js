import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteAJob, getJobsForSingleUser } from "../managers/cleaningJobManager";

export const CleanerSchedule = ({ loggedInUser }) => {
    const [cleaningJobs, setCleaningJobs] = useState([]);

    useEffect(() => {
        getJobsForSingleUser(loggedInUser.id).then(setCleaningJobs);
    }, []);

    const handleDeleteButton = (id) => {
        deleteAJob(id).then(() => getJobsForSingleUser(loggedInUser.id).then(setCleaningJobs));
    }

    return (
        <>
            <h4 className="text-lg font-bold mb-4">{`${loggedInUser.firstName}'s Schedule`}</h4>
            <div className="flex flex-wrap">
            {cleaningJobs.map(cj => (
                <div className="bg-gray basis-1 p-4 mb-4 rounded shadow-lg w-1/6 mx-2" key={cj.id}>
                    <h6 className="text-md font-semibold mb-2">Date: {cj.date.slice(0, 10)}</h6>
                    <ul className="list-disc list-inside space-y-2">
                        <li>{cj.property.address}</li>
                        <li className="text-green-500">${cj.property.cleaningCost}</li>
                    </ul>
                    <button 
                        onClick={() => handleDeleteButton(cj.id)}
                        className="mt-2 bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition duration-300"
                    >
                        Cancel Cleaning
                    </button>
                </div>
                ))}
                </div>
        </>
    );
}
