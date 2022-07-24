import { Box, Tab, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { NavBar } from "./NavBar";
import { UserBookings } from "./UserBookings";
import { useRouter } from "next/router";
import retrieveAuthToken from "../../utils/retrieveAuthToken";

export default function CabSharing() {
  const [tab, setTab] = useState("1");
  const [username, setUsername] = useState("");
  const router = useRouter();
  const handleTabChange = (event, value) => {
    setTab(value);
  };

  useEffect(() => {
    setUsername(localStorage.getItem("user_name"));
    retrieveAuthToken(router);
  }, []);

  return (
    <>
      <NavBar />
      <Box
        margin={3}
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      >
        <Typography variant="h5">Welcome, {username}!</Typography>
        <p>Click The Register Button to create a new booking </p>
        <Box sx={{ width: "80%" }}>
          <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTabChange}
                aria-label="Bookings Tab"
                centered
              >
                <Tab label="My Bookings" value="1" />
                <Tab label="All Bookings" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <UserBookings />
            </TabPanel>
            <TabPanel value="2">
              <DataTable />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </>
  );
}
