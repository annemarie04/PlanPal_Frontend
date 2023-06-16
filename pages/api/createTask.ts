import { CreateTaskDTO } from "@/utils/interfaces";


export const createTask = async(task: CreateTaskDTO) => {
    try {
        const userId = localStorage.getItem("userId");
        console.log(task);
        const response = await fetch(`https://planpalbackend-production.up.railway.app/tasks/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: task.title,
                description: task.description,
                date: task.date,
                status: task.status,
            }),
            credentials: 'include'
        });
        
    }
    catch(error) {
        return false;
    }
}