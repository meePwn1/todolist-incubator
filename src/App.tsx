import { v1 } from 'uuid'
import './App.scss'
import AddItemForm from './components/AddItemForm'
import Todolist from './components/Todolist/Todolist'
import { useTaskActions, useTodoActions } from './hooks/useActions'
import { useTypedSelector } from './hooks/useTypedSelector'

function App(): JSX.Element {
	const tasks = useTypedSelector(state => state.tasks)
	const todolists = useTypedSelector(state => state.todolists)

	const { changeTaskStatus, changeTaskTitle, addTask, removeTask, initTaskAction } = useTaskActions()

	const { changeTodolistFilter, changeTodolistTitle, addTodolist, removeTodolist } = useTodoActions()

	const createTodolist = (title: string) => {
		const newTodolistID = v1()
		addTodolist(newTodolistID, title)
		initTaskAction(newTodolistID)
	}

	return (
		<div className='App'>
			<AddItemForm addItem={createTodolist} placeholder='New todolist' />
			<div className='todolists'>
				<div className='todolists__wrapper'>
					{todolists.map(tl => {
						return (
							<Todolist
								key={tl.id}
								todolistID={tl.id}
								title={tl.title}
								tasks={tasks[tl.id]}
								removeTask={removeTask}
								filterTask={changeTodolistFilter}
								createTask={addTask}
								changeTaskStatus={changeTaskStatus}
								removeTodolist={removeTodolist}
								changeTodolistTitle={changeTodolistTitle}
								changeTaskTitle={changeTaskTitle}
								filter={tl.filter}
							/>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default App
