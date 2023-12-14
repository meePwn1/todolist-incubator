import { FC, InputHTMLAttributes, forwardRef } from 'react'
import style from './Input.module.scss'

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
	error?: string
	ref?: React.ForwardedRef<HTMLInputElement>
}

const Input: FC<IInput> = forwardRef(({ error, ...props }, ref: React.ForwardedRef<HTMLInputElement>) => {
	const inputClasses = [style.input]
	if (error) {
		inputClasses.push(style.input__error)
	}
	return <input ref={ref} {...props} className={inputClasses.join(' ')} />
})

export default Input
