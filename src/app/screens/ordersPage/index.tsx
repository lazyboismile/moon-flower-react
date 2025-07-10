import { useState, SyntheticEvent, useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {useDispatch} from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import { setPausedOrders, setProcessOrders, setFinishedOrders } from './slice';
import { Order, OrderInquiry } from "../../../lib/types/order";
import Pausedorders from "./Pausedorders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";
import "../../../css/order.css";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";

//** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});


const OrdersPage = () => {
  const { orderBuilder, authMember } = useGlobals();
  const history = useHistory();
  const {setPausedOrders, setProcessOrders, setFinishedOrders} = actionDispatch(useDispatch());
  const [value, setValue] = useState("1");
  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });
  
  useEffect(() => {
    const order = new OrderService();
    order
      .getMyOrders({...orderInquiry, orderStatus: OrderStatus.PAUSE})
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({...orderInquiry, orderStatus: OrderStatus.PROCESS})
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({...orderInquiry, orderStatus: OrderStatus.FINISH})
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [orderInquiry, orderBuilder]);

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  }

  if (!authMember) history.push("/");
  return (
    <div className={"order-page"}>
      <Container className="order-container">
        <Stack className={"order-left"}>
          <TabContext value={value}>
            <Box className={"order-nav-frame"}>
              <Box sx={{ borderBottom: 1, borderColor: "divider"}}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className={"table_list"}
                >
                  <Tab label="PAUSED ORDERS" value={"1"}/>
                  <Tab label="PROCESS ORDERS" value={"2"}/>
                  <Tab label="FINISHED ORDERS" value={"3"}/>
                </Tabs>
              </Box>
            </Box>
            <Stack className={"order-main-content"}>
              <Pausedorders setValue={setValue}/>
              <ProcessOrders setValue={setValue}/>
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>

        <Stack className={"order-right"}>
          <Box className={"order-info-box"}>
            <Box className={"member-box"}>
              <div className={"order-user-img"}>
                <img 
                  src={
                    authMember?.memberImage 
                      ? `${serverApi}/${authMember.memberImage}`
                      : "/icons/default-user.svg"} 
                  className={"order-user-avatar"}
                />
                {/* <div className="order-user-icon-box">
                  <img 
                    src={
                      authMember?.memberType === MemberType.RESTAURANT
                       ? "/icons/restaurant.svg"
                       : "/icons/user-badge.svg"
                    }
                    className="order-user-prof-img" 
                  />
                </div> */}
              </div>
              <Box className={"order-user-name"}>{authMember?.memberNick}</Box>
              <Box className={"order-user-prof"}>{authMember?.memberType}</Box> 

              <Box className="liner" />
            <Box className={"order-user-location"}>
              <LocationOnIcon />
              <span className={"city"}>
                {authMember?.memberAddress
                  ? authMember.memberAddress
                  : "Do not exist"
                }
                </span>
            </Box>
            </Box>
          </Box>
          <Box className={"order-info-box"}>
            <Box className={"payment-box"}>
            <div className={"order-payment-text"}>
              <p className="card-input">Card number: 5243 4090 2002 7495</p>
              <div className="order-payment-text-2">
                <Box className="card-detail" marginRight={"10px"}>07 / 24</Box>
                <Box className="card-detail">CVV: 010</Box>
              </div>
              <p className="card-input">Justin Robertson</p>
            </div>
              <Box className={"order-payment-method"}>
              <img 
                src="/icons/western-card.svg"
                className="order-user-payment-img" 
              />
              <img 
                src="/icons/master-card.svg"
                className="order-user-payment-img" 
              />
              <img 
                src="/icons/paypal-card.svg"
                className="order-user-payment-img" 
              />
              <img 
                src="/icons/visa-card.svg"
                className="order-user-payment-img" 
              />
            </Box>
            </Box>
          </Box>
        </Stack>
      </Container>
    </div>
  )
}

export default OrdersPage

