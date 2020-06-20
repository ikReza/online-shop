import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../actions/productActions";

const useStyles = makeStyles(() => ({
  media: {
    height: "60vh",
    width: "100%",
  },
  formControl: {
    width: "40%",
  },
}));

const ProductScreen = (props) => {
  const [qty, setQty] = useState(1);
  const classes = useStyles();

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return () => {};
  }, []);

  const handleAddToCart = () => {
    props.history.push(`/cart/${props.match.params.id}?qty=${qty}`);
  };

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
    <Grid
      container
      justify="center"
      style={{ margin: "2vh auto", minHeight: "100%" }}
    >
      <Grid item xs={10} sm={8} md={5}>
        <img src={product.image} alt={product.name} className={classes.media} />
      </Grid>
      <Grid item xs={10} sm={5} md={3}>
        <Box>
          <Typography gutterBottom>{product.name}</Typography>
          <Typography>Price: ${product.price}</Typography>
          <Typography>Details: {product.name}</Typography>
        </Box>
      </Grid>
      <Grid item xs={10} sm={3} md={3}>
        <Box border={1} style={{ padding: "1rem", borderRadius: "2%" }}>
          <Typography>Price: ${product.price}</Typography>
          <Typography>
            Status: {product.inStock > 0 ? "Available" : "Out of Stock"}
          </Typography>
          {product.inStock > 0 ? (
            <FormControl className={classes.formControl}>
              <InputLabel>Qty</InputLabel>
              <Select value={qty} onChange={(e) => setQty(e.target.value)}>
                {[...Array(product.inStock).keys()].map((x) => (
                  <MenuItem key={x + 1} value={x + 1}>
                    {x + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <FormControl className={classes.formControl} disabled>
              <InputLabel>Qty</InputLabel>
              <Select>
                <MenuItem>None</MenuItem>
              </Select>
            </FormControl>
          )}
          {product.inStock > 0 ? (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "1vh" }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          ) : (
            <Button
              variant="contained"
              disabled
              fullWidth
              style={{ marginTop: "1vh" }}
            >
              Add to Cart
            </Button>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProductScreen;
