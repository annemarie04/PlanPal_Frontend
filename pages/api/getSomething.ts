import { Activity, Deadline, Event, Task } from "@/utils/interfaces";


/// function that will return the list of tasks / activities / events / deadlines the user has.
export const getSomething = async(something: string): Promise <Task[] | Activity[] | Event[] | Deadline[]> => {
    const userId = localStorage.getItem("userId");
    try {
        const res = await fetch(`https://planpalbackend-production.up.railway.app/${something}/all/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (res.ok) {
            const data = await res.json();
            return data;
        }
        else
            console.log("Failed to fetch activities");
    }
    catch(error) {
        console.log("Error occurred while fetching activities", error);
    }
    return [];
}