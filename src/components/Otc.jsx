import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const Otc = () => {
  function handleClick() {
    history.push("/login");
  }
  return (
    <React.Fragment>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: (theme) => theme.palette.white.main,
          p: "1em",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            width: "100%",
            maxWidth: "1350px",
            justifyContent: "space-between",
            bgcolor: (theme) => theme.palette.white.main,
            m: "0 auto",
          }}
        >
          <Link to={"/"}>
            <img
              src={"/images/logo-azul.svg"}
              alt="Logo Trade Mate"
              width="190"
              height="auto"
            />
          </Link>
          <div>
            <Link to={"/Otc"}>
              <Button
                variant="text"
                sx={{
                  color: (theme) => theme.palette.bluetm.main,
                  fontSize: 14,
                  fontFamily: "Montserrat Bold",
                  padding: ".5em 4em",
                }}
                id="contactButton"
              >
                OTC
              </Button>
            </Link>
            <Button
              variant="contained"
              sx={{
                bgcolor: (theme) => theme.palette.bluetm.main,
                color: (theme) => theme.palette.white.main,
                border: "solid 1px #ffffff",
                borderRadius: "0",
                fontSize: 14,
                fontFamily: "Montserrat Bold",
                padding: ".5em 4em",
              }}
              onClick={() => {
                handleClick();
              }}
              id="contactButton"
            >
              Login &#8594;
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <Stack
        sx={{
          alignItems: "center",
          bgcolor: (theme) => theme.palette.white.main,
        }}
      >
        <Grid
          container
          width="100%"
          maxWidth="1350px"
          height="110vh"
          justify="flex-end"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={6} sx={{ textAlign: "left" }}>
            <Typography
              sx={{
                color: (theme) => theme.palette.bluetm.main,
                fontWeight: "700",
                fontFamily: "Poppins",
                m: "0 0 .5em 0 ",
                textAlign: "left",
                fontSize: "52px",
              }}
              component="div"
              variant="h4"
            >
              Soluciones de ejecución y OTC de TM
            </Typography>
            <Typography
              sx={{
                color: (theme) => theme.palette.bluetm.main,
                fontFamily: "Montserrat Light",
                m: "0 0 2em 0 ",
                textAlign: "left",
                fontSize: "18px",
              }}
              component="div"
              variant="p"
            >
              La plataforma de soluciones de ejecución y OTC de Trademate está
              dedicada a ofrecer a clientes privados e institucionales servicios
              profesionales y la tecnología más avanzada. La principal opción
              para operaciones en bloque, liquidaciones seguras y precios
              competitivos.
            </Typography>

            <Button
              variant="contained"
              href="/"
              sx={{
                bgcolor: (theme) => theme.palette.bluetm.main,
                color: (theme) => theme.palette.white.main,
                border: "solid 1px #ffffff",
                borderRadius: "0",
                fontSize: 14,
                fontFamily: "Montserrat Bold",
                mr: "1em",
                padding: ".8em 4em",
              }}
              id="contactButton"
            >
              Productos
            </Button>
          </Grid>
          <Grid item xs={5} sx={{ textAlign: "right" }}>
            <img src={"/images/appmain02.png"} alt="Landing" height="auto" />
          </Grid>
        </Grid>
      </Stack>

      <Stack>
        <Grid
          container
          width="100%"
          maxWidth="1350px"
          height="80vh"
          margin={"8em auto"}
        >
          <Typography
            sx={{
              color: (theme) => theme.palette.bluetm.main,
              fontFamily: "Montserrat Bold",
              m: "2em 0 2em 0 ",
              textAlign: "left",
              fontSize: "18px",
            }}
            component="div"
            variant="h5"
          >
            Procedimiento de incorporación
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Grid xs={3}>01</Grid>
          <Grid xs={3}>02</Grid> 
          <Grid xs={3}>03</Grid> 
          <Grid xs={3}>04</Grid>
        </Grid>
      </Stack>
    </React.Fragment>
  );
};

export default Otc;
