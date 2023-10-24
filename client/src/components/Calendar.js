import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Button } from 'reactstrap';

export default function Calendar({handleDateSubmitButton, propertyId, userProfileId, newCleaningJob, date, setDate}) {

    const weekend = (date) => new Date() < date;



    return (
        <>
        <h4>Available Cleaning Dates:</h4>
            <DatePicker filterDate={weekend} selected={date} onChange={(date) => setDate(date)} />
        <Button onClick={() => handleDateSubmitButton(newCleaningJob, propertyId, userProfileId)} className='btn btn-success'>Submit</Button>        
        </>
    )
}