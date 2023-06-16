// comment de
import { useEffect, useState } from "react";
import styles from "../styles/dailyview.module.css";
import { getFormattedTime, toDDMMYYYY } from "@/utils/dateConvertion";
import { Activity, Task } from "@/utils/interfaces";
import { getActivitiesByDay, getTasksByDay } from "@/utils/filters";
import Link from "next/link";

function DailyViewPage() {
  const [taskList, setTaskList] = useState<Task[] | null>(null);
  const [activityList, setActivityList] = useState<Activity[] | null>(null);
  const [finalList, setFinalList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
  // const initialDay = toDDMMYYYY(new Date());
  const initialDay = new Date();

  const getByDay = (day: string) => {
    if (taskList == null || activityList == null) return [];
    const filteredList: (Task | Activity)[] = [];
    for (let task of taskList)
      if (toDDMMYYYY(task.date) === day && task.date != undefined)
        filteredList.push(task);

    for (let activity of activityList)
      if (toDDMMYYYY(activity.start_date) === day && activity.date != undefined)
        filteredList.push(activity);
    return filteredList.sort(
      (activ1: Task | Activity, activ2: Task | Activity) => {
        if (activ1.date !== undefined && activ2.date !== undefined) {
          return activ1.date > activ2.date ? 1 : -1;
        } else {
          return 0;
        }
      }
    );
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchTasks = async () => {
      try {
        const res = await fetch(
          `https://planpalbackend-production.up.railway.app/tasks/all/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (res.ok) {
          const data = await res.json();

          const currentTasks = getTasksByDay(data, initialDay);
          setTaskList(currentTasks);
        } else console.log("Failed to fetch tasks");
      } catch (error) {
        console.log("Error occurred while fetching tasks", error);
      }
    };

    const fetchActivities = async () => {
      try {
        const res = await fetch(
          `https://planpalbackend-production.up.railway.app/activities/all/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          const currentActivities = getActivitiesByDay(data, initialDay);
          setActivityList(currentActivities);
        } else console.log("Failed to fetch activities");
      } catch (error) {
        console.log("Error occurred while fetching activities", error);
      }
    };

    const fetchData = async () => {
      try {
        await Promise.all([fetchTasks(), fetchActivities()]);
        setIsInitialLoadComplete(true);
      } catch (error) {
        console.log("Error occurred while fetching data", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isInitialLoadComplete) {
      console.log("TASK LIST:", taskList);
      console.log("ACTIVITY LIST:", activityList);
      // concatenate taskList with activityList
      let finalList: any[] = [];
      if (taskList) finalList = [...taskList];
      if (activityList) finalList = [...finalList, ...activityList];
      // const finalList = [...taskList, ...activityList];
      setFinalList(finalList);
      // setFinalList(getByDay(initialDay));
      setLoading(false);
      // console.log("LISTA ACTIVITATI:", finalList);
    }
  }, [taskList, activityList, isInitialLoadComplete]);

  if (!finalList) {
    return <div></div>;
  }
  return (
    <div className={styles.wholePage}>
      <br />
      <div className={styles.pageContainer}>
        <div className={styles.titluDaily}>
          {" "}
          <h1> Daily view </h1>{" "}
        </div>
        <div className={styles.daySelectBar}>Bara de selectare a zilei</div>
        <div className={styles.timelineContainer}>
          <div className={styles.leftBarContainer}>
            {finalList.map((activity) => (
              <>
                {activity.status === "done" ? null : (
                  <div key={activity._id} className={styles.timelineItem}>
                    <div className={styles.circle}></div>
                    <div className={styles.line}></div>
                  </div>
                )}
              </>
            ))}
          </div>
          <div className={styles.activitiesContainer}>
            {finalList.map((activity: any) => (
              <>
                {activity.status === "done" ? null : (
                  <Link
                    href={
                      activity.date
                        ? `/tasks/view/${activity._id}`
                        : `/activities/view/${activity._id}`
                    }
                  >
                    <div key={activity._id} className={styles.timelineItem}>
                      <div className={styles.titleAndDescriptionContainer}>
                        {activity.title} - {activity.description}
                      </div>
                      <div className={styles.dateContainer}>
                        {toDDMMYYYY(
                          activity.date ? activity.date : activity.start_date
                        )}
                        ,
                        {
                          // @ts-ignore
                          getFormattedTime(
                            activity.date ? activity.date : activity.start_date
                          )
                        }
                      </div>
                    </div>
                  </Link>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyViewPage;
