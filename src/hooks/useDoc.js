import { useState, useEffect } from "react"
import { db } from '../firebase/config'

// firebase imports
import { doc, onSnapshot } from 'firebase/firestore'

export const useDoc = (docName) => {
  const [data, setData] = useState({ playerState: 'pause', timeStamp: 0 })

  useEffect(() => {
    let ref = doc(db, docName)

    const unsub = onSnapshot(ref, (snapshot) => {
      let results = []

      console.log('snapshot', snapshot.data())

      setData(snapshot.data())
    })

    return () => unsub()
  }, [docName])

  return { data }
}