import { useEffect, useState } from "react"
import DeadlineView1Column from "../components/DeadlineView1Column"

function GetDeadlineList(){
    const [data, setData] = useState([]);
    useEffect(() => {
        const getDeadlines = async () => {
            const userId = localStorage.getItem('userId');
            if (userId) {
                const res = await fetch(`https://planpalbackend-production.up.railway.app/deadlines/all/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });
                const data = await res.json();
                //console.log(data);
                setData(data);
            }
        };
        getDeadlines();
    }, [data]);
    return (
        <div>
            <DeadlineView1Column
                DeadlineList={data}
                />
        </div>
    )
}
export default GetDeadlineList;