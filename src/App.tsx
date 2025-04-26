import './theme/theme.css'
import './App.module.css'
import {useState} from "react";
import "./App.module.css"

function App() {
    const [isPlaying, setPlaying] = useState(false)
    return (
        <div style={{width: "100vw", backgroundColor: "var(--background-dark-paper)"}}>
            App
        </div>
    )
}

export default App
