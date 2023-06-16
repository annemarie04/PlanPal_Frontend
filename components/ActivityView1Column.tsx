import Link from 'next/link';
import styles from "../styles/view1Column.module.css";

interface ActivityView1ColumnProps {
  ActivityList: any[];
}

function ActivityView1Column({ ActivityList }: ActivityView1ColumnProps) {
  const sortedList = ActivityList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className={styles.wholePage}>
      <div className={styles.titleDiv}>
        <h1> Your activities </h1>
      </div>

      <div className={styles.table_container}>
        <div className={styles.table}>
          {sortedList.map((activity) => (
            <div key={activity._id} className={styles.table_row}>
              <Link href={`/activities/view/${activity._id}`} className={styles.table_cell}>
                {activity.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ActivityView1Column;
