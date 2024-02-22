export interface AuthRequestPayload {
	email: string
	password: string
	rememberMe?: boolean
	captcha?: boolean
}
