import { AddBox } from '@mui/icons-material'
import { IconButton, TextField } from '@mui/material'
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

	const inputStyle = {
		padding: '5px 12px',
	}
	return (
		<div style={{ display: 'inline-flex', alignItems: 'center' }}>
			<TextField
				variant='outlined'
				size='small'
				error={!!error}
				value={title}
				onChange={onChangeHandler}
				onKeyDown={onKeyDownHandler}
				label='Title'
				helperText={error}
				inputProps={{ style: inputStyle }}
			/>
			<IconButton color='primary' onClick={addItem}>
				<AddBox />
			</IconButton>
		</div>
	)
}
