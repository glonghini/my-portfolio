import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ReservationState {
  value: string[]
}

const initialState: ReservationState = {
  value: [],
}

export const reservationsSlice = createSlice({
  name: "reservationss",
  initialState,
  reducers: {
    addReservation: (state, action: PayloadAction<string>) => {
      state.value.push(action.payload)
    },
    removeReservation: (state, action: PayloadAction<string>) => {
      // Filtering the name that was clicked
      state.value = state.value.filter(name => name !== action.payload)
    }
  }
})

export const { addReservation, removeReservation } = reservationsSlice.actions

export default reservationsSlice.reducer