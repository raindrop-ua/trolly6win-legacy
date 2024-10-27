import styles from "./page.module.scss";
import TrolleybusIcon from "@/components/TrolleybusIcon/TrolleybusIcon";
import ScheduleList from "@/components/ScheduleList/ScheduleList";

export default function Home() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <>
                    <div className={styles.header}>
                        <div className={styles.headerImage}>
                            <TrolleybusIcon/>
                        </div>
                        <div className={styles.headerText}>
                            <h1>Trolly<span>Six</span></h1>
                            <h2>Timetable for trolleybus route number <span>6</span> in the city of Dnipro.</h2>
                        </div>
                    </div>
                    <ScheduleList/>
                    <div className={styles.busContainer}>
                        <div className={styles.bus}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="118" height="88" fill="none">
                                <path fill="#ffffff" d="M66.4 3h7.8L57.6 23h-7.8L66.4 3Z"/>
                                <path fill="#ffffff" fillRule="evenodd"
                                      d="M115 30.8c0-2.4-2-4.4-4.3-4.4h-99a6 6 0 0 0-6.1 5.7L3 73.1c0 1 .7 1.9 1.7 1.9h15.7a12.2 12.2 0 0 1 24 0h22a12.2 12.2 0 0 1 24.1 0h14c5.8 0 10.5-4.7 10.5-10.4V30.8Zm-85.6 3.4h-17l-.8 19.1h17.8v-19Zm25.2 0H38.1v19.1h16.5v-19Zm6 0h16.6v19.1H60.7v-19Zm40 0H84.2v19.1h16.6v-19Z"
                                      clipRule="evenodd"/>
                                <path fill="#ffffff" d="M86.3 3h-7.8L62 23h7.8L86.3 3Z"/>
                            </svg>
                        </div>
                        <div className={styles.wheels}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="118" height="88" fill="none">
                                <path fill="#ffffff" fillRule="evenodd"
                                      d="M32.8 85c4.8 0 8.7-3.8 8.7-8.5S37.6 68 32.8 68a8.6 8.6 0 0 0-8.8 8.5c0 4.7 4 8.5 8.8 8.5Zm0-5.1c1.9 0 3.5-1.5 3.5-3.4s-1.6-3.4-3.5-3.4c-2 0-3.5 1.5-3.5 3.4s1.5 3.4 3.5 3.4ZM78.2 85c4.9 0 8.8-3.8 8.8-8.5S83 68 78.2 68a8.6 8.6 0 0 0-8.7 8.5c0 4.7 3.9 8.5 8.7 8.5Zm0-5.1c2 0 3.5-1.5 3.5-3.4s-1.5-3.4-3.5-3.4c-1.9 0-3.5 1.5-3.5 3.4s1.6 3.4 3.5 3.4Z"
                                      clipRule="evenodd"/>
                            </svg>
                        </div>
                    </div>
                </>
            </main>
            <footer className={styles.footer}>

            </footer>
        </div>
    );
}
