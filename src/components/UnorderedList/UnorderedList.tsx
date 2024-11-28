import React, { FC, ReactNode } from 'react'
import classNames from 'classnames'
import styles from './UnorderedList.module.scss'

type UnorderedListProps = {
	children: ReactNode
	className?: string
}

type ListItemProps = {
	children: ReactNode
	className?: string
}

const UnorderedList: FC<UnorderedListProps> & {
	Item: FC<ListItemProps>
} = ({ children, className }) => {
	return (
		<ul className={classNames(styles.UnorderedList, className)}>{children}</ul>
	)
}

const ListItem: FC<ListItemProps> = ({ children, className }) => {
	return <li className={classNames(styles.ListItem, className)}>{children}</li>
}

UnorderedList.Item = ListItem
UnorderedList.displayName = 'UnorderedList'

export default UnorderedList
