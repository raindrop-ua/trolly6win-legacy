import styles from './Footer.module.scss'
import { Heart } from 'lucide-react'

const Footer = () => {
	return (
		<div className={styles.FooterSection}>
			<div className={styles.Footer}>
				<div>V2.0.4 &copy; 2024-2025.</div>
				<div>
					Coded with <Heart size={16} className={styles.Heart} /> for the Web
					and trolleybuses.
				</div>
			</div>
		</div>
	)
}

export default Footer
