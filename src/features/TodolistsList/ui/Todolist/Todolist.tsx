import { AddItemForm } from 'common/components/AddItemForm/AddItemForm'
import { useActions } from 'common/hooks/useActions'
import { IEntityTodo } from 'common/types'
import { tasksThunks } from 'features/TodolistsList/model/tasksSlice'
import { FC, memo } from 'react'
import { FilterTasksButtons } from './FilterTasksButtons/FilterTasksButtons'
import { Tasks } from './Tasks/Tasks'
import { TodolistTitle } from './TodolistTitle/TodolistTitle'

type PropsType = {
	todo: IEntityTodo
}

export const Todolist: FC<PropsType> = memo(({ todo }) => {
	const { addTaskThunk } = useActions(tasksThunks)

	const addTask = (title: string) => {
		return addTaskThunk({ todoID: todo.id, title }).unwrap()
	}

	return (
		<div>
			<TodolistTitle todo={todo} />
			<AddItemForm addItem={addTask} disabled={todo.entityStatus === 'loading'} />
			<Tasks todo={todo} />
			<FilterTasksButtons todo={todo} />
		</div>
	)
})
