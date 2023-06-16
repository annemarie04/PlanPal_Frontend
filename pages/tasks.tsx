import { useEffect, useState } from "react"
import TaskView3Columns from "../components/TaskView3Columns"

function GetTaskList() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getTasks = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        const res = await fetch(`https://planpalbackend-production.up.railway.app/tasks/all/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        const data = await res.json();
        // console.log(data);
        setData(data);
      }
    };
    getTasks();
  }, []);

  /*
  return (
    <div>
      <h1>Task</h1>
      Acestea sunt taskurile
      {data.map((task: any) => (
        <div key={task._id}>
          <h3> Titlu: {task.title}</h3>
          <p> Descriere: {task.description}</p>
          <p> Data: {task.date}</p>
        </div>
      ))}
    </div>
  );
  */
  return (
    <div>
      <TaskView3Columns
        taskListData={data}
      />
    </div>
  )
}

export default GetTaskList;
