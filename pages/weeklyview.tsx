

// comment de
import { useEffect, useState } from "react";
import styles from "../styles/dailyview.module.css";
import styless from "../styles/weeklyview.module.css";
import { getFormattedTime, toDDMMYYYY } from "@/utils/dateConvertion";
import { Activity, Deadline, Task } from "@/utils/interfaces";
import { getActivitiesByDay, getDeadlinesByDay, getTasksByDay } from "@/utils/filters";
import Link from "next/link";

function WeeklyViewPage() {

  const [taskList, setTaskList] = useState<Task[] | null>(null);
  const [activityList, setActivityList] = useState<Activity[] | null>(null);
  const [deadinesList, setDeadinesList] = useState<Deadline[] | null>(null);
  const [finalList, setFinalList] = useState<(Activity | Task)[]>([]);
  const [loading, setLoading] = useState(true);
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
  // const initialDay = toDDMMYYYY(new Date());
  const initialDay = new Date();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchTasks = async () => {
      try {
        const res = await fetch(`https://planpalbackend-production.up.railway.app/tasks/all/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setTaskList(data);
        }
        else
          console.log("Failed to fetch tasks");
      }
      catch (error) {
        console.log("Error occurred while fetching tasks", error);
      }
    };

    const fetchActivities = async () => {
      try {
        const res = await fetch(`https://planpalbackend-production.up.railway.app/activities/all/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          console.log(data)
          setActivityList(data);
        }
        else
          console.log("Failed to fetch activities");
      }
      catch (error) {
        console.log("Error occurred while fetching activities", error);
      }
    };

    const fetchDeadlines = async () => {
      try {
        const res = await fetch(`https://planpalbackend-production.up.railway.app/deadlines/all/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          console.log(data)
          setDeadinesList(data);
        }
        else
          console.log("Failed to fetch activities");
      }
      catch (error) {
        console.log("Error occurred while fetching activities", error);
      }
    };


    const fetchData = async () => {
      try {
        await Promise.all([fetchTasks(), fetchActivities(), fetchDeadlines()]);
        setIsInitialLoadComplete(true);
      }
      catch (error) {
        console.log("Error occurred while fetching data", error);
      }
    };

    fetchData();

  }, []);

  // useEffect(() => {
  //   if (isInitialLoadComplete) {
  //     console.log("TASK LIST:", taskList);
  //     console.log("ACTIVITY LIST:", activityList);
  //     // concatenate taskList with activityList
  //     let finalList: (Task | Activity)[] = [];
  //     if (taskList)
  //       finalList = [...taskList];
  //     if (activityList)
  //       finalList = [...finalList, ...activityList];
  //     // const finalList = [...taskList, ...activityList];
  //     setFinalList(finalList)
  //     // setFinalList(getByDay(initialDay));
  //     setLoading(false);
  //     // console.log("LISTA ACTIVITATI:", finalList);
  //   }
  // }, [taskList, activityList, isInitialLoadComplete]);

  // if (!finalList) {
  //   return <div></div>
  // }
  const date = new Date();

  // Get the day of the week (0-6, 0 is Sunday)
  const dayOfWeek = date.getDay();

  // Calculate the start of this week (Monday)
  const startOfWeek = new Date(date.setDate(date.getDate() - ((dayOfWeek + 6) % 7)));

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className={styles.wholePage}>
      <br />
      <div className={styles.pageContainer}>
        <table className={`table table-responsive ${styless.mainTable}`}>
          <thead>
          <tr className={styless.headerRow}>
              <th scope="col">Type</th>
              {daysOfWeek.map(day => <th scope="col" key={day}>{day}</th>)}
            </tr>
          </thead>
          <tbody>
          <tr className={styless.dateRow}>
              <td />
              {daysOfWeek.map((day, index) => {
                let currentDate = new Date(startOfWeek);
                currentDate.setDate(startOfWeek.getDate() + index);
                // return <td scope="row" key={day}>{currentDate.getDay()}/{currentDate.getMonth()+1}/{currentDate.getFullYear()}</td>
                return <td scope="row" key={day}>{toDDMMYYYY(currentDate)}</td>
              })}
            </tr>
            <tr className={styless.taskRow}>
              <td scope="row">Task</td>
              {daysOfWeek.map((day, index) => {
                let currentDate = new Date(startOfWeek);
                currentDate.setDate(startOfWeek.getDate() + index);
                if (!taskList)
                  return;
                const taskToday = getTasksByDay(taskList, new Date(currentDate));
                return (

                  <td scope="row" key={day}>
                    {
                      taskToday.map((task, index) => {
                        return (
                          <Link href={`/tasks/view/${task._id}`} key={index}>
                            <div key={index}>
                              <div className={styles.taskContainer}>
                                <div className={styles.taskName}>{task.title}</div>
                              </div>
                            </div>
                          </Link>
                        )
                      })}
                  </td>
                )
              })}
            </tr>
            <tr className={styless.activityRow}>
              <td scope="row">Activity</td>
              {daysOfWeek.map((day, index) => {
                let currentDate = new Date(startOfWeek);
                currentDate.setDate(startOfWeek.getDate() + index);
                if (!activityList)
                  return;
                const taskToday = getActivitiesByDay(activityList, new Date(currentDate));
                return (

                  <td scope="row" key={day}>
                    {
                      taskToday.map((task, index) => {
                        return (
                          <Link href={`/activities/view/${task._id}`} key={index}>
                            <div key={index}>
                              <div className={styles.taskContainer}>
                                <div className={styles.taskName}>{task.title}</div>
                              </div>
                            </div>
                          </Link>
                        )
                      })}
                  </td>
                )
              })}
            </tr>
            <tr className={styless.deadlineRow}>
              <td scope="row">Deadline</td>
              {daysOfWeek.map((day, index) => {
                let currentDate = new Date(startOfWeek);
                currentDate.setDate(startOfWeek.getDate() + index);
                if (!deadinesList)
                  return;
                const taskToday = getDeadlinesByDay(deadinesList, new Date(currentDate));
                return (

                  <td scope="row" key={day}>
                    {
                      taskToday.map((task, index) => {
                        return (
                          <Link href={`deadlines/view/${task._id}`} key={index}>
                            <div key={index}>
                              <div className={styles.taskContainer}>
                                <div className={styles.taskName}>{task.title}</div>
                              </div>
                            </div>
                          </Link>
                        )
                      })}
                  </td>
                )
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WeeklyViewPage;