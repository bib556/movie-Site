
import { Routes,Route} from "react-router-dom"
import MovieWatch from  "./Components/MovieWatch"
import Homepage from "./Components/Homepage"
import WatchTrailer from "./Components/WatchTrailer"
// import './App.css'

function App() {
  return (
    <>
    <Routes>
      <Route path ="/" element ={<Homepage></Homepage>}/>
      <Route path = "/movie/:id" element = {<MovieWatch></MovieWatch>}></Route>
      <Route path ="/watch/:id" element = {<WatchTrailer></WatchTrailer>}></Route>
    </Routes>
 
    </>
  )
}

export default App
