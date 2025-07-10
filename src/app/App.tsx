import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import "../css/app.css";
import "../css/footer.css";
import "../css/navbar.css";
import { Messages } from "../lib/config";
import { sweetErrorHandling, sweetTopSuccessAlert } from "../lib/sweetAlert";
import AuthenticationModal from "./components/auth";
import Footer from "./components/footer";
import HomeNavbar from "./components/headers/HomeNavbar";
import OtherNavbar from "./components/headers/OtherNavbar";
import useBasket from "./hooks/useBasket";
import { useGlobals } from "./hooks/useGlobals";
import HelpPage from "./screens/helpPage";
import HomePage from "./screens/homePage";
import OrdersPage from "./screens/ordersPage";
import ProductsPage from "./screens/productsPage";
import UserPage from "./screens/userPage";
import MemberService from "./services/MemberService";

function App() {
  const location = useLocation();
  const { setAuthMember } = useGlobals();
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();
  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  //**HANDLERS */

  const handleSignupClose = () => setSignupOpen(false);
  const handleLoginClose = () => setLoginOpen(false);

  const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseLogout = () => setAnchorEl(null);
  const handleLogoutRequest = async () => {
    try {
      const member = new MemberService();
      await member.logout();

      await sweetTopSuccessAlert("success", 700);
      setAuthMember(null);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(Messages.error1);
    }
  }

  return (
    <>
      {location.pathname === "/" ? 
      <HomeNavbar 
        cartItems={cartItems} 
        onAdd={onAdd} 
        onRemove={onRemove} 
        onDelete={onDelete} 
        onDeleteAll={onDeleteAll} 
        setSignupOpen={setSignupOpen} 
        setLoginOpen={setLoginOpen}
        anchorEl={anchorEl}
        handleLogoutClick={handleLogoutClick}
        handleCloseLogout={handleCloseLogout}
        handleLogoutRequest={handleLogoutRequest}
      /> : 
      <OtherNavbar 
        cartItems={cartItems} 
        onAdd={onAdd} 
        onRemove={onRemove} 
        onDelete={onDelete} 
        onDeleteAll={onDeleteAll} 
        setSignupOpen={setSignupOpen} 
        setLoginOpen={setLoginOpen}
        anchorEl={anchorEl}
        handleLogoutClick={handleLogoutClick}
        handleCloseLogout={handleCloseLogout}
        handleLogoutRequest={handleLogoutRequest}
      />}
      <Switch>
        <Route path="/products">
          <ProductsPage onAdd={onAdd} />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <UserPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/">
          {/* <Test /> */}
          <HomePage />
        </Route>
      </Switch>
      <Footer />

        <AuthenticationModal 
          signupOpen={signupOpen}
          loginOpen={loginOpen}
          handleLoginClose={handleLoginClose}
          handleSignupClose={handleSignupClose}
        />
    </>
  );
}

export default App;





