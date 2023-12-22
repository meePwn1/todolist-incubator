import { ChangeEvent, KeyboardEvent, useState } from 'react'

type AddItemFormPropsType = {
	addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
	const [title, setTitle] = useState('')
	const [error, setError] = useState<string | null>(null)

	const addItem = () => {
		if (title.trim() !== '') {
			props.addItem(title)
			setTitle('')
		} else {
			setError('Title is required')
		}
	}

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
		if (e.key === 'Enter') {
			addItem()
		}
	}

	return (
		<div>
			<input value={title} onChange={onChangeHandler} onKeyDown={onKeyDownHandler} className={error ? 'error' : ''} />
			<button onClick={addItem}>+</button>

			{error && <div className='error-message'>{error}</div>}
		</div>
	)
}
