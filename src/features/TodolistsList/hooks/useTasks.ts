import { FilterValuesType, ITask } from 'common/types'
import { useMemo } from 'react'

export const useTasks = (tasks: ITask[], filter: FilterValuesType) => {
	const filteredTasks = useMemo(() => {
		switch (filter) {
			case 'active':
				return tasks.filter(el => el.status === 0)
			case 'completed':
				return tasks.filter(el => el.status === 2)
			default:
				return tasks
		}
	}, [tasks, filter])
	return filteredTasks
}
