import { useEffect, useState } from "react";
import styles from "../../../styles/createTask.module.css";
import { Button } from "react-bootstrap";
import { fromStringsToDate } from "@/utils/dateConvertion";
import { CreateDeadlineDTO } from "@/utils/interfaces";
import { useRouter } from "next/router";
import { editDeadline } from "@/pages/api/editDeadline";

function EditDeadlinePage() {
    const router = useRouter();
    const { deadlineId } = router.query;

    const fetchDeadlineData = async () => {

        if (deadlineId) {
            const res = await fetch(`https://planpalbackend-production.up.railway.app/deadlines/deadline/${deadlineId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            const data = await res.json();
            console.log(data)
            if (data) {
                setTitle(data.title);
                setDescription(data.description);
                // get the date and time from the date
                const date = new Date(data.date);
                const dateString = date.toISOString().split('T')[0];
                const timeString = date.toISOString().split('T')[1].split('.')[0];
                setDate(dateString);
                setTime(timeString);
            }
        }
    };
    useEffect(() => {
        if (typeof deadlineId === "string")
            fetchDeadlineData();
    }, [deadlineId]);

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
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const deadline: CreateDeadlineDTO = {
            title: title,
            description: description,
            date: fromStringsToDate(date, time),
        }
        // createDeadline(deadline);
        if (typeof deadlineId === "string")
            editDeadline(deadlineId, deadline);
        router.push('/deadlines');
    };

    return (
        <div className={styles.wholePage}>
            <form className={styles.taskForm}>

                <div className={styles.formTitle}> Edit deadline: </div>

                <div className={`row ${styles.formRow} ${styles.titleRow}`}>
                    <div className="col">
                        <label htmlFor="titleField" className={styles.formLabel}> Title </label>
                        <input type="text" className="form-control" id="titleField" placeholder="Title" onChange={handleTitleChange} value={title} />
                    </div>
                </div>
                <div className={`row ${styles.formRow}`}>
                    <div className="col">
                        <label htmlFor="descriptionField" className={styles.formLabel}> Description </label>
                        <input type="text" className="form-control" id="descriptionField" placeholder="Description" onChange={handleDescriptionChange} value={description} />
                    </div>
                </div>
                <div className={`row ${styles.formRow}`}>
                    <div className="col">
                        <label htmlFor="dateField"> Date </label>
                        <input type="date" className="form-control" id="dateField" placeholder="Date" onChange={handleDateChange} value={date} />
                    </div>
                    <div className="col">
                        <label htmlFor="timeField"> Time </label>
                        <input type="time" className="form-control" id="timeField" placeholder="Time" onChange={handleTimeChange} value={time} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Button className={styles.submitButton} onClick={handleSubmit}> Save </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditDeadlinePage;
