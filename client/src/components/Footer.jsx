import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  footer: {
    position: "absolute",
    left: 0,
    bottom: 0,
    overflow: "hidden",
    width: "100%",
    height: "10vh",
    background: "#1d2736",
    display: "flex",
    justifyContent: "center", //horizontal
    alignItems: "center", //vertical
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Box component="footer" className={classes.footer}>
      <Typography style={{ color: "white" }}>
        © Copyright 2020 All right reserved
      </Typography>
    </Box>
  );
};

export default Footer;
