import * as AppActionCreators from './appActions'
import * as AuthActionCreators from './authActions'
import * as TaskActionCreators from './tasksAction'
import * as TodosActionCreators from './todolistActions'

export default {
	...TaskActionCreators,
	...TodosActionCreators,
	...AppActionCreators,
	...AuthActionCreators,
}
