import { useEffect, useState } from "react"
import EventView1Column from "../components/EventView1Column"
import ActivityView1Column from "@/components/ActivityView1Column";

function GetActivitiesList() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getActivities = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        const res = await fetch(`https://planpalbackend-production.up.railway.app/activities/all/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        const data = await res.json();
        console.log(data);
        setData(data);
      }
    };
    getActivities();
  }, []);
  
  return (
    <div>
      <ActivityView1Column
        ActivityList={data}
      />
    </div>
  )
}

export default GetActivitiesList;
