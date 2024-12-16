import React from 'react'
import { useId } from 'react'
import BaselineButton from '../BaselineButton'
import styles from './SelectButtons.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import classNames from 'classnames'

type SelectButtonsProps = {
	className?: string
	label: string
	options: string[]
	labels: string[]
	selectedOption: string
	setSelectedOption: (option: string) => void
}

const SelectButtons: React.FC<SelectButtonsProps> = ({
	className,
	label,
	options,
	labels,
	selectedOption,
	setSelectedOption,
}) => {
	const groupId = useId()

	return (
		<div
			className={classNames(styles.ButtonGroupBlock, className)}
			role='group'
			aria-labelledby={`${groupId}-label`}
		>
			<h3 className={styles.GroupCaption} id={`${groupId}-label`}>
				{label}:
			</h3>
			<div className={styles.ButtonsGroup}>
				<Swiper
					slideToClickedSlide={true}
					followFinger={true}
					spaceBetween={8}
					slidesPerView='auto'
					freeMode={true}
					centeredSlides={false}
				>
					{options.map((option, index) => {
						return (
							<SwiperSlide key={option} style={{ width: 'auto' }}>
								<BaselineButton
									label={labels[index]}
									value={option}
									isSelected={selectedOption === option}
									onClick={() => setSelectedOption(option)}
									aria-pressed={selectedOption === option}
									aria-label={`Select ${option}`}
								/>
							</SwiperSlide>
						)
					})}
				</Swiper>
			</div>
		</div>
	)
}

SelectButtons.displayName = 'SelectButtons'

export default React.memo(SelectButtons)
