import Link from 'next/link';
import styles from "../styles/view1Column.module.css";

interface EventView1ColumnProps {
  EventList: any[];
}

function EventView1Column({ EventList }: EventView1ColumnProps) {
  const sortedList = EventList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className={styles.wholePage}>
      <div className={styles.titleDiv}>
        <h1> Your events </h1>
      </div>

      <div className={styles.table_container}>
        <div className={styles.table}>
          {sortedList.map((event) => (
            <div key={event._id} className={styles.table_row}>
              <Link href={`/events/view/${event._id}`} className={styles.table_cell}>
                {event.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventView1Column;
