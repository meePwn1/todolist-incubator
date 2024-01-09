import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import ListItem from '@mui/material/ListItem'
import { ChangeEvent, FC, memo, useCallback } from 'react'
import { EditableSpan } from './EditableSpan'
import { TaskType } from './Todolist'

interface TodoItemProps {
	todoID: string
	task: TaskType
	removeTask: (taskID: string, todoID: string) => void
	changeTaskStatus: (taskID: string, isDone: boolean, todoID: string) => void
	changeTaskTitle: (taskID: string, value: string, todoID: string) => void
}

const TodoItem: FC<TodoItemProps> = memo(props => {
	console.log('TodoItem called')

	const onClickHandler = useCallback(
		() => props.removeTask(props.task.id, props.todoID),
		[props.removeTask, props.task.id, props.todoID]
	)
	const onChangeHandler = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const newIsDoneValue = e.currentTarget.checked
			props.changeTaskStatus(props.task.id, newIsDoneValue, props.todoID)
		},
		[props.changeTaskStatus, props.task.id, props.todoID]
	)
	const onTitleChangeHandler = useCallback(
		(newValue: string) => {
			props.changeTaskTitle(props.task.id, newValue, props.todoID)
		},
		[props.changeTaskTitle, props.task.id, props.todoID]
	)
	return (
		<ListItem
			className={props.task.isDone ? 'is-done' : ''}
			sx={{ p: 0, minHeight: 0, gap: 1 }}
		>
			<Checkbox
				onChange={onChangeHandler}
				checked={props.task.isDone}
				sx={{ p: 0 }}
			/>
			<EditableSpan value={props.task.title} onChange={onTitleChangeHandler} />
			<Button
				onClick={onClickHandler}
				variant='contained'
				size='small'
				sx={{ minWidth: '25px', maxHeight: '25px' }}
			>
				x
			</Button>
		</ListItem>
	)
})

export default TodoItem
