import { Box } from '@material-ui/core';
import { Stack } from '@mui/joy';
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import React, { useEffect } from 'react';


const Gallery = () => {

  useEffect(() => {
    const lightbox = GLightbox({
      selector: ".glightbox",
      autoplayVideos: true,
      touchNavigation: true,
      loop: true,
    });

    return () => {
      lightbox.destroy();
    };
  }, []);

  const images = [
  "/gallery/gallery-1.jpg",
  "/gallery/gallery-2.jpg",
  "/gallery/gallery-3.jpg",
  "/gallery/gallery-4.jpg",
  "/gallery/gallery-5.jpg",
  "/gallery/gallery-6.jpg",
  "/gallery/gallery-7.jpg",
  "/gallery/gallery-8.jpg",
];

  return (
    <div className="ads-restaurant-frame">
      <Stack className="container">
        <Box className="category-button">Gallery</Box>
        <Box className="category-title">
          Some photos from <span>Our Restaurant</span>
        </Box>
      </Stack>

      <Stack className="box" sx={{alignContent: "center" , minWidth: "1330px"}}>
        {images.map((imgSrc, index) => (
          <Stack key={index} className="gallery-item">
            <a href={imgSrc} className="glightbox" data-gallery="images-gallery">
              <img src={imgSrc} alt={`Gallery ${index + 1}`} className="img-fluid" />
            </a>
          </Stack>
        ))}
      </Stack>
    </div>
  );
}

export default Gallery