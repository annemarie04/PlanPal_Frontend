import { Activity, Deadline, Task, Event } from "@/utils/interfaces";
import { useEffect, useState } from "react";
import { getSomething } from "./api/getSomething";

function MonthlyViewPage() {
    const [taskList, setTaskList] = useState <Task[] | null> (null)
    const [activityList, setActivityList] = useState <Activity[] | null> (null)
    const [deadlineList, setDeadlineList] = useState <Deadline[] | null>(null)
    const [eventList, setEventList] = useState <Event[] | null> (null)
    useEffect(() => {
        const fetchData = async() => {
            setTaskList(await getSomething('tasks') as Task[]);
            setActivityList(await getSomething('activities') as Activity[]);
            setDeadlineList(await getSomething('deadlines') as Deadline[]);
            setEventList(await getSomething('events') as Event[]);
        }
        fetchData();
    }, []);


    return (
        <div>
            Task list:
            {JSON.stringify(taskList)};
            <br/> <br/>
            Activity list:
            {JSON.stringify(activityList)};
            <br/> <br/>
            Deadline list:
            {JSON.stringify(deadlineList)};
            <br/> <br/>
            Event list:
            {JSON.stringify(eventList)};
        </div>
    )
}

export default MonthlyViewPage;