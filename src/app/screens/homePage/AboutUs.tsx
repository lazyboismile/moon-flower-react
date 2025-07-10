import { Box, Container, Stack } from "@mui/material";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import React, { useEffect } from "react";
import Divider from "../../components/divider";

const AboutUs = () => {
  useEffect(() => {
    const lightbox = GLightbox({
      selector: ".glightbox",
      autoplayVideos: true,
      touchNavigation: true,
      loop: true,
    });

    return () => {
      lightbox.destroy(); // cleanup when component unmounts
    };
  }, []);

  return (
    <div className="static-frame">
      <Container>
        <Stack className="info">
          {/* Left Section - Image & Video Play Button */}
          <Stack className="static-box">
            <img
              src="/img/about.jpg"
              className="img-fluid"
              alt="About Delicious"
              style={{ width: "100%", borderRadius: "8px" }}
            />
            {/* GLightbox trigger */}
            <a
              href="https://www.youtube.com/watch?v=xPPLbEFbCAo"
              className="glightbox pulsating-play-btn"
              data-type="video"
            >
            </a>
          </Stack>

          {/* Divider */}
          <Divider height="229" width="4" bg="rgb(227, 192, 141)" />

          {/* Right Section - Text */}
          <Stack className="static-box">
          <Box className="static-title">
            Welcome to Our Delightful Eatery
          </Box>
          <Box className="static-text">
            <p className="more">
              Discover a world of flavor at our eatery, where every dish is crafted with
              passion and care. From the finest ingredients to the warmest ambiance, we
              invite you to savor an unforgettable dining experience.
            </p>
          </Box>
          <Box className="static-text">
            <p>
              Our journey began with a love for food and a desire to bring people
              together. With every bite, we aim to inspire joy and satisfaction. Join us
              as we continue to create culinary memories that linger long after the meal
              is done.
            </p>
          </Box>
        </Stack>
        </Stack>
      </Container>
    </div>
  );
};

export default AboutUs;
