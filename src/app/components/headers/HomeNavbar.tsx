import { Logout } from "@mui/icons-material";
import { Box, Button, Container, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material";
import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import Basket from "./Basket";

interface HomeNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}
;

const HomeNavbar = (props: HomeNavbarProps) => {
  const { 
    cartItems, 
    onAdd, 
    onRemove, 
    onDelete, 
    onDeleteAll, 
    setSignupOpen, 
    setLoginOpen,
    handleLogoutClick,
    anchorEl,
    handleCloseLogout,
    handleLogoutRequest
  } = props;
  const { authMember } = useGlobals();

  /** HANDLERS **/
  const history =  useHistory()

  return (
    <div className="home-navbar">
      <Container className="navbar-container">
        <Stack className="menu">
          <Box className={"sitename"}>
            <NavLink to="/">
              <h1>Moon & Flower</h1>
            </NavLink>
          </Box>
          <Stack className="links">
            <Box className={"hover-line"}>
              <NavLink to="/" activeClassName={"underline"}>
                Home
              </NavLink>
            </Box>
            <Box className={"hover-line"}>
              <NavLink to="/products" activeClassName={"underline"}>Menu</NavLink>
            </Box>
            {authMember ? (
              <Box className={"hover-line"}>
                <NavLink to="/orders" activeClassName={"underline"}>Orders</NavLink>
              </Box>
            ) : null}
            {authMember ? (
              <Box className={"hover-line"}>
                <NavLink to="/member-page" activeClassName={"underline"}>My page</NavLink>
              </Box>
            ) : null}
            <Box className={"hover-line"}>
              <NavLink to="/help" activeClassName={"underline"}>Help</NavLink>
            </Box>

            {/* BASKET */}
            <Basket 
              cartItems={cartItems}
              onAdd={onAdd} 
              onRemove={onRemove} 
              onDelete={onDelete} 
              onDeleteAll={onDeleteAll}
            />

            {!authMember ? (
              <Box>
                <Button 
                  className="login-button"
                  onClick={() => setLoginOpen(true)}
                >
                  Login
                </Button>
              </Box>) : (
                <img 
                  className="user-avatar"
                  src={
                    authMember?.memberImage
                     ? `${serverApi}/${authMember?.memberImage}`
                     : "/icons/default-user.jpg"}
                  aria-haspopup={"true"} 
                  onClick={handleLogoutClick}
                />
              )}

              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={Boolean(anchorEl)}
                onClose={handleCloseLogout}
                onClick={handleCloseLogout}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleLogoutRequest}>
                  <ListItemIcon>
                    <Logout fontSize="small" style={{ color: 'blue' }} />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
          </Stack>
        </Stack>
        <Stack className={"header-frame"}>
          <Stack className={"detail"}>
            <Box className={"head-main-text"}>
                <span>Delicious</span> Restaurant
            </Box>
            <Box  className={"wel-txt"}>Indulge in a symphony of flavors where every dish is <span>crafted with passion and precision.</span> </Box>
            <Box className="buttons">
              {!authMember ? (
                <>
                  <Button
                    className="signup-button"
                    onClick={() => {
                      history.push('/products'); // Programmatic navigation
                    }}
                  >
                    Our Menu
                  </Button>
                  <Button
                    className="signup-button"
                    onClick={() => setSignupOpen(true)}
                  >
                    Sign Up
                  </Button>
                </>
              ) : null}

              {authMember ? (
                <>
                  <Button
                    className="signup-button"
                    onClick={() => {
                      history.push('/products'); // Programmatic navigation
                    }}
                  >
                    Book A Table
                  </Button>
                </>
              ) : null}
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  )
}

export default HomeNavbar