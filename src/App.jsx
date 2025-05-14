import 'devextreme/dist/css/dx.light.css';
import { useState, useEffect } from "react";
import React from "react";
import {
  Button,
  Heading,
  Flex,
  View,
  Grid,
  Divider,
} from "@aws-amplify/ui-react";
import Paper from '@mui/material/Paper';
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";
import  Scheduler, { Resource }  from 'devextreme-react/scheduler';
import { data } from './assets/data.js'



/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/resource').Schema>}
 */

Amplify.configure(outputs);
const client = generateClient({
  authMode: "userPool",
});


export default function App() {

  const currentDate = '2018-11-01';
  const views = ['week', 'month'];
  const schedulerData = [
    { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
    { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
];

  const [userprofiles, setUserProfiles] = useState([]);
  const { signOut } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  async function fetchUserProfile() {
    const { data: profiles } = await client.models.UserProfile.list();
    setUserProfiles(profiles);
  }

  return (
    <Flex
      className="App"
      justifyContent="center"
      alignItems="center"
      direction="column"
      width="70%"
      margin="0 auto"
    >
      {/*}
      <Heading level={1}>My Profile</Heading>

      <Divider />

      <Grid
        margin="3rem 0"
        autoFlow="column"
        justifyContent="center"
        gap="2rem"
        alignContent="center"
      >
        {userprofiles.map((userprofile) => (
          <Flex
            key={userprofile.id || userprofile.email}
            direction="column"
            justifyContent="center"
            alignItems="center"
            gap="2rem"
            border="1px solid #ccc"
            padding="2rem"
            borderRadius="5%"
            className="box"
          >
            <View>
              <Heading level="3">{userprofile.email}</Heading>
            </View>
          </Flex>
        ))}
      </Grid>
      <Scheduler id="scheduler"
       timeZone="America/Los_Angeles"
       dataSource={schedulerData}
       views={views}
       defaultCurrentView="week"
       defaultCurrentDate={currentDate}
       height={730}
       startDayHour={9}>
            
        </Scheduler>
      <Button onClick={signOut}>Sign Out</Button>

      {*/}

      <Scheduler id="scheduler"
       timeZone="America/Los_Angeles"
       dataSource={data}
       views={views}
       defaultCurrentView="week"
       defaultCurrentDate={currentDate}
       height={730}
       startDayHour={9}>
            
        </Scheduler>
      
    </Flex>

    //no idea why adding a data source or reference breaks it but here we are


  );
}