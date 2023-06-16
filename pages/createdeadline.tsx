import { useState } from "react";
import styles from "../styles/createTask.module.css";
import { Button } from "react-bootstrap";
import { fromStringsToDate } from "@/utils/dateConvertion";
import { CreateDeadlineDTO } from "@/utils/interfaces";
import { createDeadline } from "./api/createDeadline";
import { useRouter } from "next/router";

function CreateDeadlinePage() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleTitleChange = (event: any) => {
        setTitle(event.target.value);
    }
    const handleDescriptionChange = (event: any) => {
        setDescription(event.target.value);
    }
    const handleDateChange = (event: any) => {
        setDate(event.target.value);
    }
    const handleTimeChange = (event: any) => {
        setTime(event.target.value);
    }
    const handleSubmit = async(event: any) => {
        event.preventDefault();
        const deadline: CreateDeadlineDTO = {
            title: title,
            description: description,
            date: fromStringsToDate(date, time),
    }
    createDeadline(deadline);
    router.push('/deadlines');
};

return (
    <div className = {styles.wholePage}>
            <form className = {styles.taskForm}>

                <div className = {styles.formTitle}> Create deadline: </div>

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
                        <label htmlFor = "dateField"> Date </label>
                        <input type = "date" className ="form-control" id = "dateField" placeholder = "Date" onChange = {handleDateChange}/>
                    </div>
                    <div className = "col">
                        <label htmlFor = "timeField"> Time </label>
                        <input type = "time" className ="form-control" id = "timeField" placeholder = "Time" onChange = {handleTimeChange}/>
                    </div>
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

export default CreateDeadlinePage;
