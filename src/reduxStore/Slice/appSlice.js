import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    alertLoading: false,
    drawerLoading: false,
    selectedDrawer: null,
    selectedDoctor: null,
}

const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAlertLoading: (state, action) => {
            state.alertLoading = !state.alertLoading
        },
        setDrawerLoading: (state, action) => {
            state.drawerLoading = !state.drawerLoading
        },
        setSelectedDrawer: (state, action) => {
            state.selectedDrawer = action.payload
        },
        setSelectedDoctor: (state, action) => {
            state.selectedDoctor = action.payload
        },
    }
})

export const { setAlertLoading,
    setDrawerLoading,
    setSelectedDrawer,
    setSelectedDoctor
} = appSlice.actions;
export const appState = (state) => state.app;
export default appSlice.reducer;