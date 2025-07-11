import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import {
  Box,
  Card,



  CardActions, CardContent, CardHeader,
  CardMedia,


  Collapse,


  Container, IconButton,

  Stack,

  styled, Typography
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { serverApi } from '../../../lib/config';
import { ProductCollection } from '../../../lib/enums/product.enum';
import { Product } from '../../../lib/types/product';
import { retrieveNewDishes } from './selector';

// Redux selector
const newDishesRetriever = createSelector(retrieveNewDishes, (newDishes) => ({
  newDishes,
}));

// Styled ExpandMore button
const ExpandMore = styled((props: any) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }: { theme?: any; expand: boolean }) => ({
  marginLeft: 'auto',
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const NewDishes = () => {
  const { newDishes } = useSelector(newDishesRetriever);
const [expandedCardId, setExpandedCardId] = React.useState<string | null>(null);

const handleExpandClick = (id: string) => {
  setExpandedCardId(prev => (prev === id ? null : id));
};;

  return (
    <Box className="new-products-frame">
      <Container>
        <Stack className="main">
          <Box className="category-button">Our Top</Box>
          <Box className="category-title">
            Check Our <span>Tasty Meals</span>
          </Box>

          <Stack className="cards-frame" direction="row" flexWrap="wrap" gap={3}>
            {newDishes.length !== 0 ? (
              newDishes.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                const sizeVolume =
                  product.productCollection === ProductCollection.DRINK
                    ? product.productVolume + 'l'
                    : product.productSize + ' size';

                return (
                  <Card key={product._id} sx={{ maxWidth: 345, flex: '1 1 300px' }}>
                    <CardHeader
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={product.productName}
                      subheader={sizeVolume}
                    />
                    <CardMedia
                      component="img"
                      height="194"
                      image={imagePath}
                      alt={product.productName}
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {product.productDesc || 'This is a delicious product you must try.'}
                      </Typography>
                    </CardContent>

                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon sx={{color: "red"}}/>
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                      <ExpandMore
                        expand={expandedCardId === product._id}
                        onClick={() => handleExpandClick(product._id)}
                        aria-expanded={expandedCardId === product._id}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </CardActions>

                    <Collapse in={expandedCardId === product._id} timeout="auto" unmountOnExit className="details"> 
                      <CardContent>
                        <Typography sx={{ marginBottom: 2, fontSize: "20px", fontFamily: "Poppins" }}>Details:</Typography>
                        <Box className="detail">
                          <Typography>Price: <span>${product.productPrice}</span></Typography>
                          <Typography>Views: <span>{product.productViews}</span></Typography>
                        </Box>
                      </CardContent>
                    </Collapse>
                  </Card>
                );
              })
            ) : (
              <Box className="no-data">New Products are not available!</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default NewDishes;
