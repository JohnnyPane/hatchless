import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css'
import './utility.scss'
import { AuthProvider } from "./contexts/AuthContext.jsx";

import Rivers from './components/rivers/Rivers.jsx'
import River from './components/rivers/River.jsx'
import HatchChartPage from "./components/rivers/HatchChartPage.jsx";
import LoginSignupToggle from "./components/auth/LoginSignupToggle.jsx";
import Home from "./components/home/Home.jsx";

function App() {

  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<LoginSignupToggle />} />

            <Route path="/rivers" element={<Rivers />} />
            <Route path="/rivers/:id" element={<River />} />
            <Route path="/rivers/:id/hatch_chart" element={<HatchChartPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
