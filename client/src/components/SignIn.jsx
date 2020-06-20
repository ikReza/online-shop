import React from "react";
import { Grid, Box, TextField, Button } from "@material-ui/core";

const SignIn = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Box style={{ height: "70vh" }}>
      <Grid container justify="center">
        <Grid item xs={11} sm={7} md={5}>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="dense"
              variant="outlined"
              label="Name"
            />
            <TextField
              fullWidth
              margin="dense"
              variant="outlined"
              label="Email"
              type="email"
            />
            <TextField
              fullWidth
              margin="dense"
              variant="outlined"
              label="Password"
              type="password"
            />
            <Button variant="outlined" fullWidth type="submit">
              Sign In
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignIn;
