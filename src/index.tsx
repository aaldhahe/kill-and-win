// import React from 'react';
// import ReactDOM from 'react-dom';
// import './views/index.css';
// import { App, SocketIoEx } from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//     <SocketIoEx />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

// import { onload } from './Alert';
import { Connection } from './Connection';

const endpoint = `http://127.0.0.1:${process.env.PORT || 8080}`;


const playerName: any = onload();
const socket: SocketIOClient.Socket = new Connection(endpoint).client();

export function init() {
  const element = document.getElementById("body") as HTMLInputElement;
  element.value = "Ahmed testing inside getElementById body";
}
// const element = document.getElementById("body") as HTMLInputElement;
// element.value = "Ahmed testing inside getElementById body";

let interval: any = setInterval(() => api(`${playerName}`), 2000);
const api = (message: string) => {
  socket.emit('ahmed', message);
}

export function onload(): any {
  return prompt("What is your name?", "");
}


