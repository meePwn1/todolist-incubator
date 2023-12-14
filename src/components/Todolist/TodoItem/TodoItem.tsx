import { ChangeEvent, FC } from 'react'
import EditableSpan from '../../EditableSpan'
import Button from '../../UI/button/Button'
import Input from '../../UI/input/Input'
import { TaskType } from '../Todolist'

interface TodoItemType {
	task: TaskType
	todolistID: string
	removeTask: (todolistID: string, id: string) => void
	changeTaskStatus: (todolistID: string, id: string, isDone: boolean) => void
	changeTaskTitle: (todolistID: string, taskID: string, title: string) => void
}

const TodoItem: FC<TodoItemType> = ({ todolistID, task, removeTask, changeTaskStatus, changeTaskTitle }) => {
	const onClickHandle = () => {
		removeTask(todolistID, task.id)
	}
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		changeTaskStatus(todolistID, task.id, e.target.checked)
	}
	const changeTitle = (title: string) => {
		changeTaskTitle(todolistID, task.id, title)
	}
	return (
		<li key={task.id}>
			<Input type='checkbox' onChange={onChangeHandler} checked={task.isDone} />
			<EditableSpan title={task.title} changeTitle={changeTitle} />

			<Button onClick={onClickHandle}>✖️</Button>
		</li>
	)
}

export default TodoItem
