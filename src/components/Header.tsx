import { useContext } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks"
import { changeMode } from "../redux/uiSlice"
import { ThemeContext } from "../context/themeContext"

import './Header.css'
import { useParams } from "react-router-dom";

const Header: React.FC = () => {
  const theme = useAppSelector((state) => state.ui.mode)
  const reduxDispatch = useAppDispatch()

  const { state, dispatch } = useContext(ThemeContext)

  return (
    <header className={state.theme ? 'light color-bbb' : 'dark color-222'}>
      <ul>
        <li>
          <button 
          className={state.theme ? 'light color-eee' : 'dark color-333'} 
          onClick={() => dispatch({ type: 'toggle_theme' })}
          >
            {state.theme ? 'Light Theme' : 'Dark Theme'}
          </button>
        </li>
        {/* <li><button className='light' onClick={() => reduxDispatch(changeMode('dark'))}>Redux</button></li> */}
      </ul>      
    </header>
  )
}

export default Header