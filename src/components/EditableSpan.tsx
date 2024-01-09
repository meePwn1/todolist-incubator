import OutlinedInput from '@mui/material/OutlinedInput'
import { ChangeEvent, memo, useState } from 'react'

type EditableSpanPropsType = {
	value: string
	onChange: (newValue: string) => void
}

export const EditableSpan = memo((props: EditableSpanPropsType) => {
	const [editMode, setEditMode] = useState(false)
	const [title, setTitle] = useState(props.value)

	console.log('EditableSpan called')

	const activateEditMode = () => {
		setEditMode(true)
		setTitle(props.value)
	}
	const activateViewMode = () => {
		setEditMode(false)
		props.onChange(title)
	}
	const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	return editMode ? (
		<OutlinedInput
			value={title}
			onChange={changeTitle}
			autoFocus
			onBlur={activateViewMode}
			size='small'
		/>
	) : (
		<span onDoubleClick={activateEditMode}>{props.value}</span>
	)
})
