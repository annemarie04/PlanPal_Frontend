import { useEffect, useState } from "react";
import styles from "../../../styles/createActivity.module.css";
import { Button } from "react-bootstrap";
import { fromStringsToDate } from "@/utils/dateConvertion";
import { Activity, CreateActivityDto } from "@/utils/interfaces";
import { createActivity } from "@/pages/api/createActivity";
import { useRouter } from "next/router";
import { editActivity } from "@/pages/api/editActivity";

function EditActivityPage() {
    const router = useRouter();
    const { activityId } = router.query;
    const [activity, setActivity] = useState <Activity | null> (null); 

    const fetchActivityData = async() => {
        if (activityId) {
            const res = await fetch(`https://planpalbackend-production.up.railway.app/activities/activity/${activityId}`, {
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
                const startDate = new Date(data.start_date);
                const startDateString = startDate.toISOString().split('T')[0];
                const startTimeString = startDate.toISOString().split('T')[1].split('.')[0];
                const endDate = new Date(data.end_date);
                const endTimeString = endDate.toISOString().split('T')[1].split('.')[0];
                const endRepeatDate = new Date(data.repeat_end_date);
                const endRepeatDateString = endRepeatDate.toISOString().split('T')[0];
                
                setActivityDate(startDateString);
                setStartTime(startTimeString);
                setEndTime(endTimeString);
                setRepeat(data.repeat);
                setEndRepeatDate(endRepeatDateString);
            }
            // setTask(data);
    
        }
    };
    useEffect(() => {
      if(typeof activityId === "string")
        fetchActivityData();
    }, [activityId]);
  


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [activityDate, setActivityDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [repeat, setRepeat] = useState<number | null>(null);
  const [endRepeatDate, setEndRepeatDate] = useState('');

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
    console.log("endRepeatDate:", event.target.value);
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const activity: CreateActivityDto = {
      title: title,
      description: description,
      start_date: fromStringsToDate(activityDate, startTime),
      end_date: fromStringsToDate(activityDate, endTime),
      repeat: repeat,
      repeat_end_date: (endRepeatDate? new Date(endRepeatDate) : null)
    }
    if (typeof activityId == "string") {
        editActivity(activityId, activity);
        //router.push('/activity');
    }
    /*
    console.log("Fields:");
    console.log("title: ", title);
    console.log("description: ", description);
    console.log("date: ", date);
    console.log("time: ", time);
    console.log("tags: ", tagList);
    console.log("status: ", status);
    */
  };

  return (
    <div className={styles.wholePage}>

      <form className={styles.taskForm}>

        <div className={styles.formTitle}> Edit Activity: </div>

        <div className={`row ${styles.formRow} ${styles.titleRow}`}>
          <div className="col">
            <label htmlFor="titleField" className={styles.formLabel}> Title </label>
            <input type="text" value = {title} className="form-control" id="titleField" placeholder="Title" onChange={handleTitleChange} />
          </div>
        </div>
        <div className={`row ${styles.formRow}`}>
          <div className="col">
            <label htmlFor="descriptionField" className={styles.formLabel}> Description </label>
            <input type="text" value = {description} className="form-control" id="descriptionField" placeholder="Description" onChange={handleDescriptionChange} />
          </div>
        </div>
        <div className={`row ${styles.formRow}`}>
          <div className="col">
            <label htmlFor="dateField"> Activity date </label>
            <input type="date" value = {activityDate} className="form-control" id="dateField" placeholder="Date" onChange={handleActivityDateChange} />
          </div>
        </div>
        <div className={`row ${styles.formRow}`}>
          <div className="col">
            <label htmlFor="timeFieldStart"> Start Time </label>
            <input type="time" value = {startTime} className="form-control" id="timeFieldStart" placeholder="Start time" onChange={handleStartTimeChange} />
          </div>
          <div className="col">
            <label htmlFor="timeFieldEnd"> End Time </label>
            <input type="time" value = {endTime} className="form-control" id="timeFieldEnd" placeholder="End time" onChange={handleEndTimeChange} />
          </div>
        </div>
        <div className={`row ${styles.formRow}`}>
          <div className = "col">
            <label htmlFor="repeatField"> Repeat every ... days </label>
            <input type="number" value = {repeat != null? repeat : undefined} className="form-control" id="repeatField" placeholder="never" onChange={handleRepeatChange} />
          </div>
        </div>
        {repeat && (
            <div className={`row ${styles.formRow}`}>
              <label htmlFor = "endRepeatField"> End repeat </label>
              <input type = "date" value = {endRepeatDate} className="form-control" id="endRepeatField" placeholder = "never" onChange={handleEndRepeatDateChange} />
            </div>
          )}
        <div className="row">
          <div className="col">
            <Button className={styles.submitButton} onClick={handleSubmit}> Save </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditActivityPage;