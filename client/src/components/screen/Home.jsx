import React, { useEffect } from "react";
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";

const useStyles = makeStyles(() => ({
  card: { background: "whitesmoke", width: "80%", margin: "2vh auto" },
  mediaBox: {
    display: "flex",
    justifyContent: "center",
  },
  media: {
    height: "30vh",
    width: "80%",
  },
}));

const Body = () => {
  const classes = useStyles();

  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
    return () => {};
  }, []);

  return loading ? (
    <Box
      component="div"
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        marginTop: "10vh",
      }}
    >
      <CircularProgress />
    </Box>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <Grid container justify="center" style={{ margin: "2vh auto" }}>
      {products.map((data) => (
        <Grid item xs={5} sm={4} md={3} key={data._id}>
          <Box
            style={{
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Card className={classes.card}>
              <Box
                component={Link}
                to={`product/${data._id}`}
                className={classes.mediaBox}
              >
                <img
                  src={data.image}
                  alt={data.name}
                  className={classes.media}
                />
              </Box>
              <CardContent>
                <Typography
                  component={Link}
                  to={`product/${data._id}`}
                  style={{ color: "tomato" }}
                >
                  {data.name}
                </Typography>
                <Typography
                  style={{ fontWeight: "bold" }}
                >{`$${data.price}`}</Typography>
                <Box component="fieldset" borderColor="transparent">
                  <Rating
                    name="simple-controlled"
                    value={data.rating}
                    precision={0.5}
                  />
                </Box>
                <Typography>{data.reviews}</Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default Body;
