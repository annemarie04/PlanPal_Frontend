import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../../styles/taskView.module.css";
import Link from "next/link";
import { deleteTask } from "@/pages/api/deleteTask";
import { Activity } from "@/utils/interfaces";

interface Task {
  _id: string;
  title: string;
  description: string;
  date: Date;
  status: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const toDDMMYYYY = (givenDate?: Date): string => {
  if (!givenDate)
    return "not set";
  const date = new Date(givenDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
  return formattedDate;
};

const getFormattedTime = (givenDate?: Date): string => {
  if (!givenDate)
    return "not set";
  const date = new Date(givenDate);
  const timezoneOffset = date.getTimezoneOffset() / 60;
  const hour = date.getHours() + timezoneOffset;
  const minutes = date.getMinutes();
  const formattedHour = `${hour < 10 ? '0' : ''}${hour}`;
  const formattedMinutes = `${minutes < 10 ? '0' : ''}${minutes}`;

  const formattedTime = `${formattedHour}:${formattedMinutes}`;
  return formattedTime;
};



function ViewActivityPage() {
  const router = useRouter();
  const { activityId } = router.query;
  const [activity, setActivity] = useState<Activity | null>(null);

  const fetchActivityData = async () => {
    console.log(activityId);
    if (activityId) {
      const res = await fetch(`https://planpalbackend-production.up.railway.app/activities/activity/${activityId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      const data = await res.json();
      if (data)
      setActivity(data);
      console.log(data);
    }
  };

  useEffect(() => {
    if (typeof activityId === "string")
      fetchActivityData();
  }, [activityId]);

  const deleteT = () => {
    if (typeof activityId === "string")
      deleteTask(activityId);
    router.push("/activities");
  }

  if (!activity || typeof activityId !== "string") {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className={styles.wholePage}>
        <div className={styles.taskContainer}>

          <div className={styles.titleDiv}> <h1> {activity.title} </h1> </div>
          <div className={styles.buttonsContainer}>
            <button type="button" className={`btn btn-danger ${styles.buttonLeft} ${styles.deleteButton}`} onClick={deleteT}>
              Delete
            </button>
            <Link href={`/tasks/edit/${activity._id}`}>
              <button type="button" className={`btn btn-primary ${styles.buttonRight} ${styles.editButton}`}>
                Edit
              </button>
            </Link>
          </div>
          {/* <div className = {styles.tagsContainer}>
                    {task.tags.map((tag, index) => (
                        <button type = "button" key = {index} className={`btn btn-info ${styles.tag}`}>
                            {tag}
                        </button>
                    ))}
                </div> */}
          <div className={styles.descriptionAndDateContainer}>
            <div className={styles.description}>
              Description:
            </div>
            <div className={styles.dateAndHourContainer}>
              Starting from:
              <div className={styles.dateContainer}>
                Date: {toDDMMYYYY(activity.start_date)}
              </div>
              <div className={styles.hourContainer}>
                Hour: {getFormattedTime(activity.start_date)}
              </div>
              To 
              <div className={styles.dateContainer}>
                Hour: {getFormattedTime(activity.end_date)}
              </div>
              {activity.repeat && (
                <div> every {activity.repeat} days </div>
              )}
            </div>
          </div>
          <div className={styles.descriptionContainer}>
            <p> {activity.description} </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewActivityPage;