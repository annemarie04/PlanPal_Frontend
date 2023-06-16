import { useEffect, useState } from "react";
import styles from "../../../styles/createTask.module.css";
import { Button } from "react-bootstrap";
import { fromStringsToDate } from "@/utils/dateConvertion";
import { CreateEventDTO } from "@/utils/interfaces";
import { useRouter } from "next/router";
import { editEvent } from "@/pages/api/editEvent";


function EditEventPage() {
    const router = useRouter();
    const { eventId } = router.query;
    const [ev, setEvent] = useState<Event | null>(null);

    const fetchEventData = async () => {
        console.log(eventId);
        if (eventId) {
            const res = await fetch(`https://planpalbackend-production.up.railway.app/events/event/${eventId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            const data = await res.json();
            if (data) {
                setTitle(data.title);
                setDescription(data.description);
                // get the date and time from the date
                const startDate = new Date(data.start_date);
                const endDate = new Date(data.end_date);
                const startDateString = startDate.toISOString().split('T')[0];
                const endDateString = endDate.toISOString().split('T')[0];
                setStartDate(startDateString);
                setEndDate(endDateString);
              }
            console.log(data);

        }
    };
    useEffect(() => {
        if (typeof eventId === "string")
          fetchEventData();
      }, [eventId]);
    
      const [title, setTitle] = useState('');
      const [description, setDescription] = useState('');
      const [start_date, setStartDate] = useState('');
      const [end_date, setEndDate] = useState('');
      
    const handleTitleChange = (event: any) => {
        setTitle(event.target.value);
    }
    
    const handleDescriptionChange = (event: any) => {
        setDescription(event.target.value);
    }

    const handleStartDateChange = (event: any) => {
        setStartDate(event.target.value);
    }

    const handleEndDateChange = (event: any) => {
        setEndDate(event.target.value);
    }

    const handleSubmit = async(event: any) => {
        event.preventDefault();
        
        const ev: CreateEventDTO = {
            title: title,
            description: description,
            start_date: new Date(start_date),
            end_date: new Date(end_date),
        }
        console.log(ev);
        if (typeof eventId == "string") {
            editEvent(eventId, ev);
        router.push("/events");
        };
    };
    return (
        <div className = {styles.wholePage}>
            
            <form className = {styles.taskForm}>

                <div className = {styles.formTitle}> Edit event: </div>

                <div className = {`row ${styles.formRow} ${styles.titleRow}`}>
                    <div className = "col">
                        <label htmlFor = "titleField" className = {styles.formLabel}> Title </label>
                        <input type = "text" className = "form-control" id = "titleField" placeholder = "Title" value={title} onChange = {handleTitleChange}/> 
                    </div>
                </div>
                <div className = {`row ${styles.formRow}`}>
                    <div className = "col">
                        <label htmlFor = "descriptionField" className = {styles.formLabel}> Description </label>
                        <input type = "text" className = "form-control" id = "descriptionField" placeholder = "Description" value={description} onChange = {handleDescriptionChange}/>
                    </div>
                </div>
                <div className = {`row ${styles.formRow}`}>
                    <div className = "col">
                        <label htmlFor = "startDateField" className = {styles.formLabel}> Start date </label>
                        <input type = "date" className = "form-control" id = "startDateField" placeholder = "Start date" value={start_date} onChange = {handleStartDateChange}/>
                        </div>
                
                    <div className = "col">
                        <label htmlFor = "endDateField" className = {styles.formLabel}> End date </label>
                        <input type = "date" className = "form-control" id = "endDateField" placeholder = "End date" value={end_date} onChange = {handleEndDateChange}/>
                        </div>

                </div>
                <div className = "row">
                    <div className = "col">
                        <Button className = {styles.submitButton} onClick = {handleSubmit}> Save </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default EditEventPage;