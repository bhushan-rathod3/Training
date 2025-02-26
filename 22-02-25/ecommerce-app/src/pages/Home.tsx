import { useProduct } from "../context/ProductContext";
import { Container, Grid, Typography } from "@mui/material";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const { products } = useProduct();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <Grid container spacing={3}>
        {products.length > 0 ? (
          products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))
        ) : (
          <Typography variant="h6">No products available</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Home;
