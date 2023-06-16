import {CreateDeadlineDTO} from '../../utils/interfaces';

export const createDeadline = async(deadline: CreateDeadlineDTO) => {
    try {
        const userId = localStorage.getItem("userId");
        console.log(deadline);
        const response = await fetch(`https://planpalbackend-production.up.railway.app/deadlines/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: deadline.title,
                description: deadline.description,
                date: deadline.date,
            }),
            credentials: 'include'
        });
        
    }
    catch(error) {
        return false;
    }
}