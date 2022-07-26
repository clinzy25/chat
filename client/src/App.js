const App = () => {
  return (
    <main>
      <h1>Chat</h1>
      <div className='chat-ctr'>
        <div className='message-ctr'>...</div>
        <div className='input-ctr'>
          <input type='text' placeholder='talk to yourself' />
          <button type='submit'>Send</button>
        </div>
      </div>
    </main>
  )
}

export default App
