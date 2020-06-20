import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "./Footer";

const useStyles = makeStyles(() => ({
  menuSliderContainer: {
    height: "100%",
    width: "200px",
    background: "white",
    padding: "1rem",
  },
  btn: {
    color: "tomato",
    background: "#1F2833",
    margin: "auto 1vw",
  },
}));

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();

  const sideList = () => (
    <Box
      component="div"
      className={classes.menuSliderContainer}
      onClick={() => setIsOpen(false)}
    >
      <Typography variant="h6" gutterBottom>
        Categories
      </Typography>
      <Divider />
      <List>
        <ListItem>
          <ListItemText primary="Shirt" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Pant" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box component="nav">
      <AppBar position="static" style={{ background: "#1d2736" }}>
        <Toolbar>
          <IconButton onClick={() => setIsOpen(true)}>
            <Menu style={{ color: "white" }} />
          </IconButton>
          <Typography
            variant="h6"
            style={{ flexGrow: 1, textDecoration: "none", color: "tomato" }}
            component={Link}
            to="/"
          >
            Amazona
          </Typography>
          <>
            <Button component={Link} to="/cart" className={classes.btn}>
              Cart
            </Button>
            <Button component={Link} to="/signin" className={classes.btn}>
              Sign In
            </Button>
          </>
          <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
            {sideList()}
            <Footer />
          </Drawer>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
