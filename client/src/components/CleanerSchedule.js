import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { deleteAJob, getJobsForSingleUser } from "../managers/cleaningJobManager";
import { Button } from "reactstrap";
import "./CleanerSchedule.css"

export const CleanerSchedule = ({ loggedInUser }) => {

    const [cleaningJobs, setCleaningJobs] = useState([]);

    useEffect(() => {
        getJobsForSingleUser(loggedInUser.id).then(setCleaningJobs)
    },[])

    const handleDeleteButton = (id) => {
        deleteAJob(id).then(() => getJobsForSingleUser(loggedInUser.id).then(setCleaningJobs))
    }


    return (
        <>
        <h4>{`${loggedInUser.firstName}'s Schedule`}</h4>
        {cleaningJobs.map(cj => <div className="schedule-item" key={cj.id}><ul>
            <h6>Date: {cj.date.slice(0,10)}</h6>
            <li>{cj.property.address}</li>
            <li>${cj.property.cleaningCost}</li>
            <Button onClick={() => handleDeleteButton(cj.id)} className="btn btn-warning">Cancel Cleaning</Button>
            </ul>
            </div>)}

        </>
    )


}