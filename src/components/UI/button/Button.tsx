import { ButtonHTMLAttributes, FC } from 'react'
import style from './Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	active?: boolean
}

const Button: FC<ButtonProps> = ({ children, active, ...props }) => {
	const buttonClasses = [style.button]

	if (active) {
		buttonClasses.push(style.button__active)
	}
	return (
		<button className={buttonClasses.join(' ')} {...props}>
			{children}
		</button>
	)
}

export default Button
