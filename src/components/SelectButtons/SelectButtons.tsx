import React from 'react'
import { useId } from 'react'
import { House, Landmark, Hospital } from 'lucide-react'
import BaselineButton from '@/components/Baseline/BaselineButton'
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
		Pridniprovsk: <House />,
		Museum: <Landmark />,
		Hospital: <Hospital />,
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
						<BaselineButton
							label={option}
							icon={Icon}
							value={option}
							isSelected={selectedOption === option}
							key={option}
							onClick={() => setSelectedOption(option)}
							aria-pressed={selectedOption === option}
							aria-label={`Select ${option}`}
						/>
					)
				})}
			</div>
		</div>
	)
}

SelectButtons.displayName = 'SelectButtons'

export default React.memo(SelectButtons)
