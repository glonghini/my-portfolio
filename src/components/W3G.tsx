import { useState, useContext, useRef, useEffect } from 'react'
import { ThemeContext } from "../context/themeContext"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDoc } from '../hooks/useDoc'

import { db } from '../firebase/config'
import { collection, doc, addDoc, updateDoc } from 'firebase/firestore'

// import azly from './azly.mp4'

import './W3G.css'

type Message = {
  index: number,
  user: string,
  message: string
}[]

type Room = {
  playerState: string
}

const W3G: React.FC = () => {
  const { state, dispatch } = useContext(ThemeContext)
  const { id } = useParams()

  const { data }  = useDoc(`rooms/${id}`)
  const roomRef = doc(db, `rooms/${id}`)
  
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true)
  const [username, setUsername] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  
  const [message, setMessage] = useState<string>('')
  const [usersInRoom, setUsersInRoom] = useState<string[]>(['mbappe', 'benzema', 'neymar'])
  const [chatMessages, setChatMessages] = useState<Message>([
    {
      index: 1,
      user: 'benzema',
      message: 'pega no meu'
    },
    {
      index: 2,
      user: 'neymar',
      message: 'segura aqui'
    }
  ])

  const [playerState, setPlayerState] = useState<string>('play')
  const [link, setLink] = useState<string>("https://www.youtube.com/watch?v=zrxGZ-XpKnw")
  const playerRef = useRef<HTMLVideoElement>(null!)

  // useEffect for the changes in the room
  useEffect(() => {
    // Checking player state
    if (data.playerState === 'play') playerRef.current.play()
    else if (data.playerState === 'pause') playerRef.current.pause()
    playerRef.current.currentTime = data.timeStamp
    console.log(data.playerState)
  }, [data])

  // Login methods
  // const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setUsername(e.target.value)
  //   setErrorMessage('')
  // }

  // const handleEnterLogin = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   // The user has to input a username that is not blank and unique to the room
  //   if (e.key === 'Enter') {
  //     if (usersInRoom.includes(username)) {
  //       setErrorMessage('Este username já está em uso')
  //     }
  //     else if (username === '') {
  //       setErrorMessage('Insira um username valido')
  //     }
  //     else {
  //       setIsLoggedIn(true)
  //     }
  //   }
  // }

  // Room methods
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // When the user hit enter, send the message to the chat
    if (e.key === 'Enter') {
      setChatMessages([...chatMessages, {index: chatMessages.length + 1, user: username, message: message}])
      // Cleaning the input message
      setMessage('')
    }
  }

  // Player methods
  const handleActionOnPlayer = (playerState: string, timeStamp: number, readyState: number) => {
    // readyState = 1, paused because user is seeking, there's no need to pause
    if (readyState === 4) {
      updateDoc(roomRef, {
        playerState,
        timeStamp
      })
    }
    console.log(playerState, timeStamp, readyState)
  }

  // This regex receives the youtube link and finds the video ID
  const re = new RegExp(/.*v=([a-zA-Z0-9-]+)&?/, "i")

  const handleChangeLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    var embedLink: string = e.target.value.replace(re, "https://www.youtube.com/embed/$1")
    setLink(embedLink)
  }

  return(
    <div className={`w3g ${state.theme ? 'light color-bbb' : 'dark color-444'}`}>

      <div className='container'>
        {/* <iframe
        ref={playerRef}
        src={link}
        title="YouTube video player" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
        /> */}
        <video
        crossOrigin='anonymous'
        ref={playerRef} 
        src={link}
        autoPlay={false} 
        loop={true}
        muted={true} 
        controls={true} 
        onPlay={() => handleActionOnPlayer('play', playerRef.current.currentTime, playerRef.current.readyState)}
        onPause={() => handleActionOnPlayer('pause', playerRef.current.currentTime, playerRef.current.readyState)}
        onSeeked={() => handleActionOnPlayer('seeked', playerRef.current.currentTime, playerRef.current.readyState)}
        />
      </div>
      {/* <input type='text' value={link} onChange={handleChangeLink}/> */}
      <div className={`chatbox ${state.theme ? 'light color-eee' : 'dark color-555'}`}>
        <div className='messages-list'>
          {
            chatMessages.map(chat => (
              <div className='message' key={Math.random()}>
                <div className='message-user'>{chat.user}</div>: {chat.message}
              </div>
            ))
          }
        </div>
        <input value={username} type='text' placeholder='Username' style={{textAlign: 'center'}} onChange={(e) => setUsername(e.target.value)}/>
        <input value={message} type='text' placeholder='Mensagem...' onChange={handleChange} onKeyDown={handleEnter}/>
      </div>
    </div>
  )
}

export const W3GCreateRoom: React.FC = () => {
  const { state, dispatch } = useContext(ThemeContext)

  const [username, setUsername] = useState<string>('')

  const navigate = useNavigate()

  const handleClick = async () => {
    const ref = collection(db, 'rooms')

    await addDoc(ref, {
      users: [username],
      playerState: 'paused',
      timeStamp: 0,
      chat: [{}]
    })
    .then((docRef) => {
      // Redirect to the room
      navigate(`/w3g.tv/rooms/${docRef.id}`)
    })
  }

  return (
    <div className={`w3g-create-room ${state.theme ? 'light color-fff' : 'dark color-555'}`}>
      <div className={`container ${state.theme ? 'light color-aaa' : 'dark color-444'}`}>
        <div className='title'>W3G.tv</div>
        <p>Assista vídeos sincronizados em grupo</p>
        <br/>
        <p>Escreva seu nick e crie a sala</p>
        <input type='text' onChange={(e) => setUsername(e.target.value)}/>
        <br/>
        <button
          value={username}
          onClick={handleClick}
          disabled={username === '' ? true : false}
        >
          Criar Sala
        </button>
      </div>
      <div className={`container ${state.theme ? 'light color-aaa' : 'dark color-444'}`}>
        W3G.tv é um clone do site <Link to='https://w2g.tv/' style={{color: 'gold'}}>w2g.tv</Link>, para assistir vídeos síncronizados em grupo.
      </div>
    </div>
  )
}

export default W3G