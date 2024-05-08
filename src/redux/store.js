// store.js
import { configureStore } from '@reduxjs/toolkit'
import authTokenReducer from './features/authTokenSlice'

export default configureStore({
    reducer: {
        authToken: authTokenReducer,
    }
})