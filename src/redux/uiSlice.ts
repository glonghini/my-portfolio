import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UIState {
  mode: string
}

const initialState: UIState = {
  mode: 'light',
}

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    changeMode: (state, action: PayloadAction<string>) => {
      console.log(action.payload)
      state.mode = action.payload      
    }
  }
})

export const { changeMode } = uiSlice.actions

export default uiSlice.reducer