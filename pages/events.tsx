import { useEffect, useState } from "react"
import EventView1Column from "../components/EventView1Column"

function GetEventList() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getEvents = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        const res = await fetch(`https://planpalbackend-production.up.railway.app/events/all/${userId}`, {
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
    getEvents();
  }, []);
  
  return (
    <div>
      <EventView1Column
        EventList={data}
      />
    </div>
  )
}

export default GetEventList;
