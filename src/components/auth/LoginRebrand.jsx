import React, { useState } from "react";

import Alert from "@mui/lab/Alert";
import { Auth } from "aws-amplify";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import LoadingBackdrop from "../common/LoadingBackdrop";
import PropTypes from "prop-types";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { getApi } from "../api/apiManager";
import Terms from "./Terms";
import MediaQuery from "react-responsive";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack, Grid } from "@mui/material";
import { bgcolor } from "@mui/system";
const validateEmailInput = (input) => {
  return /^([A-Za-z0-9\-_]+\.?)+@[A-Za-z0-9]+\.([A-Za-z]+\.?)+$/.test(input);
};

export default function LoginRebrand({
  triggerSessionValidation,
  setAuthState,
  setLocalUser,
  setUserInfo,
}) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openWarning, setOpenWarning] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const [user, setUser] = useState({});

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
    setOpenWarning(false);
  };

  const handleCloseTerms = () => {
    setOpenTerms(false);
    findUserByEmail();
  };

  const findUserByEmail = async () => {
    const result = await getApi(`next-activos/findUserByEmail/${email}`);
    setUserInfo(result);
    setUser(result);
    if (result.acceptedTerms) {
      window.localStorage.setItem("user-info", JSON.stringify(result));
      triggerSessionValidation();
    } else {
      console.log(user);
      setOpenTerms(true);
    }
  };

  const login = async () => {
    try {
      setOpenLoading(true);
      const result = await Auth.signIn(email, password);
      setLocalUser(result);
      if (
        result.challengeName === "NEW_PASSWORD_REQUIRED" ||
        result.challengeName === "RESET_REQUIRED"
      )
        setAuthState("CHANGE_PASSWORD");
      else {
        await findUserByEmail();
      }
    } catch (err) {
      switch (err.code) {
        case "NotAuthorizedException":
          setErrorMessage(
            "Las credenciales son incorrectas, intenta de nuevo."
          );
          setOpenError(true);
          break;
        case "UserNotFoundException":
          setErrorMessage("El usuario especificado no existe.");
          setOpenError(true);
          break;
        case "UserNotConfirmedException":
          setErrorMessage("Verifica tu cuenta antes de iniciar sesión.");
          setOpenError(true);
          break;
        default:
          break;
      }
      console.log(err);
    } finally {
      setOpenLoading(false);
    }
  };

  const handleEmail = (event) => {
    const error = !validateEmailInput(event.target.value);
    setEmailError(error);
    setEmail(event.target.value);
  };

  return (
    <React.Fragment>
      <MediaQuery minDeviceWidth={901}>
        <Container component="main" maxWidth="xs">
          <LoadingBackdrop open={openLoading} />
          <Stack
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid
              container
              position="relative"
              width="100vw"
              height="60vh"
              maxWidth="960px"
              justify="flex-end"
              alignItems="center"
              justifyContent="center"
              bgcolor="#ffffff"
              overflow="hidden"
              borderRadius="22px"
            >
              <Button
                variant="text"
                color="primary"
                href="/"
                sx={{
                  position: "absolute",
                  top: "18px",
                  right: "18px",
                  fontSize: 19,
                  borderRadius: 0,
                  fontFamily: "Montserrat Bold",
                }}
                id="logInButton"
              >
                X
              </Button>

              <Grid item xs={6} sx={{ background:"#5033C1" }}>
                <img
                  src={"/images/logo02.png"}
                  width="100%"
                  alt="Landing"
                />
              </Grid>

              <Grid
                item
                xs={6}
                sx={{ textAlign: "center", position: "relative" }}
              >
                <Typography
                  className={classes.title}
                  color={"#000000"}
                  fontWeight="700"
                  fontFamily="Poppins"
                  component="h1"
                  variant="h4"
                  id="dashboardTitle"
                >
                  Dashboard Login
                </Typography>
                <TextField
                  type="email"
                  variant="outlined"
                  margin="normal"
                  sx={{ width: 300 }}
                  label="Email"
                  name="email"
                  autoComplete="email"
                  error={emailError}
                  helperText={emailError ? "Ingresa un correo válido" : null}
                  autoFocus
                  value={email}
                  onChange={handleEmail}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  sx={{ width: 300 }}
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                />
                <Button
                  variant="contained"
                  color="purpletm"
                  sx={{
                    color:"#ffffff",
                    fontSize: 15,
                    width: 310,
                    height: 50,
                    borderRadius: "25px",
                    fontFamily: "Montserrat Bold",
                    m: "1em 0",
                  }}
                  onClick={() => {
                    return !emailError && login();
                  }}
                  id="logInButton"
                >
                  Ingresar
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    fontSize: 15,
                    width: 310,
                    height: 50,
                    borderRadius: "25px",
                    border: "solid 1px #353666",
                    fontFamily: "Montserrat Bold",
                    mb: "1em",
                  }}
                  onClick={() => setAuthState("SIGNUP")}
                  id="forgotPasswordButton"
                >
                  Registrarse
                </Button>
                <Button
                  fullWidth
                  color="primary"
                  className={classes.forgotPasswordButton}
                  onClick={() => setAuthState("FORGOT_PASSWORD")}
                  id="forgotPasswordButton"
                >
                  Recuperar contraseña
                </Button>
              </Grid>
              <Grid item xs={1} />
            </Grid>
          </Stack>

          <Terms open={openTerms} user={user} handleClose={handleCloseTerms} />
          <div className={classes.paper}>
            <Snackbar
              open={openError}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity="error">
                {errorMessage}
              </Alert>
            </Snackbar>
            <Snackbar
              open={openWarning}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity="warning">
                Please enter a valid email and password
              </Alert>
            </Snackbar>
          </div>
        </Container>
      </MediaQuery>

      <MediaQuery maxDeviceWidth={900}>
        <Container component="main" maxWidth="xs">
          <LoadingBackdrop open={openLoading} />
          <Stack
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid
              container
              width="90vw"
              maxWidth="960px"
              justify="flex-end"
              alignItems="center"
              justifyContent="center"
              bgcolor="#ffffff"
              overflow="hidden"
              borderRadius="22px"
            >

              <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Button
                variant="text"
                color="primary"
                href="/"
                sx={{
                  position: "absolute",
                  top: "18px",
                  right: "0",
                  fontSize: 19,
                  borderRadius: 0,
                  fontFamily: "Montserrat Bold",
                }}
                id="logInButton"
              >
                X
              </Button>
                <Typography
                  fontWeight="700"
                  fontFamily="Poppins"
                  component="h1"
                  variant="h4"
                  id="dashboardTitle"
                >
                  Dashboard Login
                </Typography>
                <TextField
                  type="email"
                  variant="outlined"
                  margin="normal"
                  sx={{ width: 300 }}
                  label="Email"
                  name="email"
                  autoComplete="email"
                  error={emailError}
                  helperText={emailError ? "Ingresa un correo válido" : null}
                  autoFocus
                  value={email}
                  onChange={handleEmail}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  sx={{ width: 300 }}
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                />
                <Button
                  sx={{
                    fontSize: 15,
                    width: 310,
                    height: 50,
                    bgcolor:(theme) => theme.palette.purpletm.main,
                    borderRadius: 25,
                    fontFamily: "Poppins",
                    m: "1em 0",
                  }}
                  variant="contained"
                  color="primary"

                  onClick={() => {
                    return !emailError && login();
                  }}
                  id="logInButton"
                >
                  Ingresar
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    fontSize: 15,
                    width: 310,
                    height: 50,
                    borderRadius: "25px",
                    fontFamily: "Poppins",
                    mb: "1em",
                  }}
                  onClick={() => setAuthState("SIGNUP")}
                  id="forgotPasswordButton"
                >
                  Registrarse
                </Button>
                <Button
                  fullWidth
                  color="primary"
                  className={classes.forgotPasswordButton}
                  onClick={() => setAuthState("FORGOT_PASSWORD")}
                  id="forgotPasswordButton"
                >
                  Recuperar contraseña
                </Button>
              </Grid>
              <Grid item xs={1} />
            </Grid>
          </Stack>

          <Terms open={openTerms} user={user} handleClose={handleCloseTerms} />
          <div className={classes.paper}>
            <Snackbar
              open={openError}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity="error">
                {errorMessage}
              </Alert>
            </Snackbar>
            <Snackbar
              open={openWarning}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity="warning">
                Please enter a valid email and password
              </Alert>
            </Snackbar>
          </div>
        </Container>
      </MediaQuery>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.white.main,
    borderRadius: 20,
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.white.main,
  },
  title: {
    color: theme.palette.primary.main,
    fontFamily: "Montserrat Bold",
    margin: theme.spacing(0, 0, 3),
    padding: "2em 0 0 0",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    fontSize: 15,
    width: 310,
    height: 50,
    borderRadius: 22,
    fontFamily: "Montserrat Bold",
  },
  forgotPasswordButton: {
    textAlign: "right",
    fontSize: 10,
    margin: theme.spacing(0, 0, 2),
    fontFamily: "Montserrat Light",
  },
}));

LoginRebrand.propTypes = {
  triggerSessionValidation: PropTypes.func,
  setAuthState: PropTypes.func,
  setLocalUser: PropTypes.func,
  setUserInfo: PropTypes.func,
};
