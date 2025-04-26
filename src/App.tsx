import './theme/theme.css'
import {useState} from "react";
import PlayToggle from "./components/PlayToggle";
import playToggle from "./components/PlayToggle";
import IconToggle from "./components/IconToggle";
import {CirclePlus, Check} from "lucide-react";
function App() {
    const [isPlaying, setPlaying] = useState(false)
    return (
        <div className="p-6">
            <div className="space-x-10">
                <PlayToggle onClick={() => setPlaying(!isPlaying)} playing={isPlaying}/>


                <IconToggle icon={<CirclePlus />} activeIcon={<Check />} active/>
            </div>


        </div>
    )
}

export default App
