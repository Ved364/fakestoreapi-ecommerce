"use client";

import { IProduct } from "@/types/products";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Pagination,
  Rating,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthGuard from "@/component/auth-guard";
import { useGlobalContext } from "@/context/global-context";
import axios from "axios";

type Props = {
  products: IProduct[];
};

const ProductsPage = (props: Props) => {
  const { products } = props;

  const { userId } = useGlobalContext();

  const searchParams = useSearchParams();

  const router = useRouter();

  const params = new URLSearchParams(searchParams?.toString());

  const productsPerPage = 6;

  const initialPage = Number(params.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginationProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    const updatedQuery = new URLSearchParams(params);
    if (value > 1) {
      updatedQuery.set("page", value.toString());
    } else {
      updatedQuery.delete("page");
    }
    router.push(`?${updatedQuery.toString()}`);
    setCurrentPage(value);
  };

  const handleAddtoCart = async (product: IProduct) => {
    const { id } = product;
    const cart = {
      userId: userId,
      date: new Date().toISOString().split("T")[0],
      products: [{ productId: id, quantity: 1 }],
    };
    const response = await axios.post("https://fakestoreapi.com/carts", cart);
    console.log("Cart posted:", response.data);
    alert("Product added to cart!");
  };

  return (
    <>
      <AuthGuard>
        <Container sx={{ p: "25px" }}>
          <Typography variant="h4" textAlign="center">
            Products
          </Typography>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            gap="25px"
            mt={4}
          >
            {paginationProducts.map((product) => (
              <Card key={product.id} sx={{ width: 345 }} elevation={6}>
                <CardMedia
                  component="img"
                  src={product.image}
                  alt={product.title}
                  height="200px"
                  sx={{ objectFit: "contain" }}
                />
                <CardContent>
                  <Stack
                    spacing={1}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography variant="h6">
                      <Tooltip title={product.title}>
                        <Box
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "250px",
                          }}
                        >
                          {product.title}
                        </Box>
                      </Tooltip>
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "green",
                      }}
                    >
                      <CurrencyRupeeIcon />
                      {product.price}
                    </Typography>
                    <Typography variant="h6">
                      <span style={{ fontWeight: "bold" }}>Category: </span>
                      {product.category}
                    </Typography>
                    <Typography variant="h6">
                      <Tooltip title={product.description}>
                        <Box
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "300px",
                          }}
                        >
                          {product.description}
                        </Box>
                      </Tooltip>
                    </Typography>
                    <Rating
                      name="read-only"
                      value={product.rating.rate}
                      precision={0.5}
                      readOnly
                    />
                    <Button
                      variant="contained"
                      onClick={() => handleAddtoCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
            sx={{ justifySelf: "center", mt: 2 }}
          />
        </Container>
      </AuthGuard>
    </>
  );
};

export default ProductsPage;
