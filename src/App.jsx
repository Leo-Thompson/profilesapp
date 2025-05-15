import 'devextreme/dist/css/dx.light.css';
import { useState, useEffect } from "react";
import React from "react";
import { useCallback } from 'react';
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
import  Scheduler, { Resource, Editing }  from 'devextreme-react/scheduler';
import { data } from './assets/data.js'



/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/resource').Schema>}
 */

Amplify.configure(outputs);
const client = generateClient({
  authMode: "userPool",
});


function addAppointment () {
                schedulerRef.current.instance().addAppointment({
                text: "",
                startDate: new Date(),
                endDate: new Date()
            });
        };

export default function App() {

  const currentDate = new Date();
  const views = ['week', 'month'];
  const [allowAdding, setAllowAdding] = useState(true);
  const [allowDeleting, setAllowDeleting] = useState(true);
  const [allowResizing, setAllowResizing] = useState(true);
  const [allowDragging, setAllowDragging] = useState(true);
  const [allowUpdating, setAllowUpdating] = useState(true);
  const onAllowAddingChanged = useCallback((e) => setAllowAdding(e.value), []);
  const onAllowDeletingChanged = useCallback((e) => setAllowDeleting(e.value), []);
  const onAllowResizingChanged = useCallback((e) => setAllowResizing(e.value), []);
  const onAllowDraggingChanged = useCallback((e) => setAllowDragging(e.value), []);
  const onAllowUpdatingChanged = useCallback((e) => setAllowUpdating(e.value), []);

  const [userprofiles, setUserProfiles] = useState([]);
  const { signOut } = useAuthenticator((context) => [context.user]);
  const schedulerRef = React.createRef();
  

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
      <React.Fragment>
        <Scheduler id="scheduler"
          timeZone="America/Los_Angeles"
          dataSource={data}
          views={views}
          defaultCurrentView="week"
          defaultCurrentDate={currentDate}
          height={730}
          startDayHour={7}>
          ref={schedulerRef}
          <Editing
            allowAdding={allowAdding}
            allowDeleting={allowDeleting}
            allowResizing={allowResizing}
            allowDragging={allowDragging}
            allowUpdating={allowUpdating}
          />
          
        </Scheduler>
        <Button
          text="Add"
          onClick={addAppointment}
        />
      </React.Fragment>
      <Button onClick={signOut}>Sign Out</Button>

    </Flex>

    //no idea why adding a data source or reference breaks it but here we are


  );
}