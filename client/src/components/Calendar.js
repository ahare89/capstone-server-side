import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function Calendar() {

    const [date, setDate] = useState(new Date());
    const weekend = (date) => new Date() < date;



    return (
        <div>
            <DatePicker filterDate={weekend} selected={date} onChange={(date) => setDate=(date)} />
        </div>
    )
}