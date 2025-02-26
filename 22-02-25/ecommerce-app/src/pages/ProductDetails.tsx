import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Rating,
} from "@mui/material";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const { data: product, error } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      return response.data;
    },
  });

  if (error) return <Typography>Error fetching product details.</Typography>;
  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              image={product.image}
              alt={product.title}
              sx={{
                objectFit: "contain",
                width: "100%",
                height: "auto",
                padding: "10px",
              }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography variant="h4">{product.title}</Typography>
            <Rating value={product.rating.rate} readOnly />
            <Typography variant="h6" sx={{ mt: 1, fontWeight: "bold" }}>
              ${product.price}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {product.description}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => {
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;
