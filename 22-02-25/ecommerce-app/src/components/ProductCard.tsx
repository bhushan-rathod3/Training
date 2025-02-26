import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Rating,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  rating?: { rate?: number };
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  return (
    <Card sx={{ maxWidth: 300, m: 2 }}>
      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.title}
          sx={{
            objectFit: "contain",
            padding: "10px",
            backgroundColor: "#f8f8f8",
          }}
        />
      </Link>
      <CardContent>
        <Typography variant="h6" noWrap>
          {product.title}
        </Typography>
        <Rating value={product.rating?.rate || 0} readOnly />
        <Typography variant="h6" fontWeight="bold">
          ${product.price}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 1, width: "100%" }}
          onClick={(e) => {
            e.stopPropagation();
            if (!user) {
              alert("Please login first to add items to the cart!");
            } else {
              addToCart(product);
            }
          }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
