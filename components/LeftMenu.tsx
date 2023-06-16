
import { Button } from "react-bootstrap";
import styles from "../styles/leftMenu.module.css";


function LeftMenu() {

    return (
        <ul className={styles.menu}>
            <li className={styles.containerSubmenu}>
                <ul className={styles.submenu}>
                    <Button className={styles.linkButton} onClick={() => window.location.href = "/tasks"}> View Task </Button>
                    <Button className={styles.linkButton} onClick={() => window.location.href = "/events"}> View Events </Button>
                    <Button className={styles.linkButton} onClick={() => window.location.href = "/activities"}> View Activities </Button>
                    <Button className={styles.linkButton} onClick={() => window.location.href = "/deadlines"}> View Deadlines </Button>
                </ul>
            </li>
            <li className={styles.containerSubmenu}>
                <ul className={styles.submenu}>
                    <Button className={styles.linkButton} onClick={() => window.location.href = "/dailyview"}> Daily view </Button>
                    <Button className={styles.linkButton} onClick={() => window.location.href = "/weeklyview"}> Weekly view </Button>
                </ul>
            </li>
            <li className={styles.containerSubmenu}>
                <ul className={styles.submenu}>
                    <Button className={styles.linkButton} onClick={() => window.location.href = "/createtask"}> Create Task </Button>
                    <Button className={styles.linkButton} onClick={() => window.location.href = "/createActivity"}> Create Activity </Button>
                    <Button className={styles.linkButton} onClick={() => window.location.href = "/createevent"}> Create Event </Button>
                    <Button className={styles.linkButton} onClick={() => window.location.href = "/createdeadline"}> Create Deadline </Button>
                </ul>
            </li>

          
        </ul>
    );
}

export default LeftMenu;