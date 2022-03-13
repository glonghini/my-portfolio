import { useState } from "react"

type UserType = {
  name: string,
  username: string,
  
}

const UserForm: React.FC = () => {
  const [user, setUser] = useState({
    name: ''
  })

  return (
    <form>
      <label>
        <input type='text' placeholder='name' />
        <p></p>
      </label>
    </form>
  )
}

export default UserForm