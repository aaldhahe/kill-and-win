import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './views/App.css';
import socketIOClient from "socket.io-client";

const endpoint = `http://127.0.0.1:${process.env.PORT || 8080}`;
const socket = socketIOClient(endpoint);
let interval: any;

export function App() {
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => ahmed('this is a testing message'), 1000);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export function SocketIoEx() {
    const [response, setResponse] = useState("");
    console.log(`endpoint: ${endpoint}`);
    socket.on("api", (data: string) => {
      console.log(`response: ${data}`);
      setResponse(data);
    });

    return (
      <p>It's {response}</p>
    );
}

const ahmed = (message: string) => {
  socket.emit('ahmed', message);
}
