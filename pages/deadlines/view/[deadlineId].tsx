import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../../styles/taskView.module.css";
import Link from "next/link";
import { deleteDeadline } from "@/pages/api/deleteDeadline";

interface Deadline {
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

function ViewDeadlinePage() {
    const router = useRouter();
    const { deadlineId } = router.query;
    const [deadline, setDeadline] = useState<Deadline | null>(null);

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
            if (data)
                setDeadline(data);
        }
    };
    useEffect(() => {
        if (typeof deadlineId === "string")
            fetchDeadlineData();
    }, [deadlineId]);
    if (!deadline || typeof deadlineId !== "string") {
        return <div>Loading...</div>;
    }
    const deleteD = () => {
        if (typeof deadlineId === "string")
            deleteDeadline(deadlineId)
        router.push("/deadlines");
    }
    return (
        <div className={styles.wholePage}>
            <div className={styles.taskContainer}>
                <div className={styles.titleDiv}> <h1> {deadline.title} </h1> </div>
                <div className={styles.buttonsContainer}>
                    <button type="button" className={`btn btn-danger ${styles.buttonLeft} ${styles.deleteButton}`} onClick={deleteD}>
                        Delete
                    </button>
                    <Link href={`/deadlines/edit/${deadline._id}`}>
                        <button type="button" className={`btn btn-primary ${styles.buttonRight} ${styles.editButton}`}>
                            Edit
                        </button>
                    </Link>
                </div>
                <div className={styles.descriptionAndDateContainer}>
                    <div className={styles.description}>
                        Description:
                    </div>
                    <div className={styles.dateAndHourContainer}>
                        <div className={styles.dateContainer}>
                            Date: {toDDMMYYYY(deadline.date)}
                        </div>
                        <div className={styles.hourContainer}>
                            Hour: {getFormattedTime(deadline.date)}
                        </div>
                    </div>
                </div>
                <div className={styles.descriptionContainer}>
                    <p> {deadline.description} </p>
                </div>
            </div>
        </div>
    )
}

export default ViewDeadlinePage;