import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import ListItem from '@mui/material/ListItem'
import { ChangeEvent, FC, memo, useCallback } from 'react'
import { useAction } from '../hooks/useAction'
import { ITask, TaskStatuses } from '../types/ITask'
import { EditableSpan } from './EditableSpan'

interface TodoItemProps {
	todoID: string
	task: ITask
}

const TodoItem: FC<TodoItemProps> = memo(({ task, todoID }) => {
	const { removeTaskThunk, updateTaskThunk } = useAction()

	const onClickHandler = useCallback(
		() => removeTaskThunk(todoID, task.id),
		[todoID, task, removeTaskThunk]
	)
	const onChangeHandler = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const taskStatus = e.currentTarget.checked
				? TaskStatuses.Completed
				: TaskStatuses.New
			updateTaskThunk(todoID, task.id, {
				status: taskStatus,
				completed: e.currentTarget.checked,
			})
		},
		[todoID, task, updateTaskThunk]
	)
	const onTitleChangeHandler = useCallback(
		(newValue: string) => {
			updateTaskThunk(todoID, task.id, { title: newValue })
		},
		[task, todoID, updateTaskThunk]
	)
	return (
		<ListItem
			className={task.completed ? 'is-done' : ''}
			sx={{ p: 0, minHeight: 0, gap: 1 }}
		>
			<Checkbox
				onChange={onChangeHandler}
				checked={task.completed}
				sx={{ p: 0 }}
			/>
			<EditableSpan value={task.title} onChange={onTitleChangeHandler} />
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
