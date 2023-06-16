export const deleteDeadline = async (deadlineId: string) => {
    try {
        const response = await fetch(`https://planpalbackend-production.up.railway.app/deadlines/deadline/${deadlineId}`, {
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