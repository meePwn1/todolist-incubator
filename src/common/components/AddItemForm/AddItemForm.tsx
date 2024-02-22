import { AddBox } from '@mui/icons-material'
import { IconButton, TextField } from '@mui/material'
import { ChangeEvent, KeyboardEvent, memo, useState } from 'react'

type AddItemFormPropsType = {
	addItem: (title: string) => void
	disabled?: boolean
}

export const AddItemForm = memo((props: AddItemFormPropsType) => {
	const [title, setTitle] = useState('')
	const [error, setError] = useState<string | null>(null)

	console.log('AddItemForm called')

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
		if (error !== null) {
			setError(null)
		}
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
				disabled={props.disabled}
			/>
			<IconButton color='primary' onClick={addItem} disabled={props.disabled}>
				<AddBox />
			</IconButton>
		</div>
	)
})
