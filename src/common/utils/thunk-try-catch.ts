// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { appActions } from 'app/app-slice'
import { AppDispatch, AppRootState } from 'app/store'
import { BaseResponseType } from 'common/types'
import { serverErrorHandler } from '.'

export const thunkTryCatch = async <T>(
	thunkAPI: BaseThunkAPI<AppRootState, unknown, AppDispatch, null | BaseResponseType>,
	logic: () => Promise<T>
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
	const { dispatch, rejectWithValue } = thunkAPI
	dispatch(appActions.setAppStatus({ status: 'loading' }))
	try {
		return await logic()
	} catch (e) {
		serverErrorHandler(e, dispatch)
		return rejectWithValue(null)
	} finally {
		dispatch(appActions.setAppStatus({ status: 'idle' }))
	}
}
