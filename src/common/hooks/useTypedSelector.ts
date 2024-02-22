import { AppRootState } from 'app/store'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const useTypedSelector: TypedUseSelectorHook<AppRootState> = useSelector
