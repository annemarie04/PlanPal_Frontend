import { CreateActivityDto } from "@/utils/interfaces";

export const editActivity = async(activityId: string, activity: CreateActivityDto) => {
    try {
        const userId = localStorage.getItem("userId");
        console.log("INTAITNEIAKNAOINGAIKONG");
        console.log("activitate::", activity);
        const response = await fetch(`https://planpalbackend-production.up.railway.app/activities/activity/${activityId}`, {
            method: 'PUT',
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
        console.log(error)
        return false;
    }
}