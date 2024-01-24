import { useMemo } from 'react'
import { ITask } from '../types/ITask'
import { FilterValuesType } from '../types/ITodo'

export const useTasks = (tasks: ITask[], filter: FilterValuesType) => {
	const filteredTasks = useMemo(() => {
		switch (filter) {
			case 'active':
				return tasks.filter(el => !el.completed)
			case 'completed':
				return tasks.filter(el => el.completed)
			default:
				return tasks
		}
	}, [tasks, filter])
	return filteredTasks
}
