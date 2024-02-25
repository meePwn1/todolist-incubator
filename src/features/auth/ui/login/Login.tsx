import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useActions } from 'common/hooks/useActions'
import { BaseResponseType } from 'common/types'
import { authThunks } from 'features/auth/model/authSlice'
import { useFormik } from 'formik'

export const Login = () => {
	const { login } = useActions(authThunks)

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			rememberMe: false,
		},
		onSubmit: (values, actions) => {
			formik.resetForm()
			login(values)
				.unwrap()
				.catch((error: BaseResponseType) => {
					error.fieldsErrors.forEach(fieldError => {
						actions.setFieldError(fieldError.field, fieldError.error)
					})
				})
		},
	})

	return (
		<Grid container justifyContent={'center'}>
			<Grid item justifyContent={'center'}>
				<form onSubmit={formik.handleSubmit}>
					<FormControl>
						<FormLabel>
							<p>
								To log in get registered
								<a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
									{' '}
									here
								</a>
							</p>
							<p>or use common test account credentials:</p>
							<p>Email: free@samuraijs.com</p>
							<p>Password: free</p>
						</FormLabel>
						<FormGroup>
							<TextField label='Email' margin='normal' {...formik.getFieldProps('email')} />
							{formik.errors.email ? <div style={{ color: 'red' }}>{formik.errors.email}</div> : null}
							<TextField type='password' label='Password' margin='normal' {...formik.getFieldProps('password')} />
							{formik.errors.password ? <div style={{ color: 'red' }}>{formik.errors.password}</div> : null}
							<FormControlLabel label={'Remember me'} control={<Checkbox {...formik.getFieldProps('rememberMe')} />} />
							<Button type={'submit'} variant={'contained'} color={'primary'}>
								Login
							</Button>
						</FormGroup>
					</FormControl>
				</form>
			</Grid>
		</Grid>
	)
}
