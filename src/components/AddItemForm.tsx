import { ChangeEvent, FC, KeyboardEvent, useState } from 'react'
import Button from './UI/button/Button'
import Input from './UI/input/Input'

interface AddItemFormProps {
	placeholder: string
	addItem: (value: string) => void
}

const AddItemForm: FC<AddItemFormProps> = ({ addItem, placeholder }) => {
	const [title, setTitle] = useState<string>('')
	const [error, setError] = useState<string>('')

	const addItemHandler = () => {
		if (title.trim() !== '') {
			addItem(title.trim())
			setTitle('')
		} else {
			setError('Title is required')
		}
	}

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (!(e.target.value.length > 15)) {
			setTitle(e.target.value)
			setError('')
		} else {
			setError('max string length 15')
		}
	}

	const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			addItemHandler()
		}
	}

	return (
		<div className='todolists-add'>
			<div className='todolist__new-task'>
				<Input
					error={error}
					onKeyDown={keyDownHandler}
					value={title}
					onChange={onChangeHandler}
					placeholder={placeholder}
				/>
				<Button disabled={!title} onClick={addItemHandler}>
					Add New
				</Button>
			</div>
			{error && <div style={{ color: 'red' }}>{error}</div>}
		</div>
	)
}

export default AddItemForm
