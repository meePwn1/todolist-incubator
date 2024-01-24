import ClearIcon from '@mui/icons-material/Clear'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { FC, memo, useEffect } from 'react'
import { useAction } from '../hooks/useAction'
import { useTasks } from '../hooks/useTasks'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { IEntityTodo } from '../types/ITodo'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import TodoItem from './TodoItem'

type PropsType = {
	todo: IEntityTodo
}

export const Todolist: FC<PropsType> = memo(({ todo }) => {
	const tasks = useTypedSelector(state => state.tasks[todo.id])
	const {
		fetchTasks,
		updateTitleTodoThunk,
		removeTodoThunk,
		addTaskThunk,
		changeTodolistFilterAction,
	} = useAction()

	const filteredTasks = useTasks(tasks, todo.filter)

	useEffect(() => {
		fetchTasks(todo.id)
	}, [])

	const removeTodolist = () => {
		removeTodoThunk(todo.id)
	}
	const changeTodolistTitle = (title: string) => {
		updateTitleTodoThunk(todo.id, title)
	}
	const addTask = (title: string) => {
		addTaskThunk(todo.id, title)
	}

	return (
		<div>
			<Stack gap={1} direction={'row'} alignItems={'center'} mb={2}>
				<Typography variant='h3' fontSize={24} fontWeight={700}>
					<EditableSpan value={todo.title} onChange={changeTodolistTitle} />
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
				{filteredTasks.map(t => {
					return <TodoItem key={t.id} task={t} todoID={todo.id} />
				})}
			</List>
			<div>
				<Button
					onClick={() => changeTodolistFilterAction(todo.id, 'all')}
					variant={todo.filter === 'all' ? 'contained' : 'outlined'}
					size='small'
					sx={{ minWidth: '25px', maxHeight: '25px' }}
				>
					All
				</Button>
				<Button
					onClick={() => changeTodolistFilterAction(todo.id, 'active')}
					variant={todo.filter === 'active' ? 'contained' : 'outlined'}
					size='small'
					sx={{ minWidth: '25px', maxHeight: '25px' }}
				>
					Active
				</Button>
				<Button
					onClick={() => changeTodolistFilterAction(todo.id, 'completed')}
					variant={todo.filter === 'completed' ? 'contained' : 'outlined'}
					size='small'
					sx={{ minWidth: '25px', maxHeight: '25px' }}
				>
					Completed
				</Button>
			</div>
		</div>
	)
})
