export interface IApp {
	status: RequestStatusType
	error: string | null
	isInitialized: boolean
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
