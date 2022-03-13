import { useAppSelector, useAppDispatch } from './redux/hooks'
import { addReservation, removeReservation } from './redux/reservationsSlice'

import { useState } from 'react'
import Header from './components/Header'
import { ThemeContextProvider } from './context/themeContext'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import UserForm from './components/UserForm'
import W3G, { W3GCreateRoom } from './components/W3G'

import './App.css';

function App() {
  const [reservationNameInput, setReservationNameInput] = useState("")

  // Hooks to import the state and the dispatch
  const reservations = useAppSelector((state) => state.reservations.value)
  const dispatch = useAppDispatch()

  const handleRemoveReservations = (name: string) => {
    dispatch(removeReservation(name))
  }

  const handleAddReservations = () => {
    if (!reservationNameInput) return
    dispatch(addReservation(reservationNameInput))
    setReservationNameInput("")
  }

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeContextProvider>
          <Navbar/>
          <div className='main-view'>
            <Header />
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/register' element={<UserForm/>}/>
              <Route path='/w3g.tv' element={<W3GCreateRoom/>}/>
              <Route path='/w3g.tv/rooms/:id' element={<W3G/>}/>
            </Routes>
          </div>
        </ThemeContextProvider>
      </BrowserRouter>
      {/* {reservations.map(name => (
        <div onClick={() => handleRemoveReservations(name)}>{name}</div>
      ))}
      <input
        type='text'
        value={reservationNameInput}
        onChange={(e) => setReservationNameInput(e.target.value)}
      />
      <button onClick={handleAddReservations}>Add reservation</button> */}
    </div>
  );
}

export default App;
