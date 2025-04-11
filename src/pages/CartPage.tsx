"use client";

import AuthGuard from "@/component/auth-guard";
import { useGlobalContext } from "@/context/global-context";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

const CartPage = () => {
  const { filteredUserCart } = useGlobalContext();

  return (
    <>
      <AuthGuard>
        <Container sx={{ py: 4 }}>
          <Typography variant="h4" gutterBottom textAlign="center">
            Cart
          </Typography>

          {filteredUserCart?.length > 0 ? (
            <Typography textAlign="center">No cart found.</Typography>
          ) : (
            <Stack spacing={3}>
              {filteredUserCart.map((order, index) => (
                <Card key={order.id} elevation={6}>
                  <CardHeader
                    title={`Cart ID: ${index + 1}`}
                    subheader={`User ID: ${order.userId} • Date: ${new Date(
                      order.date
                    ).toLocaleDateString()}`}
                  />
                  <CardContent>
                    <Typography variant="h6">Products</Typography>
                    <Divider sx={{ my: 1 }} />
                    <Stack spacing={1}>
                      {order.products.map((product, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            px: 1,
                          }}
                        >
                          <Typography>
                            Product ID: {product.productId}
                          </Typography>
                          <Typography>Qty: {product.quantity}</Typography>
                        </Box>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
        </Container>
      </AuthGuard>
    </>
  );
};

export default CartPage;
