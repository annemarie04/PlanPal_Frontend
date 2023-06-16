import { useState } from "react";
import styles from "../styles/createTask.module.css";
import { Button } from "react-bootstrap";
import { fromStringsToDate } from "@/utils/dateConvertion";
import { CreateActivityDto, CreateTaskDTO } from "@/utils/interfaces";
import { createTask } from "./api/createTask";
import { createActivity } from "./api/createActivity";

function CreateActivityPage() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [activityDate, setActivityDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [repeat, setRepeat] = useState <number | null> (null);
  const [endRepeatDate, setEndRepeatDate] = useState <string | null> (null);

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  }

  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  }

  const handleActivityDateChange = (event: any) => {
    setActivityDate(event.target.value);
  }
  const handleStartTimeChange = (event: any) => {
    setStartTime(event.target.value);
  }

  const handleEndTimeChange = (event: any) => {
    setEndTime(event.target.value);
  }

  const handleRepeatChange = (event: any) => {
    setRepeat(event.target.value);
  }

  const handleEndRepeatDateChange = (event: any) => {
    setEndRepeatDate(event.target.value);
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const activity: CreateActivityDto = {
      title: title,
      description: description,
      start_date: fromStringsToDate(activityDate, startTime),
      end_date: fromStringsToDate(activityDate, endTime),
      repeat: repeat,
      repeat_end_date: (endRepeatDate != null? new Date(endRepeatDate) : null)
    }
    console.log(activity);
    createActivity(activity);
  };

  return (
    <div className={styles.wholePage}>

      <form className={styles.taskForm}>

        <div className={styles.formTitle}> Create Activity: </div>

        <div className={`row ${styles.formRow} ${styles.titleRow}`}>
          <div className="col">
            <label htmlFor="titleField" className={styles.formLabel}> Title </label>
            <input type="text" className="form-control" id="titleField" placeholder="Title" onChange={handleTitleChange} />
          </div>
        </div>
        <div className={`row ${styles.formRow}`}>
          <div className="col">
            <label htmlFor="descriptionField" className={styles.formLabel}> Description </label>
            <input type="text" className="form-control" id="descriptionField" placeholder="Description" onChange={handleDescriptionChange} />
          </div>
        </div>
        <div className={`row ${styles.formRow}`}>
          <div className="col">
            <label htmlFor="dateField"> Activity date </label>
            <input type="date" className="form-control" id="dateField" placeholder="Date" onChange={handleActivityDateChange} />
          </div>
        </div>
        <div className={`row ${styles.formRow}`}>
          <div className="col">
            <label htmlFor="timeFieldStart"> Start Time </label>
            <input type="time" className="form-control" id="timeFieldStart" placeholder="Start time" onChange={handleStartTimeChange} />
          </div>
          <div className="col">
            <label htmlFor="timeFieldEnd"> End Time </label>
            <input type="time" className="form-control" id="timeFieldEnd" placeholder="End time" onChange={handleEndTimeChange} />
          </div>
        </div>
        <div className={`row ${styles.formRow}`}>
          <div className = "col">
            <label htmlFor="repeatField"> Repeat every ... days </label>
            <input type="number" className="form-control" id="repeatField" placeholder="never" onChange={handleRepeatChange} />
          </div>
        </div>
        {repeat && (
            <div className={`row ${styles.formRow}`}>
              <label htmlFor = "endRepeatField"> End repeat </label>
              <input type = "date" className="form-control" id="endRepeatField" placeholder = "never" onChange={handleEndRepeatDateChange} /> 
            </div>
          )}
        <div className="row">
          <div className="col">
            <Button className={styles.submitButton} onClick={handleSubmit}> Submit </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateActivityPage;