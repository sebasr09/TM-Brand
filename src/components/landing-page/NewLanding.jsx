import React, { useState } from "react";
import {
  Stack,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Container,
  Avatar,
  CssBaseline,
  AppBar,
  Toolbar,
  Box,
} from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { Line } from "react-chartjs-2";
import MediaQuery from "react-responsive";
import ContactDialog from "../common/dialogs/ContactDialog";
import SuccessSnackbar from "../common/SuccessSnackbar";
import Carousel from "react-material-ui-carousel";
import PersonIcon from "@mui/icons-material/Person";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import HomeIcon from "@mui/icons-material/Menu";
import { color, fontSize, lineHeight } from "@mui/system";
import { AutoMode, GTranslate } from "@mui/icons-material";

const NewLanding = () => {
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [openContactDialog, setOpenContactDialog] = useState(false);
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackBar] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const closeDialog = () => {
    setOpenContactDialog(false);
  };

  const handleNotify = (message) => {
    setOpenSnackBar(true);
    setMessage(message);
  };

  function handleClick() {
    history.push("/login");
  }
  function handleClick3() {
    history.push("/Es");
  }

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
    setMessage("");
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltips: {
        display: false,
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  const pooly = { lineData: [20, 24, 25, 18, 22, 29, 30, 37, 30, 27] };

  {
    /* START::::::::::::::::::::::::::::::NewLandingMobile */
  }

  return (
    <React.Fragment>
      <MediaQuery maxDeviceWidth={900}>
        
        <Stack
          sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: "url(images/bg-02.png)",
          }}
        >
          <Grid sx={{ m: "0 0 5em 1em" }}>
            <img
              src={"/images/new-logo.svg"}
              alt="Logo TradeMate"
              width="180"
              height="auto"
            />
            <Typography
              sx={{
                color: (theme) => theme.palette.white.main,
                fontWeight: "100",
                fontFamily: "space Grotesk",
                textAlign: "left",
                m: ".5em 0",
              }}
              component="div"
              variant="h3"
            >
                EVOLUTION IS
<br></br> PROFITABLE
            </Typography>
            
          </Grid>
        </Stack>

        

        

        
        
        <ContactDialog
          openDialog={openContactDialog}
          closeDialog={closeDialog}
          handleNotify={handleNotify}
        />
        <SuccessSnackbar
          open={openSnackbar}
          message={message}
          handleClose={handleCloseSnack}
        />
      </MediaQuery>

      {/* END::::::::::::::::::::::::::::::NewLanding Mobile */}

      {/* START::::::::::::::::::::::::::::::NewLanding Desktop */}
      {/* START::::::::::::::::::::::::::::::NewLanding Desktop */}
      {/* START::::::::::::::::::::::::::::::NewLanding Desktop */}

      <MediaQuery minDeviceWidth={901}>


        
        <Stack
          sx={{
            borderRadius: "10px",
            cursor: "Pointer",
            position:"absolute", right: "3em",
            top: "3em",
          }}
        >
          {/*
          <Grid>
            <Button
              variant="contained"
              color="purpletm"
              sx={{ p: "1em 3em" }}
              onClick={() => {
                handleClick();
              }}
              startIcon={<PersonIcon color="white" sx={{ fontSize: 30 }} />}
            >
              <Typography
                sx={{
                  color: "#ffffff",
                  fontWeight: "700",
                  fontFamily: "Poppins",
                }}
              >
                Login
              </Typography>
            </Button>
            {/*<div id="google_translate_element" ></div>
          </Grid>
*/}
        </Stack>
        <Stack
          sx={{
            borderRadius: "10px",
            cursor: "Pointer",
            position:"absolute", left: "3em",
            top: "3em",
          }}
        >
          {/*
          <Grid>
            <Button
              variant="contained"
              color="purpletm"
              sx={{ p: "1em 2em" }}
              onClick={() => {
                handleClick3();
              }}
              startIcon={<GTranslate color="white" sx={{ fontSize: 50 }} />}
            >
              <Typography
                sx={{
                  color: "#ffffff",
                  fontWeight: "700",
                  fontFamily: "Poppins",
                }}
              >
               Es
              </Typography>
            </Button>
            
          </Grid> 
          */}
        </Stack>
        <div
          style={{
            width: "100vw",
            height: "100vh",
            backgroundImage: "url(images/bg-01.png)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "left",
          }}
        >
          <Stack sx={{ width: "65vw", m: "0 auto" }}>
            <Grid>
              <img
                src={"/images/new-logo.svg"}
                alt="Logo TradeMate"
                width="220"
                height="auto"
              />
              <Typography
                sx={{
                  color: (theme) => theme.palette.white.main,
                  fontWeight: "100",
                  fontFamily: "Space Grotesk",
                  textAlign: "left",
                  m: ".5em 0",
                }}
                component="div"
                variant="h1"
              >
                EVOLUTION IS
<br></br> PROFITABLE
              </Typography>

            </Grid>
          </Stack>
        </div>

       

        
        

        
        
        <ContactDialog
          openDialog={openContactDialog}
          closeDialog={closeDialog}
          handleNotify={handleNotify}
        />
        <SuccessSnackbar
          open={openSnackbar}
          message={message}
          handleClose={handleCloseSnack}
        />
      </MediaQuery>
    </React.Fragment>
  );
};

export default NewLanding;
