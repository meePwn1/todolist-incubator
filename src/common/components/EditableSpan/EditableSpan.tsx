import OutlinedInput from '@mui/material/OutlinedInput'
import { ChangeEvent, memo, useState } from 'react'

type Props = {
	value: string
	onChange: (newValue: string) => void
	disabled?: boolean
}

export const EditableSpan = memo((props: Props) => {
	const [editMode, setEditMode] = useState(false)
	const [title, setTitle] = useState(props.value)

	const activateEditMode = () => {
		if (!props.disabled) {
			setEditMode(true)
			setTitle(props.value)
		}
	}
	const activateViewMode = () => {
		setEditMode(false)
		props.onChange(title)
	}
	const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	return editMode ? (
		<OutlinedInput value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} size='small' />
	) : (
		<span onDoubleClick={activateEditMode}>{props.value}</span>
	)
})
