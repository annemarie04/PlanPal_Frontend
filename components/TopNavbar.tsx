
import { logoutUser } from "@/pages/api/logoutUser";
import { useRouter } from "next/router";
import styles from "../styles/topNavbar.module.css";
interface TopNavbarProps {
    handleLoginStatus: (isLoggedIn: boolean) => void;
}

function TopNavbar(props: TopNavbarProps & {isLoggedIn: boolean}) {
    const router = useRouter();
    const handleLogout = async() => {
        await logoutUser();
        props.handleLoginStatus(false);
        router.push("/login");
    }
    
    return (
        <ul className = {styles.topNavbar} style={{ margin: 0 }}>
            <li className = {styles.topNavFloatRight} style={{display: props.isLoggedIn? 'none': 'block'}}><a href = "/signup"> Sign up </a></li>
            <li className = {styles.topNavFloatRight} style={{display: props.isLoggedIn? 'none': 'block'}}><a href = "/login"> Log in </a></li>
            <li className = {styles.topNavFloatRight + ' ' +styles.topNavLogOut} style={{display: props.isLoggedIn? 'block': 'none'}}> <button onClick={handleLogout} className = {styles.topNavbarButton}> Log out </button> </li>
        </ul>
    );
}

export default TopNavbar;