import { CssVarsProvider, Typography } from "@mui/joy";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import { Box, Container, Stack } from '@mui/material';
import React from 'react';
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { serverApi } from '../../../lib/config';
import { Member } from '../../../lib/types/member';
import { retrieveTopUsers } from './selector';


//** REDUX SLICE & SELECTOR */

const topUsersRetriever = createSelector(
  retrieveTopUsers,
  (topUsers) => ({ topUsers })
);

const ActiveUsers = () => {
  const { topUsers } = useSelector(topUsersRetriever);
      
  console.log("topUsers:", topUsers);
  return (
    <div className={"active-users-frame"}>
        <Container>
        <Stack className="main">
          <Stack className="container">
            <Box className="category-button">Chefs</Box>
            <Box className="category-title">
              Our Active <span> User</span>
            </Box>
          </Stack>
            <Stack className="cards-frame">

              <CssVarsProvider>
                {topUsers.length !== 0 ? (
                  [...topUsers]
                    .sort((a, b) => b.memberPoints - a.memberPoints) // Sort descending
                    .slice(0, 3) // Take top 3
                    .map((member: Member) => {
                      const imagePath = `${serverApi}/${member.memberImage}`;
                      return (
                        <Card key={member._id}>
                          <CardOverflow>
                            <AspectRatio ratio="1" className="pic">
                              <img src={imagePath} alt={member.memberNick} />
                            </AspectRatio>
                          </CardOverflow>

                          <CardOverflow variant="soft" className={"member-info"}>
                            <Typography className={"title"}>{member.memberNick}</Typography>
                            <Typography className={"point"}>Member Orders: {member.memberPoints}</Typography>
                            <Box className="social">
                              <img src="/icons/facebook.svg" alt="Facebook" />
                              <img src="/icons/twitter.svg" alt="Twitter" />
                              <img src="/icons/instagram.svg" alt="Instagram" />
                              <img src="/icons/youtube.svg" alt="YouTube" />
                            </Box>
                          </CardOverflow>
                        </Card>
                      );
                    })
                ) : (
                  <Box className="no-data">No Active Users!</Box>
                )}
              </CssVarsProvider>
            </Stack>
        </Stack>
        </Container>
    </div>
  )
}

export default ActiveUsers