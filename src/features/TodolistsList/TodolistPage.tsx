import { Grid, Paper } from '@mui/material'
import { useActions } from 'common/hooks/useActions'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { todolistsThunks } from 'features/TodolistsList/todolistsSlice'
import { useEffect } from 'react'
import { AddItemForm } from '../../common/components/AddItemForm/AddItemForm'
import { Todolist } from './Todolist/Todolist'
import { tasksThunks } from './tasksSlice'

const TodolistPage = () => {
	const todos = useTypedSelector(state => state.todos)
	const { fetchTodolist, addTodoThunk } = useActions(todolistsThunks)
	const { fetchTasks } = useActions(tasksThunks)

	useEffect(() => {
		fetchTodolist()
			.unwrap()
			.then(res => res.todolists.forEach(el => fetchTasks(el.id)))
	}, [])

	return (
		<div className='todolist'>
			<Grid container style={{ padding: '20px' }}>
				<AddItemForm addItem={addTodoThunk} />
			</Grid>
			<Grid container spacing={3}>
				{todos.map(tl => {
					return (
						<Grid key={tl.id} item>
							<Paper style={{ padding: '25px' }} elevation={12}>
								<Todolist key={tl.id} todo={tl} />
							</Paper>
						</Grid>
					)
				})}
			</Grid>
		</div>
	)
}

export default TodolistPage
