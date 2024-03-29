import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import ListItem from '@mui/material/ListItem'
import { EditableSpan } from 'common/components/EditableSpan/EditableSpan'
import { TaskStatuses } from 'common/enums'
import { useActions } from 'common/hooks/useActions'
import { ITask } from 'common/types'
import { tasksThunks } from 'features/TodolistsList/model/tasksSlice'
import { ChangeEvent, FC, memo, useCallback } from 'react'

interface Props {
	todoID: string
	task: ITask
}

export const Task: FC<Props> = memo(({ task, todoID }) => {
	const { updateTaskThunk, removeTaskThunk } = useActions(tasksThunks)

	const sx = { p: 0, minHeight: 0, gap: 1, '&.is-done span': { textDecoration: 'line-through' } }

	const onClickHandler = useCallback(
		() => removeTaskThunk({ todoID, taskID: task.id }),
		[todoID, task, removeTaskThunk]
	)
	const onChangeHandler = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const taskStatus = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
			updateTaskThunk({
				todoID,
				taskID: task.id,
				taskFields: {
					status: taskStatus,
				},
			})
		},
		[todoID, task, updateTaskThunk]
	)
	const onTitleChangeHandler = useCallback(
		(newValue: string) => {
			updateTaskThunk({
				todoID,
				taskID: task.id,
				taskFields: { title: newValue },
			})
		},
		[task, todoID, updateTaskThunk]
	)
	return (
		<ListItem className={task.status === TaskStatuses.Completed ? 'is-done' : ''} sx={sx}>
			<Checkbox onChange={onChangeHandler} checked={task.status === TaskStatuses.Completed} sx={{ p: 0 }} />
			<EditableSpan value={task.title!} onChange={onTitleChangeHandler} />
			<Button onClick={onClickHandler} variant='contained' size='small' sx={{ minWidth: '25px', maxHeight: '25px' }}>
				x
			</Button>
		</ListItem>
	)
})
