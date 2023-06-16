import { CreateActivityDto } from "@/utils/interfaces";

export const createActivity = async(activity: CreateActivityDto) => {
    try {
        const userId = localStorage.getItem("userId");
        console.log(activity);
        const response = await fetch(`https://planpalbackend-production.up.railway.app/activities/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: activity.title,
                description: activity.description,
                start_date: activity.start_date,
                end_date: activity.end_date,
                repeat: activity.repeat,
                repeat_end_date: activity.repeat_end_date
            }),
            credentials: 'include'
        });
        
    }
    catch(error) {
        return false;
    }
}