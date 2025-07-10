import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      component="footer"
      className="footer dark-background"
      sx={{
        backgroundColor: "#212121",
        color: "#ffffff",
        py: 6,
        fontFamily: `'Poppins', sans-serif`,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="space-between"
          rowGap={4}
        >
          {/* Address */}
          <Stack
            direction="row"
            spacing={2}
            width={{ xs: "100%", sm: "48%", md: "23%" }}
          >
            <Box>
              <i className="bi bi-geo-alt icon" />
            </Box>
            <Box className="address">
              <Typography variant="h6" gutterBottom>
                Address
              </Typography>
              <Typography variant="body2">Downtown</Typography>
              <Typography variant="body2">Dubai, UAE</Typography>
            </Box>
          </Stack>

          {/* Contact */}
          <Stack
            direction="row"
            spacing={2}
            width={{ xs: "100%", sm: "48%", md: "23%" }}
          >
            <Box>
              <i className="bi bi-telephone icon" />
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                Contact
              </Typography>
              <Typography variant="body2">
                <strong>Phone:</strong> +971 4 554 7777
              </Typography>
              <Typography variant="body2">
                <strong>Email:</strong> devexuz@gmail.com
              </Typography>
            </Box>
          </Stack>

          {/* Opening Hours */}
          <Stack
            direction="row"
            spacing={2}
            width={{ xs: "100%", sm: "48%", md: "23%" }}
          >
            <Box>
              <i className="bi bi-clock icon" />
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                Opening Hours
              </Typography>
              <Typography variant="body2">
                <strong>Mon-Sun:</strong> 24 Hours
              </Typography>
            </Box>
          </Stack>

          {/* Follow Us */}
          <Box width={{ xs: "100%", sm: "48%", md: "23%" }}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box
              className="sns-context"
              display="flex"
              gap={1}
              alignItems="center"
              mt={1}
            >
              <img src="/icons/facebook.svg" alt="Facebook" />
              <img src="/icons/twitter.svg" alt="Twitter" />
              <img src="/icons/instagram.svg" alt="Instagram" />
              <img src="/icons/youtube.svg" alt="YouTube" />
            </Box>
            <Typography variant="body2" sx={{ mt: 2 }}>
              🥬 We are offering healthy food recipes on SNS
            </Typography>
          </Box>
        </Stack>

        {/* Divider */}
        <Box
          sx={{
            borderTop: "1px solid #C5C8C9",
            opacity: 0.2,
            my: 4,
          }}
        />

        {/* Bottom Text */}
        <Box textAlign="center">
          <Typography variant="body2">
            © Copyright <strong>Delicious</strong> All Rights Reserved
          </Typography>
          <Typography variant="caption">
            Designed by{" "}
            <Box
              component="a"
              href="https://github.com/lazyboismile"
              target="_blank"
              rel="noopener"
              sx={{ color: "#ffffff", textDecoration: "underline" }}
            >
              Tony
            </Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
