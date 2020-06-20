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

  return (
    <>
      <TableContainer style={{ maxHeight: "75vh" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">Price($)/unit</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Total Price($)</TableCell>
              <TableCell align="right">Action</TableCell>
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
                <TableCell align="right">{item.qty}</TableCell>
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
      </TableContainer>
      <Button variant="contained">Confirm Order</Button>
    </>
  );
};

export default CartScreen;
