import Link from 'next/link';
import styles from "../styles/taskView3Columns.module.css";
import { useEffect, useState } from 'react';

interface TaskView3ColumnsProps {
    taskListData: any[];
}

function TaskView3Columns({ taskListData }: TaskView3ColumnsProps) {
    const [date, setDate] = useState<string>();
    const [withoutDate, setWithoutDate] = useState<boolean>(false);
    const [toDoList, setToDoList] = useState<any[]>([]);
    const [doingList, setDoingList] = useState<any[]>([]);
    const [doneList, setDoneList] = useState<any[]>([]);
    const handleDateChange = (event: any) => {
        setDate(event.target.value);
    }
    const handleCheckbox = (event: any) => {
        // set the previous value false
        setWithoutDate(!withoutDate);

    }
    useEffect(() => {
        console.log("withoutDate: ", withoutDate)
        console.log("date: ", date);
        if (withoutDate === true) {
            console.log("am without date")
            setDate(undefined);
            setToDoList(taskListData.filter(task => task.status === 'to do' && task.date === null));
            setDoingList(taskListData.filter(task => task.status === 'in progress' && task.date === null));
            setDoneList(taskListData.filter(task => task.status === 'done' && task.date === null));
            return;
        }
        if (date === null || date === undefined) {
            console.log("date is empty")
            setToDoList(taskListData.filter(task => task.status === 'to do'))
            setDoingList(taskListData.filter(task => task.status === 'in progress'));
            setDoneList(taskListData.filter(task => task.status === 'done'));
        }
        else {
            console.log("am data")
            setToDoList(taskListData.filter(task => task.status === 'to do' && (new Date(task.date)).toISOString().substring(0, 10) === (new Date(date)).toISOString().substring(0, 10)));
            setDoingList(taskListData.filter(task => task.status === 'in progress' && (new Date(task.date)).toISOString().substring(0, 10) === (new Date(date)).toISOString().substring(0, 10)));
            setDoneList(taskListData.filter(task => task.status === 'done' && (new Date(task.date)).toISOString().substring(0, 10) === (new Date(date)).toISOString().substring(0, 10)));
        }

    }, [date, withoutDate, taskListData]);
    return (
        <div className={styles.wholePage}>
            <div className={styles.titleDiv}>
                <h1> Your tasks </h1>
            </div>
            <div className="row align-items-center">
                <div className="col-auto" style={{width: "30%"}}>
                    <label  htmlFor="dateField">Filter by Date</label>
                    <input type="date" className="form-control mb-2" id="dateField" placeholder="Date" value={date} onChange={handleDateChange} />
                </div>
                <div className="col-auto">
                    <div className="form-check mb-2">
                        <input className="form-check-input" type="checkbox" onChange={handleCheckbox} id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Without Date
                        </label>
                    </div>
                </div>
            </div>
            <div className={styles.columnsContainerDiv}>
                <div className={styles.columnDiv}>
                    <div className={styles.columnTitle}> <h2> TO DO </h2> </div>
                    {toDoList.map((task) => (
                        <div key={task._id} className={styles.taskTitleDiv}>
                            <Link href={`/tasks/view/${task._id}`} className={styles.taskTitleLink}>
                                {task.title}
                            </Link>
                        </div>
                    ))}
                </div>
                <div className={styles.columnDiv}>
                    <div className={styles.columnTitle}> <h2> IN PROGRESS </h2> </div>
                    {doingList.map((task) => (
                        <div key={task._id} className={styles.taskTitleDiv}>
                            <Link href={`/tasks/view/${task._id}`} className={styles.taskTitleLink}>
                                {task.title}
                            </Link>
                        </div>
                    ))}
                </div>
                <div className={styles.columnDiv}>
                    <div className={styles.columnTitle}> <h2> DONE </h2> </div>
                    {doneList.map((task) => (
                        <div key={task._id} className={styles.taskTitleDiv}>
                            <Link href={`/tasks/view/${task._id}`} className={styles.taskTitleLink}>
                                {task.title}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default TaskView3Columns;