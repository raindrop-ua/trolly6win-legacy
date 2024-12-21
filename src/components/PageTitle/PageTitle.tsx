import styles from './PageTitle.module.scss'
import classNames from 'classnames'
import { ReactNode } from 'react'
import TrolleybusIcon from '../TrolleybusIcon'

interface PageTitleProps {
	children: ReactNode
	className?: string
	isPrimary?: boolean
}

const PageTitle: React.FC<PageTitleProps> = ({
	children,
	className,
	isPrimary,
}) => {
	const Component = isPrimary ? 'h1' : 'h2'
	return (
		<div className={classNames(className, styles.PageTitle)}>
			<Component>{children}</Component>
			<TrolleybusIcon className={styles.TrolleybusIcon} isReverse />
		</div>
	)
}

PageTitle.displayName = 'PageTitle'

export default PageTitle
