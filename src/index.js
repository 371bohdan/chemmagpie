import React from 'react'; // обов'язково без нього компіляція не відбудеться
import * as ReactDOMClient from "react-dom/client"
import App from "./App"
import './css/main.css'



const root = ReactDOMClient.createRoot(document.getElementById("root"));

root.render(<App />);