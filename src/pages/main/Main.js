import * as React from "react";
import "./main.css";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const defaultTheme = createTheme();

export default function SignIn() {
  const [credential, setCredential] = useState({
    username: undefined,
    password: undefined,
  });
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setCredential({
      username: data.get("username"),
      password: data.get("password"),
    });
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credential);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.detaile });

      navigate("/home");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  const { error, dispatch } = useContext(AuthContext);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        sx={{
          backgroundImage:
            'url("https://images.pexels.com/photos/302831/pexels-photo-302831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
          backgroundSize: "cover",

          height: "100vh",
          margin: "0",
          position: "relative",
        }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              position: "relative",
              top: "150px",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              opacity: "0.9",
              boxShadow: " 0 15px 25px rgba(129, 124, 124, 0.2)",
              padding: "20px 20px",
              borderRadius: "5px",
              backdropFilter: "blur(14px)",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {error && <span>{error.message}</span>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, color: "black" }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    href="/register"
                    variant="body2"
                    sx={{
                      textDecoration: "none",
                      color: "black",
                    }}
                    className="guestBtn"
                  >
                    {"Don't have an account? Register"}
                  </Link>
                </Grid>
              </Grid>
              <Grid sx={{ textAlign: "center", pt: "20px" }}>
                <Link
                  href="/home"
                  sx={{
                    textDecoration: "none",
                    color: "black",
                    fontSize: "20px",
                  }}
                  className="guestBtn"
                >
                  {"Continue as guest"}
                </Link>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Grid>
    </ThemeProvider>
  );
}
