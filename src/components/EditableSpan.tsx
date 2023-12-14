import { ChangeEvent, FC, KeyboardEvent, useState } from 'react'
import Input from './UI/input/Input'

interface EditableSpanProps {
	title: string
	changeTitle: (title: string) => void
}

const EditableSpan: FC<EditableSpanProps> = ({ title, changeTitle }) => {
	const [editMode, setEditMode] = useState<boolean>(false)
	const [inputValue, setInputValue] = useState<string>('')
	const [error, setError] = useState<string>('')

	const doubleClickHandler = () => {
		setEditMode(true)
		setInputValue(title)
	}
	const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			blurHandler()
		}
	}
	const blurHandler = () => {
		if (inputValue.trim()) {
			setEditMode(false)
			changeTitle(inputValue)
		} else {
			setError('Title is required')
		}
	}
	const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
		setError('')
	}
	return editMode ? (
		<span style={{ position: 'relative' }}>
			<Input
				error={error}
				onKeyDown={keyDownHandler}
				value={inputValue}
				onChange={changeHandler}
				onBlur={blurHandler}
				autoFocus
			/>
			{error && (
				<span
					style={{
						position: 'absolute',
						top: 8,
						left: 15,
						zIndex: 1,
						color: 'red',
						fontSize: 14,
						pointerEvents: 'none',
					}}
				>
					{error}
				</span>
			)}
		</span>
	) : (
		<span onDoubleClick={doubleClickHandler}>{title}</span>
	)
}

export default EditableSpan
