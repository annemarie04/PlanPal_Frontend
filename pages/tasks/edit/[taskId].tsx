import { useEffect, useState } from "react";
import styles from "../../../styles/createTask.module.css";
import { Button } from "react-bootstrap";
import { fromStringsToDate } from "@/utils/dateConvertion";
import { CreateTaskDTO, Task } from "@/utils/interfaces";
import { useRouter } from "next/router";
import { editTask } from "@/pages/api/editTask";

function EditTaskPage() {
  const router = useRouter();
  const { taskId } = router.query;
  const [task, setTask] = useState<Task | null>(null);

  const fetchTaskData = async () => {
    console.log(taskId);
    if (taskId) {
      const res = await fetch(`https://planpalbackend-production.up.railway.app/tasks/task/${taskId}`, {
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
        // setDate(data.date);
        // setTime(data.time);
        // get the date and time from the date
        const date = new Date(data.date);
        const dateString = date.toISOString().split('T')[0];
        const timeString = date.toISOString().split('T')[1].split('.')[0];
        setDate(dateString);
        setTime(timeString);
        setStatus(data.status);
      }
      // setTask(data);

      console.log(data);
    }
  };
  useEffect(() => {
    if (typeof taskId === "string")
      fetchTaskData();
  }, [taskId]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [status, setStatus] = useState('');


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

  const handleStatusChange = (event: any) => {
    setStatus(event.target.value);
  }


  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const task: CreateTaskDTO = {
      title: title,
      description: description,
      date: fromStringsToDate(date, time),
      status: status
    }
    console.log(task);
    // createTask(task);
    if (typeof taskId === "string")
      editTask(taskId, task);
    router.push('/tasks');  
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

        <div className={styles.formTitle}> Edit task: </div>

        <div className={`row ${styles.formRow} ${styles.titleRow}`}>
          <div className="col">
            <label htmlFor="titleField" className={styles.formLabel}> Title </label>
            <input value={title} type="text" className="form-control" id="titleField" placeholder="Title" onChange={handleTitleChange} />
          </div>
        </div>
        <div className={`row ${styles.formRow}`}>
          <div className="col">
            <label htmlFor="descriptionField" className={styles.formLabel}> Description </label>
            <input type="text" value={description} className="form-control" id="descriptionField" placeholder="Description" onChange={handleDescriptionChange} />
          </div>
        </div>
        <div className={`row ${styles.formRow}`}>
          <div className="col">
            <label htmlFor="dateField"> Date </label>
            <input type="date" className="form-control" id="dateField" placeholder="Date" onChange={handleDateChange} value={date} />
          </div>
          <div className="col">
            <label htmlFor="timeField"> Time </label>
            <input type="time"  className="form-control" id="timeField" placeholder="Time" onChange={handleTimeChange} value={time} />
          </div>
        </div>
        <div className={styles.statusContainer}>
          <label htmlFor="form-check-input" className={styles.formLabel}> Status </label>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="statusInput" id="statusInputToDo" value="to do" checked={(status === "to do" ? true : false)} onChange={handleStatusChange} />
            <label className={`form-check-label ${styles.statusLabel}`} htmlFor="statusInputToDo"> To do </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="statusInput" id="statusInputInProgress" value="in progress" checked={(status === "in progress" ? true : false)} onChange={handleStatusChange} />
            <label className={`form-check-label ${styles.statusLabel}`} htmlFor="statusInputInProgress"> In progress </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="statusInput" id="statusInputDone" value="done" checked={(status === "done" ? true : false)} onChange={handleStatusChange} />
            <label className={`form-check-label ${styles.statusLabel}`} htmlFor="statusInputDone"> Done </label>
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

export default EditTaskPage;