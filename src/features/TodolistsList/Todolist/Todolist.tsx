import ClearIcon from '@mui/icons-material/Clear'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { AddItemForm } from 'common/components/AddItemForm/AddItemForm'
import { EditableSpan } from 'common/components/EditableSpan/EditableSpan'
import { useActions } from 'common/hooks/useActions'
import { useTasks } from 'common/hooks/useTasks'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { IEntityTodo } from 'common/types/ITodo'
import { tasksThunks } from 'features/TodolistsList/tasksSlice'
import { todolistsActions, todolistsThunks } from 'features/TodolistsList/todolistsSlice'
import { FC, memo } from 'react'
import TodoItem from './TodoItem/TodoItem'

type PropsType = {
	todo: IEntityTodo
}

export const Todolist: FC<PropsType> = memo(({ todo }) => {
	const tasks = useTypedSelector(state => state.tasks[todo.id])
	const { updateTitleTodoThunk, removeTodoThunk } = useActions(todolistsThunks)
	const { addTaskThunk } = useActions(tasksThunks)
	const { changeTodolistFilter } = useActions(todolistsActions)

	const filteredTasks = useTasks(tasks, todo.filter)

	const removeTodolist = () => {
		removeTodoThunk(todo.id)
	}
	const changeTodolistTitle = (title: string) => {
		updateTitleTodoThunk({ id: todo.id, title })
	}
	const addTask = (title: string) => {
		addTaskThunk({ todoID: todo.id, title })
	}

	return (
		<div>
			<Stack gap={1} direction={'row'} alignItems={'center'} mb={2}>
				<Typography variant='h3' fontSize={24} fontWeight={700}>
					<EditableSpan value={todo.title} onChange={changeTodolistTitle} disabled={todo.entityStatus === 'loading'} />
				</Typography>
				<Button
					onClick={removeTodolist}
					variant='contained'
					size='small'
					sx={{ minWidth: '25px', maxHeight: '25px', p: '4px' }}
					disabled={todo.entityStatus === 'loading'}
				>
					<ClearIcon fontSize='small' />
				</Button>
			</Stack>
			<AddItemForm addItem={addTask} disabled={todo.entityStatus === 'loading'} />

			<List dense={false}>
				{filteredTasks.map(t => {
					return <TodoItem key={t.id} task={t} todoID={todo.id} />
				})}
			</List>
			<div>
				<Button
					onClick={() => changeTodolistFilter({ id: todo.id, filter: 'all' })}
					variant={todo.filter === 'all' ? 'contained' : 'outlined'}
					size='small'
					sx={{ minWidth: '25px', maxHeight: '25px' }}
				>
					All
				</Button>
				<Button
					onClick={() => changeTodolistFilter({ id: todo.id, filter: 'active' })}
					variant={todo.filter === 'active' ? 'contained' : 'outlined'}
					size='small'
					sx={{ minWidth: '25px', maxHeight: '25px' }}
				>
					Active
				</Button>
				<Button
					onClick={() => changeTodolistFilter({ id: todo.id, filter: 'completed' })}
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
