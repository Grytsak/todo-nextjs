import { createSlice } from '@reduxjs/toolkit'

let user = ''
// Get user from localStorage
if (typeof window !== 'undefined') {
    user = JSON.parse(localStorage.getItem('user') || '{}')
}

const initialState = {
    user: user ? user : null
}

const authSlice  = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload
        },
        logOut: state => {
            state.user = null
            localStorage.removeitem('user')
        }
    }
})

export const { setCredentials, logOut } = authSlice.actions
export default authSlice.reducer