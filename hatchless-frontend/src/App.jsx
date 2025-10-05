import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css'
import Rivers from './components/rivers/Rivers.jsx'
import River from './components/rivers/River.jsx'
import HatchChart from "./components/rivers/HatchChart.jsx";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<h1>Hatchless</h1>} />
          <Route path="/rivers" element={<Rivers />} />
          <Route path="/rivers/:id" element={<River />} />
          <Route path="/rivers/:id/hatch_chart" element={<HatchChart />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
