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
            <Box className="category-title">Active Users</Box>
            <Stack className="cards-frame">

              <CssVarsProvider>
                {topUsers.length !== 0 ? (
                  topUsers.map((member: Member) => {
                    const imagePath = `${serverApi}/${member.memberImage}`
                    return (
                      <Card key={member._id} variant="outlined" className={"card"}>
                          <CardOverflow>
                            <AspectRatio ratio="1">
                              <img src={imagePath} alt="" />
                            </AspectRatio>
                          </CardOverflow>
  
                          <CardOverflow variant="soft" className={"member-nickname"}>
                                <Typography className={"title"}>
                                  {member.memberNick}
                                </Typography>
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