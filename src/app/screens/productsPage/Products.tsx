import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, Container, Input, Stack } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Badge from '@mui/icons-material/Badge';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { CssVarsProvider } from '@mui/joy/styles';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import AspectRatio from '@mui/joy/AspectRatio';
import Typography from '@mui/joy/Typography';
import VisibilityIcon  from '@mui/icons-material/Visibility';

import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import { setProducts } from './slice';
import { createSelector } from 'reselect';
import { retrieveProducts } from './selector';
import { Product, ProductInquiry } from '../../../lib/types/product';
import ProductService from '../../services/ProductService';
import { ProductCollection } from '../../../lib/enums/product.enum';
import { serverApi } from '../../../lib/config';
import { useHistory } from 'react-router-dom';
import { CartItem } from '../../../lib/types/search';

//** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});
const productsRetriever = createSelector(
  retrieveProducts,
  (products) => ({ products })
);

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}
   
  const brands = [
    { brandName: "Gurme", brandImage: "/img/gurme.webp" },
    { brandName: "Seafood", brandImage: "/img/seafood.webp" },
    { brandName: "Sweets", brandImage: "/img/sweets.webp" },
    { brandName: "Doner", brandImage: "/img/doner.webp" },
  ]
const Products = (props: ProductsProps) => {
    const { onAdd } = props;
    const {setProducts} = actionDispatch(useDispatch());
    const {products} = useSelector(productsRetriever);
    const [productSearch, setProductSearch] = useState<ProductInquiry>({
        page: 1,
        limit: 8,
        order: "createdAt",
        productCollection: ProductCollection.DISH,
        search: "",
    });

    const [searchText, setSearchText] = useState<string>("");


    useEffect(() => {
        const product = new ProductService();
        product
        .getProducts(productSearch)
        .then((data) => setProducts(data))
        .catch((err) => console.log(err));
       
    }, [productSearch]);

    useEffect(() => {
        if(searchText === "") {
            productSearch.search = "";
            setProductSearch({...productSearch});
        }
    }, [searchText]);
    const history = useHistory();

    /** HANDLERS */

    const searchCollectionHandler = (collection: ProductCollection) => {
        productSearch.page = 1;
        productSearch.productCollection = collection;
        setProductSearch({...productSearch});
    }

    const searchOrderHandler = (order: string) => {
        productSearch.page = 1;
        productSearch.order = order;
        setProductSearch({...productSearch});
    }

    const searchProductHandler = () => {
        productSearch.search = searchText;
        setProductSearch({...productSearch});
    }

    const pagenationHandler = (e: ChangeEvent<any>, value: number) => {
        productSearch.page = value;
        setProductSearch({...productSearch})
    }

    const chooseDishHandler = (id: string) => {
        history.push(`/products/${id}`);
    }
    
  return (
    <div className={"products"}>
        <Container>
            <Stack flexDirection={"column"} alignItems={"center"}>
                
            <Stack className="avatar-big-box">
                <Box className="title"><span> Moon & Flower </span> Restaurant</Box>
                <Box
                    className="search"
                    component="form"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    noValidate
                    autoComplete="off"
                >
                    <Input
                        type="text"
                        placeholder="Type here"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                            e.preventDefault();
                            searchProductHandler();
                            }
                        }}
                        disableUnderline
                    />


                    <Button
                        variant="contained"
                        endIcon={<SearchIcon />}
                        sx={{
                            borderRadius: "32px",
                            backgroundColor: "#333",
                            color: "rgb(215, 181, 134)",
                            height: "32px",
                            textTransform: "uppercase",
                            fontFamily: "Poppins",
                            fontSize: "14px",
                            fontWeight: 500,
                            padding: "0 20px",
                        }}
                        onClick={searchProductHandler}
                    >   
                        Search
                    </Button>
                </Box>
            </Stack>

                <Stack className={"dishes-filter-section"}>
                    <Button
                    variant="contained"
                    className={`order ${productSearch.order === "createdAt" ? "active" : ""}`}
                    onClick={() => searchOrderHandler("createdAt")}
                    >
                    New
                    </Button>

                    <Button
                    variant="contained"
                    className={`order ${productSearch.order === "productPrice" ? "active" : ""}`}
                    onClick={() => searchOrderHandler("productPrice")}
                    >
                    Price
                    </Button>

                    <Button
                    variant="contained"
                    className={`order ${productSearch.order === "productView" ? "active" : ""}`}
                    onClick={() => searchOrderHandler("productView")}
                    >
                    View
                    </Button>
                </Stack>
                <Stack className="list-category-section">
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                        <Stack className="product-category" direction="column" spacing={1}>
                        <Button
                        variant="contained"
                        className={`order ${productSearch.productCollection === ProductCollection.DISH ? "active" : ""}`}
                        onClick={() => searchCollectionHandler(ProductCollection.DISH)}
                        >
                        Dish
                        </Button>

                        <Button
                        variant="contained"
                        className={`order ${productSearch.productCollection === ProductCollection.SALAD ? "active" : ""}`}
                        onClick={() => searchCollectionHandler(ProductCollection.SALAD)}
                        >
                        Salad
                        </Button>

                        <Button
                        variant="contained"
                        className={`order ${productSearch.productCollection === ProductCollection.DRINK ? "active" : ""}`}
                        onClick={() => searchCollectionHandler(ProductCollection.DRINK)}
                        >
                        Drink
                        </Button>

                        <Button
                        variant="contained"
                        className={`order ${productSearch.productCollection === ProductCollection.DESSERT ? "active" : ""}`}
                        onClick={() => searchCollectionHandler(ProductCollection.DESSERT)}
                        >
                        Dessert
                        </Button>

                        <Button
                        variant="contained"
                        className={`order ${productSearch.productCollection === ProductCollection.OTHER ? "active" : ""}`}
                        onClick={() => searchCollectionHandler(ProductCollection.OTHER)}
                        >
                        Other
                        </Button>

                        </Stack>

                        {/* Product Cards on the Right */}
                        <Stack className="product-wrapper-container">
                        <Stack className="product-wrapper" direction="row" flexWrap="wrap" gap={2}>
                            <CssVarsProvider>
                           {products.length !== 0 ? (
                            products.map((product: Product) => {
                                const imagePath = `${serverApi}/${product.productImages[0]}`;
                                const sizeVolume =
                                    product.productCollection === ProductCollection.DRINK
                                        ? product.productVolume + " litre"
                                        : product.productSize + " size";
                                return (
                                <Card 
                                    key={product._id} 
                                    variant="outlined" 
                                    className="card" 
                                    onClick={() => chooseDishHandler(product._id)}
                                >
                                    <CardOverflow sx={{ position: "relative" }}>
                                    <div className="product-sale">{sizeVolume}</div>
                                    <AspectRatio ratio="1">
                                        <img src={imagePath} alt={product.productName} />
                                    </AspectRatio>
                                    <Stack className="views" direction="row">
                                        <Box className="cart-icon-wrapper">
                                        <ShoppingCartIcon sx={{ fontSize: 20, color: "#fff" }} 
                                            onClick={(e) => {
                                                onAdd({
                                                    _id: product._id,
                                                    quantity: 1,
                                                    name: product.productName,
                                                    price: product.productPrice,
                                                    image: product.productImages[0],
                                                })
                                                e.stopPropagation();
                                            }}
                                        />
                                        </Box>
                                        <Box className="views-wrapper">
                                        <VisibilityIcon sx={{ fontSize: 20, color: "#fff" }} />
                                        <Typography className="view-count">{product.productViews}</Typography>
                                        </Box>
                                    </Stack>
                                    </CardOverflow>

                                    <CardOverflow variant="soft" className="product-detail">
                                    <Stack className="info">
                                        <Typography className="title">{product.productName}</Typography>
                                        <Stack flexDirection="row" alignItems="center">
                                        <MonetizationOnIcon
                                            sx={{
                                            fontSize: 20,
                                            marginRight: "5px",
                                            color: "rgb(227, 192, 141)",
                                            }}
                                        />
                                        <Typography className="price">{product.productPrice}</Typography>
                                        </Stack>
                                    </Stack>
                                    </CardOverflow>
                                </Card>
                                );
                            })
                            ) : (
                            <Box className="no-data">New Products are not available!</Box>
                            )}

                            </CssVarsProvider>
                        </Stack>
                        </Stack>
                    </Stack>
                    </Stack>
                <Stack className={"pagination-section"}>
                    <Pagination 
                        count={
                            products.length !== 0 
                                ? productSearch.page + 1 
                                : productSearch.page
                        }
                        page={productSearch.page}
                        renderItem={(item) => (
                            <PaginationItem 
                                components={{
                                    previous: ArrowBackIcon,
                                    next: ArrowForwardIcon,
                                }}
                                {...item}
                                color={"secondary"}
                            />
                        )}
                        onChange={pagenationHandler}
                    />
                </Stack>
            </Stack>
        </Container>

        {/* <div className="brands-logo">
            <Container>
                <Stack className="main">
                <Box className="category-title">Our Family Brands</Box>
                <Stack className="cards-frame" direction="row" spacing={2}>
                    <CssVarsProvider>
                    {brands.length !== 0 ? (
                        brands.map((ele, index) => (
                            <Card key={index} variant="outlined" className="card">
                                <CardOverflow>
                                <AspectRatio ratio="3/4">
                                    <Box sx={{ background: "rgb(13, 21, 24)", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <img src={ele.brandImage} alt={ele.brandName || "Brand"} />
                                    </Box>
                                </AspectRatio>
                                </CardOverflow>
                            </Card>
                        ))
                    ) : (
                        <Box className="no-data">No Available Brands Right Now!</Box>
                    )}
                    </CssVarsProvider>
                </Stack>
                </Stack>
            </Container>
        </div> */}

        <div className={"address"}>
            <Container>
                <Stack className={"address-area"}>
                    <Box className={"title"}>Our Address</Box>
                    <iframe 
                        style={{ marginTop: "60px"}}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20690.869144947923!2d-104.67494838560454!3d50.39880348863695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x531ea743b6e64bcf%3A0x535a1407788e7972!2sMoon%20and%20Flower%20Bakery!5e1!3m2!1sen!2s!4v1752263830479!5m2!1sen!2s"
                        width="1320"
                        height="500"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </Stack>
            </Container>
        </div>
    </div>
  )
}

export default Products