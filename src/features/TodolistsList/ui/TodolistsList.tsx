import { Grid, Paper } from '@mui/material'
import { AddItemForm } from 'common/components'
import { useActions } from 'common/hooks/useActions'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { todolistsThunks } from 'features/TodolistsList/model/todolistsSlice'
import { useEffect } from 'react'
import { tasksThunks } from '../model/tasksSlice'
import { Todolist } from './Todolist/Todolist'

export const TodolistsList = () => {
	const todos = useTypedSelector(state => state.todos)
	const { fetchTodolist, addTodoThunk } = useActions(todolistsThunks)
	const { fetchTasks } = useActions(tasksThunks)

	useEffect(() => {
		fetchTodolist()
			.unwrap()
			.then(res => res.todolists.forEach(el => fetchTasks(el.id)))
	}, [])
	const addTodo = (title: string) => {
		return addTodoThunk(title).unwrap()
	}

	return (
		<div className='todolist'>
			<Grid container style={{ padding: '20px' }}>
				<AddItemForm addItem={addTodo} />
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
