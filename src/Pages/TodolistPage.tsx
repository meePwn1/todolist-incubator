import { Grid, Paper } from '@mui/material'
import { useEffect } from 'react'
import { AddItemForm } from '../components/AddItemForm/AddItemForm'
import { Todolist } from '../components/Todolist/Todolist'
import { useAction } from '../hooks/useAction'
import { useTypedSelector } from '../hooks/useTypedSelector'

const TodolistPage = () => {
	const todos = useTypedSelector(state => state.todos)
	const { fetchTodolist, addTodoThunk } = useAction()

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
