import * as AppActionCreators from './appActions'
import * as TaskActionCreators from './tasksAction'
import * as TodosActionCreators from './todolistActions'

export default {
	...TaskActionCreators,
	...TodosActionCreators,
	...AppActionCreators,
}
