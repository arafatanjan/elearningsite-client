import { createSlice } from "@reduxjs/toolkit"

export const resultReducer = createSlice({
    name: 'result',
    initialState : {
        userId : null,
        result : []
    },
    reducers : {
        setUserId : (state, action) => {
            state.userId = action.payload
        },
        pushResultAction : (state, action) => {
            state.result.push(action.payload);
        },
        updateResultAction : (state, action) => {
            const { trace, check } = action.payload;
            state.result.fill(check, trace, trace + 1)
        },
        resetResultAction : () => {
            return {
                // userId : null,
                result : []
            }
        }
    }
}
)

export const { setUserId, pushResultAction, resetResultAction,updateResultAction } = resultReducer.actions;

export default resultReducer.reducer;