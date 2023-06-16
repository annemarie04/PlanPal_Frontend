import { Activity, Task, Event, Deadline } from "./interfaces"



// functie ce primeste o data de forma YYYY-MM-DD si returneaza toate taskurile din ziua respectiva
export const getTasksByDay = (taskList: Task[], date: Date): Task[] => {
    const newTaskList = taskList.filter((task) => {
        // show only the tasks that happen today
        if(!task.date)
            return false;
        const taskDate = new Date(task.date);
        if(taskDate.toISOString().substring(0, 10) === date.toISOString().substring(0, 10))
            return true;
        return false;
    })
    return newTaskList;
}


export const getActivitiesByDay = (activityList: Activity[], currentDate: Date): Activity[] => {
    const newActivityList = activityList.filter((activity) => {
        // const activityDateStr = activity.start_date.toISOString().substring(0, 10);

        const activityDate = new Date(activity.start_date);
        // const currentDate = new Date(date);
        // console.log("aciiicicici", activityDate, currentDate, activityDate === currentDate, typeof activityDate, typeof currentDate)
        if(!activity.repeat)
            return activityDate.toISOString().substring(0, 10) === currentDate.toISOString().substring(0, 10);

        if(currentDate < activityDate)
            return false;

        const diffMs = Math.abs(currentDate.getTime() - activityDate.getTime());
        const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

        if(diffDays % activity.repeat != 0)
            return false;
        
        if(!activity.repeat_end_date)
            return true;

        const repeatEndDate = new Date(activity.repeat_end_date);
        return currentDate <= repeatEndDate;
    })
    return newActivityList;
}

export const getEventsByDay = (eventList: Event[], date: string): Event[] => {
    const newEventList = eventList.filter((event) => {
        const eventStartDateStr = event.start_date.toISOString().substring(0, 10);
        const eventEndDateStr = event.end_date.toISOString().substring(0, 10);

        const eventStartDate = new Date(eventStartDateStr);
        const eventEndDate = new Date(eventEndDateStr);
        const currentDate = new Date(date);

        return (eventStartDate <= currentDate && currentDate <= eventEndDate);
    }) 
    return newEventList;
}

export const getDeadlinesByDay = (deadlineList: Deadline[], date: Date): Deadline[] => {
    const newDeadlineList = deadlineList.filter((deadline) => {
        if(!deadline.date)
            return false;
        const deadlineDate = new Date(deadline.date);
        const deadlineDateStr = deadlineDate.toISOString().substring(0, 10);
        const dateStr = date.toISOString().substring(0, 10);
        return deadlineDateStr === dateStr;
    })
    return newDeadlineList;
}