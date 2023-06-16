import { CreateTaskDTO } from "@/utils/interfaces";


export const editTask = async(taskId: string, task: CreateTaskDTO) => {
    try {
        const userId = localStorage.getItem("userId");
        console.log(task);
        const response = await fetch(`https://planpalbackend-production.up.railway.app/tasks/task/${taskId}`, {
            method: 'PUT',
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
        console.log(error)
        return false;
    }
}