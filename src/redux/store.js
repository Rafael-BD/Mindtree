// store.js
import { configureStore } from '@reduxjs/toolkit'
import authTokenReducer from './features/authTokenSlice'
import treeDataReducer from './features/treeDataSlice'

export default configureStore({
    reducer: {
        authToken: authTokenReducer,
        treeData: treeDataReducer,
    }
})