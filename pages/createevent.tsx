import { useState } from "react";
import styles from "../styles/createTask.module.css";
import { Button } from "react-bootstrap";
import { fromStringsToDate } from "@/utils/dateConvertion";
import { CreateEventDTO } from "@/utils/interfaces";
import { createEvent } from "./api/createEvent";
import { useRouter } from "next/router";

function CreateEventPage() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [start_date, setStartDate] = useState('');
    const [start_time, setStartTime] = useState('');
    const [end_date, setEndDate] = useState('');
    const [end_time, setEndTime] = useState('');

    const router = useRouter();
    const handleTitleChange = (event: any) => {
        setTitle(event.target.value);
    }
    
    const handleDescriptionChange = (event: any) => {
        setDescription(event.target.value);
    }

    const handleStartDateChange = (event: any) => {
        setStartDate(event.target.value);
    }
    // const handleStartTimeChange = (event: any) => {
    //     setStartTime(event.target.value);
    // }
    const handleEndDateChange = (event: any) => {
        setEndDate(event.target.value);
    }
    // const handleEndTimeChange = (event: any) => {
    //     setEndTime(event.target.value);
    // }
    
    const handleSubmit = async(event: any) => {
        event.preventDefault();
        
        const ev: CreateEventDTO = {
            title: title,
            description: description,
            start_date: new Date(start_date),
            end_date: new Date(end_date),
        }
        console.log(ev);
        createEvent(ev);
        router.push("/events");
    };

    return (
        <div className = {styles.wholePage}>
            
            <form className = {styles.taskForm}>

                <div className = {styles.formTitle}> Create event: </div>

                <div className = {`row ${styles.formRow} ${styles.titleRow}`}>
                    <div className = "col">
                        <label htmlFor = "titleField" className = {styles.formLabel}> Title </label>
                        <input type = "text" className = "form-control" id = "titleField" placeholder = "Title" onChange = {handleTitleChange}/> 
                    </div>
                </div>
                <div className = {`row ${styles.formRow}`}>
                    <div className = "col">
                        <label htmlFor = "descriptionField" className = {styles.formLabel}> Description </label>
                        <input type = "text" className = "form-control" id = "descriptionField" placeholder = "Description" onChange = {handleDescriptionChange}/>
                    </div>
                </div>
                <div className = {`row ${styles.formRow}`}>
                    <div className = "col">
                        <label htmlFor = "startDateField" className = {styles.formLabel}> Start date </label>
                        <input type = "date" className = "form-control" id = "startDateField" placeholder = "Start date" onChange = {handleStartDateChange}/>
                        </div>
                    {/* <div className = "col">
                        <label htmlFor = "startTimeField" className = {styles.formLabel}> Start time </label>
                        <input type = "time" className = "form-control" id = "startTimeField" placeholder = "Start time" onChange = {handleStartTimeChange}/>
                        </div> */}
                
                    <div className = "col">
                        <label htmlFor = "endDateField" className = {styles.formLabel}> End date </label>
                        <input type = "date" className = "form-control" id = "EndDateField" placeholder = "End date" onChange = {handleEndDateChange}/>
                        </div>
                    {/* <div className = "col">
                        <label htmlFor = "endTimeField" className = {styles.formLabel}> End time </label>
                        <input type = "time" className = "form-control" id = "EndTimeField" placeholder = "Start time" onChange = {handleEndTimeChange}/>
                        </div> */}
                </div>
                <div className = "row">
                    <div className = "col">
                        <Button className = {styles.submitButton} onClick = {handleSubmit}> Submit </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateEventPage;