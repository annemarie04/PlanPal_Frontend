
export const deleteEvent = async(eventId: string) => {
    try {
        const response = await fetch(`https://planpalbackend-production.up.railway.app/events/event/${eventId}`, {
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