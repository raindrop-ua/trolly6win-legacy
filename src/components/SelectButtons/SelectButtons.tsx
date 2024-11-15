import React from 'react'
import styles from './SelectButtons.module.scss'

type SelectButtonsProps = {
	label: string
	options: string[]
	selectedOption: string
	setSelectedOption: (option: string) => void
}

const SelectButtons: React.FC<SelectButtonsProps> = ({
	label,
	options,
	selectedOption,
	setSelectedOption
}) => {
	return (
		<div className={styles.ButtonGroupBlock}>
			<h3 className={styles.GroupCaption}>{label}:</h3>
			<div className={styles.ButtonsGroup}>
				{options.map((option) => (
					<button
						key={option}
						className={`${styles.Button} ${selectedOption === option ? styles.Active : ''}`}
						onClick={() => setSelectedOption(option)}
					>
						<span>{option}</span>
					</button>
				))}
			</div>
		</div>
	)
}

export default SelectButtons
