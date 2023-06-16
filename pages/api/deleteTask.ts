
export const deleteTask = async(taskId: string) => {
    try {
        const response = await fetch(`https://planpalbackend-production.up.railway.app/tasks/task/${taskId}`, {
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