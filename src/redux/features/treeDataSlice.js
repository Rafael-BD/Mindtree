import { createSlice } from "@reduxjs/toolkit";

const treeDataSlice = createSlice({
    name: "treeData",
    initialState: {},
    reducers: {
        setTreeData(state, action) {
            return action.payload;
        },
        removeTreeData(state) {
            return {};
        },
    },
});

export const { setTreeData, removeTreeData } = treeDataSlice.actions;

export default treeDataSlice.reducer;