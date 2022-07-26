import { useEffect, useState } from 'react'
import { api, socket } from './api'

const App = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [input, setInput] = useState('')

  const getInitialMessages = () => {
    const url = `${api}/messages`
    try {
      setLoading(true)
      fetch(url)
        .then((res) => res.json())
        .then((data) => setMessages(data))
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(true)
      console.error(error)
    }
  }

  const handleSubmit = () => {
    if (input) {
      const newMessage = {
        content: input,
        from: 'user1',
        to: 'user2',
        createTs: new Date().getTime(),
      }
      socket.emit('message', newMessage)
      setInput('')
    } else {
      alert('Message cannot be empty')
    }
  }

  useEffect(() => {
    getInitialMessages()
    socket.on('message', (msg) => setMessages((prev) => [...prev, msg]))
    return () => socket.emit('end')
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
            : messages.map((msg) => <p key={msg.createTs}>{msg.content}</p>)}
        </div>
        <div className='input-ctr'>
          <input
            onChange={(e) => setInput(e.target.value)}
            type='text'
            placeholder='talk to yourself'
            value={input}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <button onClick={handleSubmit}>Send</button>
        </div>
      </div>
    </main>
  )
}

export default App
