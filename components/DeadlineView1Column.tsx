import Link from 'next/link';
import styles from "../styles/view1Column.module.css";

interface DeadlineView1ColumnProps {
  DeadlineList: any[];
}

function DeadlineView1Column({ DeadlineList }: DeadlineView1ColumnProps) {
  const sortedList = DeadlineList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className={styles.wholePage}>
      <div className={styles.titleDiv}>
        <h1> Your deadlines </h1>
      </div>

      <div className={styles.table_container}>
        <div className={styles.table}>
          {sortedList.map((deadline) => (
            <div key={deadline._id} className={styles.table_row}>
              <Link href={`/deadlines/view/${deadline._id}`} className={styles.table_cell}>
                {deadline.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DeadlineView1Column;
