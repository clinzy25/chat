import { useEffect, useState } from 'react'
import { config } from './config'

const App = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const getMessages = () => {
    try {
      setLoading(true)
      fetch(`${config.api}/messages`)
        .then((response) => response.json())
        .then((data) => setMessages(data))
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(true)
      console.error(error)
    }
  }

  useEffect(() => {
    getMessages()
  }, []) // eslint-disable-line

  return (
    <main>
      <h1>Chat</h1>
      <div className='chat-ctr'>
        <div className='message-ctr'>
          {loading
            ? 'loading...'
            : error
            ? 'error'
            : messages.map((msg) => <p>{msg.content}</p>)}
        </div>
        <div className='input-ctr'>
          <input type='text' placeholder='talk to yourself' />
          <button type='submit'>Send</button>
        </div>
      </div>
    </main>
  )
}

export default App
