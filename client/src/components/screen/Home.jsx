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

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";

const Body = () => {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
    return () => {};
  }, []);

  return loading ? (
    <Box component="div" className="loading-box">
      <CircularProgress />
    </Box>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <Grid container justify="center" style={{ margin: "2vh auto" }}>
      {products.map((data) => (
        <Grid item xs={5} sm={4} md={3} key={data._id}>
          <Card className="card">
            <Box
              component={Link}
              to={`product/${data._id}`}
              className="mediaBox"
            >
              <img src={data.image} alt={data.name} className="media" />
            </Box>
            <CardContent>
              <Typography
                component={Link}
                to={`product/${data._id}`}
                className="product-name"
              >
                {data.name}
              </Typography>
              <Typography className="product-price">{`$${data.price}`}</Typography>
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
        </Grid>
      ))}
    </Grid>
  );
};

export default Body;
