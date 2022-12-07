import type {ChangeEvent} from 'react'
import {useEffect, useRef} from 'react'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'

import {AppDispatch, AppState} from "./store";

export const useGlobalState = () => () => ({users: null}),

  /**
   * Use throughout your app instead of plain `useDispatch` and `useSelector`
   */
  useAppDispatch = () => useDispatch<AppDispatch>(),

  useAppSelector: TypedUseSelectorHook<AppState> = useSelector
;
