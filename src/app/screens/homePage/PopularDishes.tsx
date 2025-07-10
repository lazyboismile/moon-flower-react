import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardCover from '@mui/joy/CardCover';
import CardOverflow from '@mui/joy/CardOverflow';
import { CssVarsProvider } from '@mui/joy/styles';
import Typography from '@mui/joy/Typography';
import { Box, Button, Container, Stack } from '@mui/material';
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

const PopularDishes = (props: PopularDishesProps) => {
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
                <Stack
                  key={rowIndex}
                  direction="row"
                  justifyContent="space-between"
                  sx={{ width: '100%' }}
                >
                  {row.map((product: Product) => {
                    const imagePath = `${serverApi}/${product.productImages[0]}`;
                    const sizeVolume =
                      product.productCollection === ProductCollection.DRINK
                        ? `${product.productVolume} litre`
                        : `${product.productSize} size`;
                    return (
                      <CssVarsProvider key={product._id}>
                        <Card
                          variant="outlined"
                          className="card"
                          onClick={() => chooseDishHandler(product._id)}
                        >
                          <CardCover>
                            <img src={imagePath} alt={product.productName} />
                          </CardCover>
                          <CardCover className="card-cover" />
                          <CardContent sx={{ justifyContent: 'flex-end' }}>
                            <Stack flexDirection="row" justifyContent="space-between">
                              <Typography
                                level="h2"
                                fontSize="lg"
                                textColor="#fff"
                                mb={1}
                              >
                                {product.productName}
                              </Typography>
                              <Typography
                                sx={{
                                  fontWeight: 'md',
                                  color: 'neutral.300',
                                  alignItems: 'center',
                                  display: 'flex',
                                }}
                              >
                                {product.productViews}
                                <VisibilityIcon sx={{ fontSize: 25, marginLeft: '5px' }} />
                              </Typography>
                            </Stack>
                          </CardContent>
                          <CardOverflow
                            sx={{
                              display: 'flex',
                              gap: 1.5,
                              py: 1.5,
                              px: 'var(--Card-padding)',
                              borderTop: '1px solid',
                              height: '60px',
                            }}
                          >
                            <Typography
                              startDecorator={<DescriptionOutlinedIcon />}
                              textColor="neutral.300"
                            >
                              {product.productDesc}
                            </Typography>
                          </CardOverflow>
                        </Card>
                      </CssVarsProvider>
                    );
                  })}
                </Stack>
              ))
            ) : (
              <Box className="no-data">No {productSearch.productCollection} available</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};

export default PopularDishes;