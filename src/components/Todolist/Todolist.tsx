import { FC, useMemo } from 'react'
import { FilterValueType } from '../../App'
import AddItemForm from '../AddItemForm'
import EditableSpan from '../EditableSpan'
import Button from '../UI/button/Button'
import TodoItem from './TodoItem/TodoItem'

export interface TaskType {
	id: string
	title: string
	isDone: boolean
}

interface TodolistPropsType {
	todolistID: string
	title: string
	tasks: TaskType[]
	filter: FilterValueType
	filterTask: (todolistID: string, value: FilterValueType) => void
	removeTask: (todolistID: string, id: string) => void
	removeTodolist: (todolistID: string) => void
	createTask: (todolistID: string, task: string) => void
	changeTaskStatus: (todolistID: string, id: string, isDone: boolean) => void
	changeTodolistTitle: (todolistID: string, title: string) => void
	changeTaskTitle: (todolistID: string, taskID: string, title: string) => void
}

const Todolist: FC<TodolistPropsType> = ({
	todolistID,
	title,
	tasks,
	filter,
	removeTask,
	filterTask,
	createTask,
	changeTaskStatus,
	removeTodolist,
	changeTodolistTitle,
	changeTaskTitle,
}) => {
	const addItem = (title: string) => {
		createTask(todolistID, title)
	}
	const changeTodoTitle = (title: string) => {
		changeTodolistTitle(todolistID, title)
	}

	const filteredTasks = useMemo(() => {
		switch (filter) {
			case 'Active':
				return tasks.filter(el => el.isDone === false)
			case 'Completed':
				return tasks.filter(el => el.isDone === true)
			default:
				return tasks
		}
	}, [filter, tasks])

	return (
		<div className='todolist'>
			<div className='todolist__header'>
				<h3 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 15 }}>
					<EditableSpan changeTitle={changeTodoTitle} title={title} />
					<Button onClick={() => removeTodolist(todolistID)}>X</Button>
				</h3>
				<AddItemForm addItem={addItem} placeholder='New task' />
			</div>
			<div className='todolist__body'>
				<ul className='todolist__list'>
					{filteredTasks.map(task => {
						return (
							<TodoItem
								key={task.id}
								todolistID={todolistID}
								removeTask={removeTask}
								task={task}
								changeTaskStatus={changeTaskStatus}
								changeTaskTitle={changeTaskTitle}
							/>
						)
					})}
				</ul>
				<div className='todolist__btns'>
					<Button active={filter === 'All'} onClick={() => filterTask(todolistID, 'All')}>
						All
					</Button>
					<Button active={filter === 'Active'} onClick={() => filterTask(todolistID, 'Active')}>
						Active
					</Button>
					<Button active={filter === 'Completed'} onClick={() => filterTask(todolistID, 'Completed')}>
						Completed
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Todolist
