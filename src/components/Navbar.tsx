import { useState, useContext } from 'react'
import { ThemeContext } from "../context/themeContext"
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar: React.FC = () => {
  const { state, dispatch } = useContext(ThemeContext)

  const linkList: string[] = ['home', 'redux', 'context api', 'contact', 'w3g.tv']
  const [navbarState, setNavbarState] = useState(true)

  const changeState = () => {
    setNavbarState(!navbarState)
  }

  return (
    <nav className={`${navbarState ? 'full' : 'retracted'} ${state.theme ? 'light color-aaa' : 'dark color-333'}`}>
      <div className='title'>My Portfolio</div>
      <section className={state.theme ? 'light color-ccc' : 'dark color-444'}>
        <ul>
          {linkList.map((item, counter) => (
            <li key={counter}><Link to={item} >{ item.toUpperCase() }</Link></li>
          ))}
          <button onClick={changeState}>aaaaa</button>
        </ul>
      </section>
    </nav>
  )
}

export default Navbar