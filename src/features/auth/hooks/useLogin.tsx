import { useActions } from 'common/hooks'
import { BaseResponseType } from 'common/types'
import { useFormik } from 'formik'
import { authThunks } from '../model/authSlice'

export const useLogin = () => {
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
	return { formik }
}
