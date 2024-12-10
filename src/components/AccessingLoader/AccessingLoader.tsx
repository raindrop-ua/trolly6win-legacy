import styles from './AccessingLoader.module.scss'
import Spinner from '@/components/Spinner'

const AccessingLoader = () => {
	return (
		<div className={styles.AccessingLoader}>
			<Spinner />
		</div>
	)
}

export default AccessingLoader
