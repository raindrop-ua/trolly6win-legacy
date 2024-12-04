import React, { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import BaselineButton from '@/components/Baseline/BaselineButton'

import { House, Landmark } from 'lucide-react'

export default {
	title: 'Components/BaselineButton',
	component: BaselineButton,
	argTypes: {
		value: { control: 'text' },
		selectedOption: { control: 'text' },
		onClick: { action: 'clicked' },
		Icon: { control: false },
	},
} as Meta

const Template: StoryFn<any> = (args) => {
	const [selectedOption, setSelectedOption] = useState(args.selectedOption)

	const handleClick = (option: string) => {
		setSelectedOption(option)
		args.onClick(option)
	}

	return (
		<BaselineButton
			{...args}
			selectedOption={selectedOption}
			onClick={handleClick}
		/>
	)
}

export const Default = Template.bind({})
Default.args = {
	value: 'Option 1',
	selectedOption: '',
}

export const WithIcon = Template.bind({})
WithIcon.args = {
	value: 'House',
	Icon: <House />,
	selectedOption: '',
}

export const Selected = Template.bind({})
Selected.args = {
	value: 'Landmark',
	Icon: <Landmark />,
	selectedOption: 'Landmark',
}
