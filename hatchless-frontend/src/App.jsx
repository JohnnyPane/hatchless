import { Route, Routes, useLocation, Outlet } from 'react-router-dom'

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
import User from "./components/users/User.jsx";
import Feed from "./components/home/Feed.jsx";
import PostForm from "./components/posts/PostForm.jsx";
import HatchlessSidebar from "./components/ui/HatchlessSidebar.jsx";
import FlyShops from "./components/flyShops/FlyShops.jsx";
import EventForm from "./components/events/EventForm.jsx";

const AppLayout = () => {
  return (
    <div className="app-layout">
      <Outlet />
    </div>
  );
};

const SidebarLayout = () => {
  return (
    <div className="flex row">
      <HatchlessSidebar />
      <Outlet />
    </div>
  );
};

function App() {
  const location = useLocation();
  const showNavbar = location.pathname !== '/';

  return (
    <AuthProvider>
      <TransitionProvider>
        {showNavbar && <HatchlessNavbar/>}

        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={
              <ResourceProvider resourceName="rivers" initialParams={{ searchColumn: "name", waitForSearch: true }}>
                <Home />
              </ResourceProvider>
            }/>

            <Route path="/login" element={<LoginSignupToggle />} />

            <Route path="/events/create" element={<EventForm />} />

            <Route path="/fly_shops" element={<FlyShops />} />
            <Route path="/fly_shops/create" element={<FlyShopForm />} />
            <Route path="/fly_shops/:id" element={<FlyShop />} />
            <Route path="/fly_shops/:id/my_fly_shop" element={<MyFlyShop />} />
            <Route path="/fly_shops/:id/my_fly_shop/add_fly_pattern" element={<AddFlyPattern />} />

            <Route path="/posts/create" element={<PostForm />} />

            <Route path="/rivers" element={
              <ResourceProvider resourceName="rivers" initialParams={{ searchColumn: "name", perPage: 10 }}>
                <Rivers />
              </ResourceProvider>
            } />
            <Route path="/rivers/:id" element={<River />} />
            <Route path="/rivers/:id/hatch_chart" element={<HatchChartPage />} />

            <Route path="/users/:id" element={<User />} />
          </Route>

          <Route element={<SidebarLayout />}>
            <Route path="/feed" element={
              <ResourceProvider resourceName="posts">
                <Feed />
              </ResourceProvider>
            } />
          </Route>
        </Routes>
      </TransitionProvider>
    </AuthProvider>
  )
}

export default App
