import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useProduct } from "../context/ProductContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const { categories, fetchProductsByCategory } = useProduct();
  const location = useLocation();

  const isCartOrProductPage =
    location.pathname.includes("/cart") ||
    location.pathname.includes("/product");

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#2874f0" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ textDecoration: "none", color: "white" }}
          onClick={() => fetchProductsByCategory("")}
        >
          E-Commerce
        </Typography>

        <Box>
          {!isCartOrProductPage && (
            <>
              <Button
                color="inherit"
                onClick={() => fetchProductsByCategory("")}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  color="inherit"
                  onClick={() => fetchProductsByCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </>
          )}

          <Button color="inherit" component={Link} to="/cart">
            Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
          </Button>

          {user ? (
            <>
              {user.isAdmin && (
                <Button color="inherit" component={Link} to="/admin">
                  Admin
                </Button>
              )}
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
