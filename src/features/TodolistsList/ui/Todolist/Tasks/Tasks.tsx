import List from '@mui/material/List'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { IEntityTodo } from 'common/types'
import { useTasks } from 'features/TodolistsList/hooks/useTasks'
import { Task } from './Task/Task'

interface Props {
	todo: IEntityTodo
}

export const Tasks = ({ todo }: Props) => {
	const tasks = useTypedSelector(state => state.tasks[todo.id])
	const filteredTasks = useTasks(tasks, todo.filter)
	return (
		<List dense={false}>
			{filteredTasks.map(t => {
				return <Task key={t.id} task={t} todoID={todo.id} />
			})}
		</List>
	)
}
