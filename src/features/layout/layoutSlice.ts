import {createSlice} from "@reduxjs/toolkit";

export interface LayoutState{
    openQueue: boolean;
    openSidebar: boolean;
    hideLayout: boolean;
}

const initialState: LayoutState = {
    openQueue: false,
    openSidebar: false,
    hideLayout: false,
};

const layoutSlice = createSlice({
    name: "layout",
    initialState,
    reducers: {
        toggleQueue: (state) => {
            state.openQueue = !state.openQueue;
        },
        toggleSidebar: (state) => {
            state.openSidebar = !state.openSidebar;
        },
        hideLayout: (state) => {
            state.hideLayout = true;
        },
        showLayout: (state) => {
            state.hideLayout = false;
        },
    }
});

export default layoutSlice;