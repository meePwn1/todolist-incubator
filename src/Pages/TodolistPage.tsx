import { Grid, Paper } from '@mui/material'
import { Todolist } from 'components/Todolist/Todolist'
import { useActions } from 'hooks/useActions'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { useEffect } from 'react'
import { todolistsThunks } from 'store/slices/todolistsSlice'
import { AddItemForm } from '../components/AddItemForm/AddItemForm'

const TodolistPage = () => {
	const todos = useTypedSelector(state => state.todos)
	const { fetchTodolist, addTodoThunk } = useActions(todolistsThunks)

	useEffect(() => {
		fetchTodolist()
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
