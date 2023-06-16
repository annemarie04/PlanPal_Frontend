import { CreateEventDTO } from "@/utils/interfaces";


export const createEvent = async(event: CreateEventDTO) => {
    try {
        const userId = localStorage.getItem("userId");
        console.log(event);
        const response = await fetch(`https://planpalbackend-production.up.railway.app/events/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: event.title,
                description: event.description,
                start_date: event.start_date,
                end_date: event.end_date,
            }),
            credentials: 'include'
        });
    }
    catch(error) {
        return false;
    }
}