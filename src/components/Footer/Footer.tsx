import styles from './Footer.module.scss'

const Footer = () => {
	return (
		<footer className={styles.FooterSection}>
			<div className={styles.Footer}>
				<div>V1.12 &copy; 2024.</div>
				<div>Coded with love for the Web and trolleybuses.</div>
			</div>
			<div className={styles.FooterDate}>
				<div>{new Date().toString()}</div>
			</div>
		</footer>
	)
}

export default Footer
