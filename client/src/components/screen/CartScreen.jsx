import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Hidden,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = (props) => {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    return () => {};
  }, []);

  const removeCartHandle = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const confirmHandle = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return cartItems.length > 0 ? (
    <>
      <TableContainer style={{ maxHeight: "75vh" }}>
        <Hidden xsDown>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <Hidden xsDown>
                  <TableCell align="right">Image</TableCell>
                </Hidden>
                <TableCell align="right">Price($)/unit</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Total Price($)</TableCell>
                <TableCell align="right">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="right">
                    <img
                      style={{ height: "10vh", width: "auto" }}
                      src={item.image}
                      alt={item.name}
                    />
                  </TableCell>
                  <TableCell align="right">{item.price}</TableCell>
                  <TableCell align="right">
                    <FormControl>
                      <Select
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(addToCart(item.product, e.target.value))
                        }
                      >
                        {[...Array(item.inStock).keys()].map((x) => (
                          <MenuItem key={x + 1} value={x + 1}>
                            {x + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell align="right">{item.qty * item.price}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => removeCartHandle(item.product)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell rowSpan={1} />
                <TableCell colSpan={3} align="right">
                  Total
                </TableCell>
                <TableCell align="right">
                  {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Hidden>
        <Hidden smUp>
          <TableBody>
            {cartItems.map((item, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  <img
                    style={{ height: "10vh", width: "auto" }}
                    src={item.image}
                    alt={item.name}
                  />
                </TableCell>
                <TableCell
                  align="right"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  {item.name}
                  <Box component="div">
                    <FormControl>
                      <Select
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(addToCart(item.product, e.target.value))
                        }
                      >
                        {[...Array(item.inStock).keys()].map((x) => (
                          <MenuItem key={x + 1} value={x + 1}>
                            {x + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <IconButton onClick={() => removeCartHandle(item.product)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell colSpan={2} align="right">
                  {item.qty * item.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Hidden>
      </TableContainer>

      <Box
        style={{
          marginTop: "1vh",
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button variant="contained" onClick={confirmHandle}>
          Confirm Order
        </Button>
      </Box>
    </>
  ) : (
    <Box
      component="div"
      style={{
        height: "75vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>Your Cart is Empty!</Typography>
    </Box>
  );
};

export default CartScreen;
