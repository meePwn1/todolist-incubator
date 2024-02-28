import ClearIcon from '@mui/icons-material/Clear'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { EditableSpan } from 'common/components/EditableSpan/EditableSpan'
import { useActions } from 'common/hooks'
import { IEntityTodo } from 'common/types'
import { todolistsThunks } from 'features/TodolistsList/model/todolistsSlice'

interface Props {
	todo: IEntityTodo
}
export const TodolistTitle = ({ todo }: Props) => {
	const { updateTitleTodoThunk, removeTodoThunk } = useActions(todolistsThunks)
	const removeTodolist = () => {
		removeTodoThunk(todo.id)
	}
	const changeTodolistTitle = (title: string) => {
		updateTitleTodoThunk({ id: todo.id, title })
	}
	return (
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
	)
}
