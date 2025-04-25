import './theme/theme.css'
import './App.module.css'
import {useState} from "react";
import "./App.module.css"
import SquareCard from "./components/SquareCard";

function App() {
    const [isPlaying, setPlaying] = useState(false)
    return (
        <div style={{width: "100vw", backgroundColor: "var(--background-dark-paper)"}}>
            <div style={{width: "12%"}}>
                <SquareCard images={[

                    {
                        "url": "https://i.scdn.co/image/ab67616d00001e022c5b24ecfa39523a75c993c4",
                        "height": 300,
                        "width": 300
                    }, {
                        "url": "https://i.scdn.co/image/ab6761610000f17889ffabe57a25cedeca3309e7",
                        "height": 160,
                        "width": 160
                    }]}
                            title="Cuối ngày"
                            subtitle="2021"
                />
            </div>
        </div>
    )
}

export default App
