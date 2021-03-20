import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useSession() {
    const [sessionId, setSessionId] = useState(localStorage.getItem('sessionId') || '')

    useEffect(() => {
        async function postCartLocal() {
            let response = await axios.post('/cart')

            setSessionId(response.data.sessionId)
            localStorage.setItem('sessionId', response.data.sessionId)
        }

        async function checkSession(sessionId) {
            try {
                await axios('/cart/' + sessionId)
            } catch(e) {
                await postCartLocal()
            }
        }

        if (sessionId) {
            checkSession(sessionId)
        } else {
            postCartLocal()
        }
    }, [sessionId])

    return sessionId
}
