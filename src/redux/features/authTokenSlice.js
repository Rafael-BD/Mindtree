// features/tasks/taskSlice.js
import { createSlice } from '@reduxjs/toolkit'

const authTokenSlice = createSlice({
    name: 'authToken',
    initialState: '',
    reducers: {
        setToken(state, action) {
            return action.payload
        },
        removeToken(state) {
            return ''
        }
    }
})

export const { setToken, removeToken } = authTokenSlice.actions

export default authTokenSlice.reducer