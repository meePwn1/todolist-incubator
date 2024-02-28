import Button from '@mui/material/Button'
import { useActions } from 'common/hooks'
import { IEntityTodo } from 'common/types'
import { todolistsActions } from 'features/TodolistsList/model/todolistsSlice'

interface Props {
	todo: IEntityTodo
}

export const FilterTasksButtons = ({ todo }: Props) => {
	const { changeTodolistFilter } = useActions(todolistsActions)
	return (
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
	)
}
