export const deleteActivity = async (activityId: string) => {
    try {
        const response = await fetch(`https://planpalbackend-production.up.railway.app/activities/activity/${activityId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
    }
    catch (error) {
        console.error(error);
    }
}