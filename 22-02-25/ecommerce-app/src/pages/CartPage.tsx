import { useCart } from "../context/CartContext";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CartPage = () => {
  const { cart, addToCart, removeFromCart, clearCart, removeItem } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert("You need to login to access the cart!");
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Your Cart</Typography>
      {cart.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        cart.map((item) => (
          <Card
            key={item.id}
            sx={{
              my: 2,
              display: "flex",
              alignItems: "center",
              gap: 2,
              padding: 2,
            }}
          >
            <CardMedia
              component="img"
              image={item.image}
              alt={item.title}
              sx={{ width: 80, height: 80, objectFit: "contain" }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6">{item.title}</Typography>
              <Typography variant="body1" color="textSecondary">
                ${item.price.toFixed(2)}
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addToCart(item)}
                >
                  +
                </Button>
                <Typography sx={{ minWidth: "30px", textAlign: "center" }}>
                  {item.quantity}
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => removeFromCart(item.id)}
                >
                  -
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => removeItem(item.id)}
                  sx={{ ml: 1 }}
                >
                  Remove
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))
      )}
      {cart.length > 0 && (
        <>
          <Typography variant="h5" sx={{ mt: 2 }}>
            Total: $
            {cart
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="success"
            sx={{ mt: 2 }}
            onClick={clearCart}
          >
            Checkout
          </Button>
        </>
      )}
    </Container>
  );
};

export default CartPage;
