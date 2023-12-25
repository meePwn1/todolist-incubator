import ClearIcon from '@mui/icons-material/Clear'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { ChangeEvent } from 'react'
import { FilterValuesType } from '../App'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'

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
	changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
	removeTodolist: (id: string) => void
	changeTodolistTitle: (id: string, newTitle: string) => void
	filter: FilterValuesType
	changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {
	const addTask = (title: string) => {
		props.addTask(title, props.id)
	}

	const removeTodolist = () => {
		props.removeTodolist(props.id)
	}
	const changeTodolistTitle = (title: string) => {
		props.changeTodolistTitle(props.id, title)
	}

	const onAllClickHandler = () => props.changeFilter('all', props.id)
	const onActiveClickHandler = () => props.changeFilter('active', props.id)
	const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

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
				{props.tasks.map(t => {
					const onClickHandler = () => props.removeTask(t.id, props.id)
					const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
						const newIsDoneValue = e.currentTarget.checked
						props.changeTaskStatus(t.id, newIsDoneValue, props.id)
					}
					const onTitleChangeHandler = (newValue: string) => {
						props.changeTaskTitle(t.id, newValue, props.id)
					}

					return (
						<ListItem key={t.id} className={t.isDone ? 'is-done' : ''} sx={{ p: 0, minHeight: 0, gap: 1 }}>
							<Checkbox onChange={onChangeHandler} checked={t.isDone} sx={{ p: 0 }} />
							<EditableSpan value={t.title} onChange={onTitleChangeHandler} />
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
}
