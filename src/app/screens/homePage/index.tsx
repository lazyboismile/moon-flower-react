import { Dispatch } from "@reduxjs/toolkit";
import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import "../../../css/home.css";
import { ProductCollection } from '../../../lib/enums/product.enum';
import { Member } from '../../../lib/types/member';
import { Product } from '../../../lib/types/product';
import MemberService from '../../services/MemberService';
import ProductService from '../../services/ProductService';
import AboutUs from './AboutUs';
import ActiveUsers from "./ActiveUsers";
import Advertisement from "./Advertisement";
import Events from "./Events";
import NewDishes from "./NewDishes";
import PopularDishes from "./PopularDishes";
import { setNewDishes, setPopularDishes, setTopUsers } from './slice';

//** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export default function HomePage() {
  const { setPopularDishes, setNewDishes, setTopUsers } = actionDispatch(useDispatch());
  // Selector: Store => Data

  useEffect(() => {
    const product = new ProductService();
    product.getProducts({
      page: 1,
      limit: 4,
      order: "productViews",
      productCollection: ProductCollection.DISH,
    })
    .then(data => {
      setPopularDishes(data);
    })
    .catch((err) => console.log(err));

    product.getProducts({
      page: 1,
      limit: 4,
      order: "createdAt",
    })
    .then(data => {
      setNewDishes(data);
    })
    .catch((err) => console.log(err));
    
    const member = new MemberService();
    member
      .getTopUsers()
      .then(data  => {
        setTopUsers(data);
      })
    .catch((err) => console.log(err));
    
  }, []);

  return (
    <div className={"homepage"}>
      <AboutUs />
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  )
}
