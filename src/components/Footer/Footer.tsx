import styles from './Footer.module.scss'

const Footer = () => {
	return (
		<div className={styles.FooterSection}>
			<div className={styles.Footer}>
				<div>V1.16.5 &copy; 2024.</div>
				<div>Coded with love for the Web and trolleybuses.</div>
			</div>
		</div>
	)
}

export default Footer
