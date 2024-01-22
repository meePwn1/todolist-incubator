import ClearIcon from '@mui/icons-material/Clear'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { memo, useCallback, useEffect, useMemo } from 'react'
import { FilterValuesType } from '../App'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { fetchTasks } from '../store/actions/tasksAction'
import { TaskStatuses } from '../types/ITask'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import TodoItem from './TodoItem'

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	id: string
	title: string
	tasks: Array<TaskType>
	removeTask: (taskId: string, todolistId: string) => void
	changeFilter: (value: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (
		id: string,
		status: TaskStatuses,
		todolistId: string
	) => void
	removeTodolist: (id: string) => void
	changeTodolistTitle: (id: string, newTitle: string) => void
	filter: FilterValuesType
	changeTaskTitle: (
		taskId: string,
		newTitle: string,
		todolistId: string
	) => void
}

export const Todolist = memo((props: PropsType) => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchTasks(props.id))
	}, [])

	const addTask = useCallback(
		(title: string) => {
			props.addTask(title, props.id)
		},
		[props.addTask, props.id]
	)

	console.log('Todolist called')

	const tasksForTodolist = useMemo(() => {
		switch (props.filter) {
			case 'active':
				return props.tasks.filter(el => !el.isDone)
			case 'completed':
				return props.tasks.filter(el => el.isDone)
			default:
				return props.tasks
		}
	}, [props.tasks, props.filter])

	const removeTodolist = () => {
		props.removeTodolist(props.id)
	}
	const changeTodolistTitle = useCallback(
		(title: string) => props.changeTodolistTitle(props.id, title),
		[props.changeTodolistTitle, props.id]
	)

	const onAllClickHandler = useCallback(
		() => props.changeFilter('all', props.id),
		[props.changeFilter, props.id]
	)
	const onActiveClickHandler = useCallback(
		() => props.changeFilter('active', props.id),
		[props.changeFilter, props.id]
	)
	const onCompletedClickHandler = useCallback(
		() => props.changeFilter('completed', props.id),
		[props.changeFilter, props.id]
	)

	return (
		<div>
			<Stack gap={1} direction={'row'} alignItems={'center'} mb={2}>
				<Typography variant='h3' fontSize={24} fontWeight={700}>
					<EditableSpan value={props.title} onChange={changeTodolistTitle} />
				</Typography>
				<Button
					onClick={removeTodolist}
					variant='contained'
					size='small'
					sx={{ minWidth: '25px', maxHeight: '25px', p: '4px' }}
				>
					<ClearIcon fontSize='small' />
				</Button>
			</Stack>
			<AddItemForm addItem={addTask} />

			<List dense={false}>
				{tasksForTodolist.map(t => {
					return (
						<TodoItem
							key={t.id}
							task={t}
							todoID={props.id}
							removeTask={props.removeTask}
							changeTaskStatus={props.changeTaskStatus}
							changeTaskTitle={props.changeTaskTitle}
						/>
					)
				})}
			</List>
			<div>
				<Button
					onClick={onAllClickHandler}
					variant={props.filter === 'all' ? 'contained' : 'outlined'}
					size='small'
					sx={{ minWidth: '25px', maxHeight: '25px' }}
				>
					All
				</Button>
				<Button
					onClick={onActiveClickHandler}
					variant={props.filter === 'active' ? 'contained' : 'outlined'}
					size='small'
					sx={{ minWidth: '25px', maxHeight: '25px' }}
				>
					Active
				</Button>
				<Button
					onClick={onCompletedClickHandler}
					variant={props.filter === 'completed' ? 'contained' : 'outlined'}
					size='small'
					sx={{ minWidth: '25px', maxHeight: '25px' }}
				>
					Completed
				</Button>
			</div>
		</div>
	)
})
