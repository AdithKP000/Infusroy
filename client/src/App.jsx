
import './App.css'
import Hero from './pages/Hero.jsx'
import { Routes, Route} from 'react-router-dom';
import Upload from './pages/Upload.jsx';
import Model from './pages/Model.jsx';


function App() {
  return (
    <>
    <div className="conatiner ">

    <Routes>
            <Route path="/" element={<Hero/>}/>
            <Route path="/upload" element={<Upload/>}/>
            <Route path="/model" element={<Model/>}/>
    </Routes>
    </div>
    
    </>
  )
}

export default App
