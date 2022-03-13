import { createContext, useReducer } from "react"

// type and initial state
type InitialStateType = {
  theme: boolean
}

const initialState = {
  // true: light mode, false: dark mode
  theme: true
}

interface ContextPropsInterface {
  state: InitialStateType
  dispatch: React.Dispatch<ActionType>
}

const ThemeContext = createContext<ContextPropsInterface>({
  state: initialState,
  dispatch: () => undefined
})

// reducers
type ActionType = {
  type: string
}

const themeReducer = (state: InitialStateType, action: ActionType) => {
  switch (action.type) {
    case 'toggle_theme':
      return { theme: !state.theme}
    default:
      return state;
  }
}

// provider
const ThemeContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  return (
    <ThemeContext.Provider value={{state, dispatch}}>
      {children}
    </ThemeContext.Provider>
  )
}


export { ThemeContextProvider, ThemeContext }