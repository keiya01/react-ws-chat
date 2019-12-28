import React, { useState, useRef, useEffect } from 'react';

const PORT = 9000;

const App: React.FC = () => {
  const ws = useRef(new WebSocket(`ws://localhost:${PORT}`));
  const [text, changeText] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeText(e.target.value);
  }
  
  const handleOnSubmit = () => {
    ws.current.send(text);
    changeText("");
  }

  useEffect(() => {
    ws.current.onmessage = (e: Event) => {
      const msg = e as Event & {data: string};
      setMessages(prev => ([
        ...prev,
        msg.data
      ]));
    };
  }, []);

  return (
    <div>
      <ul>
        {messages.map((msg, i) => (
          <li key={i.toString()}>{msg}</li>
        ))}
      </ul>
      <input value={text} onChange={handleOnChange}/>
      <button type="button" onClick={handleOnSubmit}>送信</button>
    </div>
  );
}

export default App;
