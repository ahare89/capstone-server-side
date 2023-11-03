import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Button } from 'reactstrap';
import { getJobsForProperty } from '../managers/cleaningJobManager';

export default function Calendar({handleDateSubmitButton, propertyId, userProfileId, newCleaningJob, date, setDate, loggedInUser}) {


    const [cleaningJobs, setCleaningJobs] = useState([]);
    const pastDates = (date) => new Date() < date;
    
    useEffect(() => {
        getJobsForProperty(propertyId).then(setCleaningJobs)
    },[])

   
    const jobDates = cleaningJobs?.map(cj => cj.date.slice(0,10));
    console.log(jobDates)
    
    const takenDates = (date) => {
    const dateString = date.toISOString().slice(0,10);
    return pastDates(date) && !jobDates.includes(dateString)
    }    

    return (
        <>
        <div className='border-5'>
        <h4>Available Cleaning Dates:</h4>
            <DatePicker className="border-5" filterDate={takenDates} selected={date} onChange={(date) => setDate(date)} />
        {loggedInUser.roles.includes("Cleaner") ? (
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 mt-4" onClick={() => handleDateSubmitButton(newCleaningJob)}>Submit</button>        
        ) : "" }
        </div>
        </>
    )
}