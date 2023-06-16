import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../../styles/taskView.module.css";
import Link from "next/link";
import { deleteEvent } from "@/pages/api/deleteEvent";

interface Event {
    _id: string;
    title: string;
    description: string;
    start_date: Date;
    end_date: Date;
    //status: string;
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



function ViewEventPage() {
    const router = useRouter();
    const { eventId } = router.query;
    const [event, setEvent] = useState<Event | null>(null);

    const fetchEventData = async () => {
        console.log(eventId);
        if (eventId) {
            const res = await fetch(`https://planpalbackend-production.up.railway.app/events/event/${eventId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            const data = await res.json();
            console.log(data);

            if (data) {
                setEvent(data);
            }
        }
    };

    useEffect(() => {
        // if (typeof eventId === "string")
        fetchEventData();
    }, [eventId]);

    if (!event || typeof eventId !== "string") {
        return <div>Loading...</div>;
    }
    const deleteE = () => {
        if (typeof eventId === "string")
            deleteEvent(eventId)
        router.push("/events");
    }
    return (
        <div>
            <div className={styles.wholePage}>
                <div className={styles.taskContainer}>

                    <div className={styles.titleDiv}> <h1> {event.title} </h1> </div>
                    <div className={styles.buttonsContainer}>
                        <button type="button" className={`btn btn-danger ${styles.buttonLeft} ${styles.deleteButton}`} onClick={deleteE}>
                            Delete
                        </button>
                        <Link href={`/events/edit/${event._id}`}>
                            <button type="button" className={`btn btn-primary ${styles.buttonRight} ${styles.editButton}`}>
                                Edit
                            </button>
                        </Link>
                    </div>

                    <div className={styles.descriptionAndDateContainer}>
                        <div className={styles.dateAndHourContainer}>
                            <div className={styles.dateContainer}>
                                Start Date: {toDDMMYYYY(event.start_date)}
                            </div>
                            <div className={styles.dateContainer}>
                                End Date: {toDDMMYYYY(event.end_date)}
                            </div>
                            
                        </div>
                        <div className={styles.description}>
                                Description:
                            </div>
                    </div>
                    <div className={styles.descriptionContainer}>
                        <p> {event.description} </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewEventPage;