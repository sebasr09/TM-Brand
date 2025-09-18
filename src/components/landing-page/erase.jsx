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
            position: "absolute",
            left: "2em",
            top: "2em",
            bgcolor: "#5033c1",
            borderRadius: "10px",
            p: ".5em",
          }}
        >
          <Grid>
            <PersonIcon
              color="white"
              sx={{ fontSize: 30 }}
              onClick={() => {
                handleClick();
              }}
            />
          </Grid>
        </Stack>
        <Stack
          sx={{
            position: "absolute",
            right: "2em",
            top: "2em",
            p: ".5em",
            bgcolor: "#5033c1",
            borderRadius: "10px",
          }}
        >
          {/*}
          <Grid>
            <Button
              variant="contained"
              color="purpletm"
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
                ES
              </Typography>
            </Button>
            {/*<div id="google_translate_element" ></div>
          </Grid>
          */}
        </Stack>
        <Stack
          sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <Grid sx={{ m: "0 0 5em 1em" }}>
            <img
              src={"/images/logo-azul.svg"}
              alt="Logo TradeMate"
              width="180"
              height="auto"
            />
            <Typography
              sx={{
                color: (theme) => theme.palette.bluetm.main,
                fontWeight: "700",
                fontFamily: "Poppins",
                textAlign: "left",
                m: ".5em 0",
              }}
              component="div"
              variant="h3"
            >
              The Future that<br></br> connects the market.
            </Typography>
            <div>
              <Button
                variant="contained"
                color="bluetm"
                sx={{
                  bgcolor: (theme) => theme.palette.purpletm.main,
                  color: (theme) => theme.palette.white.main,
                  border: "solid 1px #ffffff",
                  borderRadius: "25px",
                  fontSize: 14,
                  fontFamily: "Montserrat Bold",
                  padding: "1em 6em",
                }}
                onClick={() => {
                  handleClick();
                }}
              >
                Login &#8594;
              </Button>
            </div>
          </Grid>
        </Stack>

        <Stack width={"100%"} bgcolor={"#2a1e70"} p={"10em 1em"}>
          <Grid container width={"100%"}>
            <Grid item xs={12} sx={{ lineHeight: "0" }}>
              <AutoMode color="secondary" sx={{ fontSize: 60 }} />
              <Typography
                sx={{
                  color: (theme) => theme.palette.white.main,
                  fontWeight: "Bolder",
                  fontFamily: "Poppins",
                  textAlign: "left",
                  fontSize: "40px",
                  m: "1em 0",
                }}
                component="div"
                variant="h4"
              >
                TradeMate is a global market maker
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "left" }}>
              <Typography
                sx={{
                  color: (theme) => theme.palette.white.main,
                  fontWeight: "Light",
                  fontFamily: "Poppins",
                  textAlign: "left",
                  lineHeight: "2em",
                }}
                component="div"
                variant="h6"
              >
                At TradeMate, we pride ourselves on being an innovative and
                flexible company that is committed to our core values. Through
                our breakthrough technology, we are transforming the way global
                markets operate, improving efficiency and enabling our partners
                to achieve new levels of success.
              </Typography>
              <Typography
                sx={{
                  color: (theme) => theme.palette.white.main,
                  fontWeight: "Light",
                  fontFamily: "Poppins",
                  textAlign: "left",
                  m: "1em 0",
                  lineHeight: "2em",
                }}
                component="div"
                variant="h6"
              >
                Our software is designed with a long-term vision, and we are
                determined to make a difference in digital markets. We continue
                to work hard to offer ever more innovative and efficient
                solutions
              </Typography>
              <Typography
                sx={{
                  color: (theme) => theme.palette.white.main,
                  fontWeight: "Bold",
                  fontFamily: "Poppins",
                  textAlign: "left",
                  m: "1em 2em 1em 0",
                }}
                component="div"
                variant="h6"
              >
                Thank you for trusting us!
              </Typography>
            </Grid>
          </Grid>
        </Stack>

        <Stack width={"100%"} bgcolor={"#ffffff"} p={"10em 1em"}>
          <Grid container width={"100%"}>
            <Grid item xs={12} sx={{ lineHeight: "0" }}>
              <Stack width={"100%"}>
                <div
                  style={{
                    m: "0 auto",
                    borderRadius: "22px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={"/images/bg03.png"}
                    alt="Logo TradeMate"
                    width="100%"
                    height="auto"
                  />
                </div>
              </Stack>

              <Typography
                sx={{
                  color: (theme) => theme.palette.bluetm.main,
                  fontWeight: "Bolder",
                  fontFamily: "Poppins",
                  textAlign: "left",
                  fontSize: "40px",
                  m: "1em 0",
                }}
                component="div"
                variant="h4"
              >
                The bridge that connects the market.
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "left" }}>
              <Typography
                sx={{
                  color: (theme) => theme.palette.bluetm.main,
                  fontWeight: "500",
                  fontFamily: "Poppins",
                  textAlign: "left",
                  lineHeight: "2em",
                }}
                component="div"
                variant="h6"
              >
                We constantly push the limits of the impossible to achieve
                extraordinary results. Combining machine learning techniques,
                artificial intelligence, distributed systems and statistics to
                operate in global markets. Our innovative approach drives us to
                achieve the impossible.
              </Typography>
              <Typography
                sx={{
                  color: (theme) => theme.palette.bluetm.main,
                  fontWeight: "500",
                  fontFamily: "Poppins",
                  textAlign: "left",
                  m: "1em 0",
                  lineHeight: "2em",
                }}
                component="div"
                variant="h6"
              >
                TradeMate is the hub where development, research and technology
                converge to deliver superior liquidity to global markets. Our
                innovative approach and commitment to excellence position us as
                a leader in creating solutions that drive growth and efficiency
                in the worlds markets.<br></br>
                <br></br> At TradeMate, our purpose is to be the bridge that
                connects the two sides of the market in a fluid and efficient
                environment. Creating opportunities and building strong
                relationships to drive growth and success for all.
              </Typography>
            </Grid>
          </Grid>
        </Stack>

        <Stack
          direction="row"
          bgcolor={"#2a1e70"}
          sx={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid container maxWidth="100%">
            <Grid
              item
              xs={12}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                m: "6em 0 2em 0",
              }}
            >
              <img
                src={"/images/logo-blanco.svg"}
                alt="Logo TradeMate"
                width="180"
                height="auto"
              />
              <Typography
                sx={{ textAlign: "center", m: "2em 1em", lineHeight: "2.5em", fontWeight: "500",
                fontFamily: "Poppins", }}
                color={"#ffffff"}
                variant="p"
              >
                We are a technology firm focused on the financial markets since
                2021. our clients come to us to find solutions focused on
                planning their most important objectives.
              </Typography>
            </Grid>
            {/* <Grid item xs={12} sx={{ m: "4em 0" }}>
              <Stack
                sx={{
                  color: (theme) => theme.palette.white.main,
                }}
              >
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "Bold",
                    fontFamily: "Poppins",
                  }}
                  variant="h6"
                >
                  Nosotros
                </Typography>
                <Button
                  sx={{
                    textAlign: "center",
                    mb: "0.5em",
                    color: (theme) => theme.palette.white.main,
                    fontWeight: "Light",
                    fontFamily: "Poppins",
                    textTransform: "none",
                  }}
                  href="https://docs.trademate.tech/manejo-de-cuenta/terminos-y-condiciones"
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  Términos y Condiciones{" "}
                </Button>
                <Button
                  sx={{
                    textAlign: "center",
                    mb: "0.5em",
                    color: (theme) => theme.palette.white.main,
                    fontWeight: "Light",
                    fontFamily: "Poppins",
                    textTransform: "none",
                  }}
                  href="https://docs.trademate.tech/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  Manual de Usuario{" "}
                </Button>
              </Stack>
            </Grid> */}
            <Grid
              item
              xs={12}
              sx={{
                justifyContent: "center",
                display: "flex",
                color: (theme) => theme.palette.white.main,
                m: "0 0 4em 0",
              }}
            >
              <Stack>
                <Typography
                  sx={{
                    textAlign: "center",
                    mb: "1em",
                    fontSize: "20px",
                    color: (theme) => theme.palette.white.main,
                    fontWeight: "Bold",
                    fontFamily: "Poppins",
                  }}
                  variant="h6"
                >
                  Contacto
                </Typography>
                <Button
                  href="mailto:info@trademate.tech"
                  rel="noreferrer"
                  sx={{
                    color: (theme) => theme.palette.white.main,
                    fontWeight: "Light",
                    fontFamily: "Poppins",
                    textTransform: "none",
                  }}
                >
                  info@trademate.tech
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
        <Stack sx={{ bgcolor: "#1b154c" }}>
          <Typography
            sx={{ textAlign: "Center", m: "1em 0" }}
            color={"#ffffff"}
            variant="p"
          >
            © 2023 TradeMate Holding, LTD. All rights reserved
          </Typography>
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
                  fontWeight: "400",
                  fontFamily: "Space Grotesk",
                  textAlign: "left",
                  m: ".5em 0",
                }}
                component="div"
                variant="h1"
              >
                EVOLUTION IS A
<br></br> HIGH VALUE ASSET.
              </Typography>
              {/* START:::::::::::::::::::::::::::::
              <div>
                <Button
                  variant="contained"
                  color="bluetm"
                  sx={{
                    bgcolor: (theme) => theme.palette.purpletm.main,
                    color: (theme) => theme.palette.white.main,
                    border: "solid 1px #ffffff",
                    borderRadius: "25px",
                    fontSize: 14,
                    fontFamily: "Montserrat Bold",
                    padding: "1em 6em",
                  }}
                  onClick={() => {
                    handleClick();
                  }}
                >
                  Dashboard &#8594;
                </Button>
              </div>
              :NewLanding Desktop */}

            </Grid>
          </Stack>
        </div>

        <Stack
          width={"100vw"}
          height="90vh"
          alignItems="center"
          justifyContent="center"
          bgcolor={"#2a1e70"}
        >
          <Grid
            container
            width={"65vw"}
            alignItems="center"
            justifyContent="center"
            borderRadius="22px"
          >
            <Grid item xs={6} sx={{ lineHeight: "0", p: "8em 0" }}>
              <AutoMode color="secondary" sx={{ fontSize: 70 }} />
              <Typography
                sx={{
                  color: (theme) => theme.palette.white.main,
                  fontWeight: "Bolder",
                  fontFamily: "Poppins",
                  textAlign: "left",
                  fontSize: "40px",
                  m: "1em 2em 1em 0",
                }}
                component="div"
                variant="h4"
              >
                TradeMate is a <br></br> global market maker
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "left" }}>
              <Typography
                sx={{
                  color: (theme) => theme.palette.white.main,
                  fontWeight: "Light",
                  fontFamily: "Poppins",
                  textAlign: "left",
                  m: "1em 2em 1em 0",
                  lineHeight: "2em",
                }}
                component="div"
                variant="h6"
              >
                At TradeMate, we pride ourselves on being an innovative and
                flexible company that is committed to our core values. Through
                our breakthrough technology, we are transforming the way global
                markets operate, improving efficiency and enabling our partners
                to achieve new levels of success.
              </Typography>
              <Typography
                sx={{
                  color: (theme) => theme.palette.white.main,
                  fontWeight: "Light",
                  fontFamily: "Poppins",
                  textAlign: "left",
                  m: "1em 2em 1em 0",
                  lineHeight: "2em",
                }}
                component="div"
                variant="h6"
              >
                Our software is designed with a long-term vision, and we are
                determined to make a difference in digital markets. We continue
                to work hard to offer ever more innovative and efficient
                solutions
              </Typography>
              <Typography
                sx={{
                  color: (theme) => theme.palette.white.main,
                  fontWeight: "Bold",
                  fontFamily: "Poppins",
                  textAlign: "left",
                  m: "1em 2em 1em 0",
                }}
                component="div"
                variant="h6"
              >
                Thank you for trusting us!
              </Typography>
            </Grid>
          </Grid>
        </Stack>

        <Stack
          width={"100vw"}
          height="70vh"
          alignItems="center"
          justifyContent="center"
          mt={"10em"}
        >
          <div
            style={{
              width: "65vw",
              height: "50vh",
              backgroundImage: "url(images/bg01.png)",
              backgroundSize: "100%",
              borderRadius: "22px",
            }}
          ></div>
        </Stack>
        <Stack
          width={"100vw"}
          alignItems="center"
          justifyContent="start"
          mb={"10em"}
        >
          <Grid
            container
            width={"65vw"}
            alignItems="center"
            justifyContent="center"
            borderRadius="22px"
          >
            <Grid item xs={6} sx={{ lineHeight: "0", p: "8em 0" }}>
              <Typography
                sx={{
                  color: (theme) => theme.palette.bluetm.main,
                  fontWeight: "Bolder",
                  fontFamily: "Poppins",
                  textAlign: "left",
                  fontSize: "40px",
                  m: "0 4em 1em 0",
                }}
                component="div"
                variant="h4"
              >
                The bridge that connects the market.
              </Typography>
              <Typography
                sx={{
                  color: (theme) => theme.palette.bluetm.main,
                  fontWeight: "500",
                  fontFamily: "Poppins",
                  textAlign: "left",
                  m: "1em 4em 1em 0",
                  lineHeight: "2em",
                }}
                component="div"
                variant="h6"
              >
                We constantly push the limits of the impossible to achieve
                extraordinary results. Combining machine learning techniques,
                artificial intelligence, distributed systems and statistics to
                operate in global markets. Our innovative approach drives us to
                achieve the impossible.
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "left" }}>
              <Typography
                sx={{
                  color: (theme) => theme.palette.bluetm.main,
                  fontWeight: "500",
                  fontFamily: "Poppins",
                  textAlign: "left",
                  m: "0 2em 1em 0",
                  lineHeight: "2em",
                }}
                component="div"
                variant="h6"
              >
                TradeMate is the hub where development, research and technology
                converge to deliver superior liquidity to global markets. Our
                innovative approach and commitment to excellence position us as
                a leader in creating solutions that drive growth and efficiency
                in the worlds markets. At TradeMate, our purpose is to be the
                bridge that connects the two sides of the market in a fluid and
                efficient environment. Creating opportunities and building
                strong relationships to drive growth and success for all.
              </Typography>
            </Grid>
          </Grid>
        </Stack>

        <Stack
          direction="row"
          height={"50vh"}
          bgcolor={"#2a1e70"}
          sx={{
            width: "100vw",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid container maxWidth="60%">
            <Grid
              item
              xs={4}
              sx={{
                justifyContent: "center",
                display: "flex",
                mb: "5em",
                flexDirection: "column",
              }}
            >
              <img
                src={"/images/logo-blanco.svg"}
                alt="Logo TradeMate"
                width="180"
                height="auto"
              />
              <Typography
                sx={{ textAlign: "left", mt: "2em", lineHeight: "2.5em", fontWeight: "500",
                fontFamily: "Poppins", }}
                color={"#ffffff"}
                variant="p"
              >
                We are a technology firm focused on the financial markets since
                2021. our clients come to us to find solutions focused on
                planning their most important objectives.
              </Typography>
            </Grid>
            {/* <Grid item xs={4}>
              <Stack
                sx={{
                  color: (theme) => theme.palette.white.main,
                }}
              >
                <Typography
                  sx={{ textAlign: "center", mb: "1em", fontSize: "20px" }}
                  variant="h6"
                >
                  About us
                </Typography>
                <Button
                  sx={{
                    textAlign: "center",
                    mb: "0.5em",
                    color: (theme) => theme.palette.white.main,
                  }}
                  href="https://docs.trademate.tech/manejo-de-cuenta/terminos-y-condiciones"
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  terms and conditions{" "}
                </Button>
                <Button
                  sx={{
                    textAlign: "center",
                    mb: "0.5em",
                    color: (theme) => theme.palette.white.main,
                  }}
                  href="https://docs.trademate.tech/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  User Manual{" "}
                </Button>
              </Stack>
            </Grid> */}
            <Grid
              item
              xs={4}
              sx={{
                justifyContent: "center",
                display: "flex",
                color: (theme) => theme.palette.white.main,
              }}
            >
              <Stack>
                <Typography
                  sx={{
                    textAlign: "center",
                    mb: "1em",
                    fontSize: "20px",
                    color: (theme) => theme.palette.white.main,
                  }}
                  variant="h6"
                >
                  Contact Us
                </Typography>
                <Button
                  href="mailto:info@trademate.tech"
                  rel="noreferrer"
                  sx={{ color: (theme) => theme.palette.white.main }}
                >
                  info@trademate.tech
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
        <Stack sx={{ bgcolor: "#1b154c" }}>
          <Typography
            sx={{ textAlign: "Center", m: "1em 0" }}
            color={"#ffffff"}
            variant="p"
          >
            © 2023 TradeMate Holding, LTD. All rights reserved
          </Typography>
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
    </React.Fragment>
  );
};

export default NewLanding;
