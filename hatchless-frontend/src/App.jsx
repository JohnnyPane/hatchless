import { Route, Routes, useLocation } from 'react-router-dom'

import './App.css'
import './utility.scss'
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ResourceProvider } from "./contexts/ResourceContext.jsx";
import { TransitionProvider } from "./contexts/TransitionContext.jsx";

import Rivers from './components/rivers/Rivers.jsx'
import River from './components/rivers/River.jsx'
import HatchChartPage from "./components/rivers/HatchChartPage.jsx";
import LoginSignupToggle from "./components/auth/LoginSignupToggle.jsx";
import Home from "./components/home/Home.jsx";
import FlyShopForm from "./components/flyShops/FlyShopForm.jsx";
import FlyShop from "./components/flyShops/FlyShop.jsx";
import MyFlyShop from "./components/flyShops/MyFlyShop.jsx";
import HatchlessNavbar from "./components/ui/HatchlessNavbar.jsx";
import AddFlyPattern from "./components/flyPatterns/AddFlyPattern.jsx";

function App() {
  const location = useLocation();
  const showNavbar = location.pathname !== '/';

  return (
    <AuthProvider>
      <TransitionProvider>
        {showNavbar && <HatchlessNavbar/>}

        <Routes>
          <Route path="/" element={
            <ResourceProvider resourceName="rivers" initialParams={{ searchColumn: "name", waitForSearch: true }}>
              <Home />
            </ResourceProvider>
          }/>

          <Route path="/login" element={<LoginSignupToggle />} />

          <Route path="/fly_shops/create" element={<FlyShopForm />} />
          <Route path="/fly_shops/:id" element={<FlyShop />} />
          <Route path="/fly_shops/:id/my_fly_shop" element={<MyFlyShop />} />
          <Route path="/fly_shops/:id/my_fly_shop/add_fly_pattern" element={<AddFlyPattern />} />

          <Route path="/rivers" element={<Rivers />} />
          <Route path="/rivers/:id" element={<River />} />
          <Route path="/rivers/:id/hatch_chart" element={<HatchChartPage />} />
        </Routes>
      </TransitionProvider>
    </AuthProvider>
  )
}

export default App
