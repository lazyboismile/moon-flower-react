import { Avatar, Box, Button, Container, Stack } from '@mui/material';
import { Dispatch } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSelector } from 'reselect';
import { serverApi } from '../../../lib/config';
import { ProductCollection } from '../../../lib/enums/product.enum';
import { Product, ProductInquiry } from '../../../lib/types/product';
import { CartItem } from '../../../lib/types/search';
import ProductService from '../../services/ProductService';
import { retrievePopularDishes } from './selector';
import { setPopularDishes } from './slice';

// ** REDUX SLICE & SELECTOR **
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
});
const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes })
);

interface PopularDishesProps {
  onAdd?: (item: CartItem) => void; // Made optional
}

const OurDishes = (props: PopularDishesProps) => {
  const { onAdd = () => {} } = props;
  const dispatch = useDispatch();
  const { popularDishes } = useSelector(popularDishesRetriever);
  const history = useHistory();

  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: 'createdAt',
    productCollection: ProductCollection.DISH,
    search: '',
  });

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => dispatch(setPopularDishes(data)))
      .catch((err) => console.log('Error fetching popular dishes:', err));
  }, [productSearch, dispatch]);

  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  // Function to chunk array into groups of 4
  const chunkArray = (array: Product[], size: number) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  // Chunk popularDishes into groups of 4
  const chunkedDishes = chunkArray(popularDishes, 4);

  return (
    <div className="popular-dishes-frame">
      <Container>
        <Stack className="popular-section">
          <Box className="category-button">Our Menu</Box>
          <Box className="category-title">
            Check Our Tasty <span>Menu</span>
          </Box>

          <Stack className="product-category">
            <Button
              className="order"
              onClick={() => searchCollectionHandler(ProductCollection.DISH)}
            >
              Dish
            </Button>
            <Button
              className="order"
              onClick={() => searchCollectionHandler(ProductCollection.SALAD)}
            >
              Salad
            </Button>
            <Button
              className="order"
              onClick={() => searchCollectionHandler(ProductCollection.DRINK)}
            >
              Drink
            </Button>
            <Button
              className="order"
              onClick={() => searchCollectionHandler(ProductCollection.DESSERT)}
            >
              Dessert
            </Button>
            <Button
              className="order"
              onClick={() => searchCollectionHandler(ProductCollection.OTHER)}
            >
              Other
            </Button>
          </Stack>

          <Stack className="cards-frame">
            {chunkedDishes.length > 0 ? (
              chunkedDishes.map((row, rowIndex) => (
                <Stack key={`row-${rowIndex}`} className="avatar">
                  {row.map((product: Product) => {
                    const imagePath = `${serverApi}/${product.productImages[0]}`;
                    return (
                      <Box
                        key={product._id}
                        className="menu-card"
                        onClick={() => chooseDishHandler(product._id)}
                      >
                        <Avatar
                          src={imagePath}
                          sx={{ width: 80, height: 80 }}
                          className="menu-img"
                        />
                        <Box className="menu-content">
                          <a>
                            {product.productName}
                            <span>{product.productDesc || 'Lorem, deren, trataro, filede, nerada'}</span>
                          </a>
                        </Box>
                        <Box className="menu-ingredients">${product.productPrice}</Box>
                      </Box>
                    );
                  })}
                </Stack>
              ))
            ) : (
              <Box className="no-data">
                No <span className="no-data-txt">{productSearch.productCollection}</span> available
              </Box>
            )}
          </Stack>

        </Stack>
      </Container>
    </div>
  );
};

export default OurDishes;