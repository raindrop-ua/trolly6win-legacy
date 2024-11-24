import React from 'react'
import { useId } from 'react'
import { House, Landmark, Hospital } from 'lucide-react'
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
	setSelectedOption,
}) => {
	const groupId = useId()
	const IconsMap = {
		Pridniprovsk: <House size={24} />,
		Museum: <Landmark size={24} />,
		Hospital: <Hospital size={24} />,
	}

	return (
		<div
			className={styles.ButtonGroupBlock}
			role='group'
			aria-labelledby={`${groupId}-label`}
		>
			<h3 className={styles.GroupCaption} id={`${groupId}-label`}>
				{label}:
			</h3>
			<div className={styles.ButtonsGroup}>
				{options.map((option) => {
					const Icon = IconsMap[option as keyof typeof IconsMap]
					return (
						<button
							key={option}
							className={`${styles.Button} ${selectedOption === option ? styles.Active : ''}`}
							onClick={() => setSelectedOption(option)}
							aria-pressed={selectedOption === option}
							aria-label={`Select ${option}`}
						>
							{Icon ? (
								(Icon as JSX.Element)
							) : (
								<>
									{' '}
									<span className={styles.SpaceHolder} aria-hidden={true}>
										{option}
									</span>
									<span className={styles.Caption}>{option}</span>
								</>
							)}
						</button>
					)
				})}
			</div>
		</div>
	)
}

export default SelectButtons
