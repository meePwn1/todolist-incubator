import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import TodoItem from './TodoItem'

const meta: Meta<typeof TodoItem> = {
	title: 'TODOLISTS/Task',
	component: TodoItem,

	tags: ['autodocs'],
	args: {
		changeTaskStatus: action('Status changed inside Task'),
		changeTaskTitle: action('Title changed inside Task'),
		removeTask: action('Remove Button clicked changed inside Task'),
		task: { id: '12wsdewfijdei', title: 'JS', isDone: false },
		todoID: 'fgdosrg8rgjuh',
	},
}

export default meta
type Story = StoryObj<typeof TodoItem>

export const TaskIsNotDoneStory: Story = {}

export const TaskIsDoneStory: Story = {
	args: {
		task: { id: '12wsdewfijdei2343', title: 'CSS', isDone: true },
	},
}
