import { useState } from "react"

type UserType = {
  name: string,
  username: string,
  
}

const Home: React.FC = () => {
  const [user, setUser] = useState({
    name: ''
  })

  return (
    <div style={{ display: 'grid', placeItems: 'center', fontSize: 128, fontWeight: 'bold'}}>
       O JOGOsS
    </div>
  )
}

export default Home