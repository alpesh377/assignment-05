"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { ArrowBack, ShoppingCart } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import dayjs from "dayjs";

interface Product {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  category: string;
  brandName: string;
  rating: number;
  price: number;
  discountPercentage: number;
  stock: number;
  images: string[];
  [key: string]: any;
}

interface ProductProp {
  product: Product | null;
}

export default function ProductDetail({ product }: ProductProp) {
  const router = useRouter();
  console.log({ product });
  console.log("brand", product?.brand);
  const [selectImage, setSelectImage] = useState(product?.images[0]);

  const excludedProperties = [
    "id",
    "thumbnail",
    "title",
    "description",
    "category",
    "brand",
    "rating",
    "price",
    "discountPercentage",
    "stock",
    "images",
    "reviews",
    "meta",
  ];
  if (!product) {
    return <Typography>No products Found</Typography>;
  }

  const otherProp = Object.entries(product).filter(
    ([key]) => !excludedProperties.includes(key)
  );
  console.log("Othere ", otherProp);
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => router.push("/products")}
        sx={{ mb: 1 }}
      >
        Back to Products
      </Button>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 1 }}>
            <CardMedia
              component="img"
              image={selectImage}
              sx={{
                height: { xs: 300, sm: 400, md: 500 },
                objectFit: "contain",
              }}
            />
          </Card>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              overflowX: "auto",
            }}
          >
            {product?.images.map((image: any, index: any) => (
              <Card
                key={index}
                sx={{
                  minWidth: 80,
                  cursor: "pointer",
                }}
                onClick={() => setSelectImage(image)}
              >
                <CardMedia
                  component="img"
                  image={image}
                  sx={{
                    height: 80,
                    objectFit: "cover",
                  }}
                ></CardMedia>
              </Card>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product?.title}
          </Typography>
          <Box display="flex" alignItems="center" mb={1}>
            <Rating
              value={product.rating}
              readOnly
              size="small"
              precision={0.1}
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {product.rating.toFixed(1)}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={2} mb={1}>
            <Chip
              label={product?.category}
              color="primary"
              variant="outlined"
              sx={{ textTransform: "capitalize" }}
            />
            <Chip
              label={product?.brand}
              variant="outlined"
              sx={{ textTransform: "capitalize" }}
            />
            <Chip
              label={`${product?.stock} in stock`}
              variant="outlined"
              color={product.stock > 0 ? "success" : "error"}
            />
          </Box>

          <Box mb={3}>
            <Box display="flex" alignItems="baseline" mb={1}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                $
                {(
                  product.price *
                  (1 - product.discountPercentage / 100)
                ).toFixed(2)}
              </Typography>
              {product?.discountPercentage > 0 && (
                <Typography
                  variant="h6"
                  sx={{ ml: 2, textDecoration: "line-through" }}
                >
                  {product?.price}
                </Typography>
              )}
              <Chip
                label={`${product.discountPercentage.toFixed(0)}% Discount`}
                size="small"
                color="error"
                sx={{ ml: 2 }}
              />
            </Box>
            <Typography variant="body2" color="textSecondary">
              {product.stock > 0 ? "In Stock" : "Out of the stock"}
            </Typography>
          </Box>
          <Typography variant="body1" component="p">
            {product?.description}
          </Typography>
          <Box display="flex" mt={4} mb={4} gap={2}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<ShoppingCart />}
              disabled={product.stock < 0}
            >
              Add to Cart
            </Button>
            <IconButton color="primary" sx={{ border: "1px solid" }}>
              <FavoriteIcon />
            </IconButton>
          </Box>
          <Divider sx={{ my: 3 }} />
        </Grid>

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Specification
        </Typography>
        <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
          <Table>
            <TableBody sx={{ width: "100%" }}>
              <TableRow>
                <TableCell component="th" sx={{ fontWeight: "bold" }}>
                  Brand
                </TableCell>
                <TableCell>{product?.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  component="th"
                  sx={{ fontWeight: "bold", width: "60%" }}
                >
                  category
                </TableCell>
                <TableCell>{product?.category}</TableCell>
              </TableRow>
              {otherProp.map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell component="th" sx={{ fontWeight: "bold" }}>
                    {key.toUpperCase()}
                  </TableCell>
                  <TableCell component="th">
                    {typeof value === "object"
                      ? JSON.stringify(value)
                      : value.toString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h6" marginBottom={4} sx={{ fontWeight: "bold" }}>
          Reviews :
        </Typography>
        {product.reviews.map((review: any, i: any) => (
          <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ maxWidth: 300, flexGrow: 1 }}>
              <CardHeader
                title={review.reviewerName}
                subheader={dayjs(review.date).format("DD/MM/YYYY")}
              />
              <Box display="flex" alignItems="center" marginLeft={2}>
                <Rating
                  value={product.rating}
                  readOnly
                  size="small"
                  precision={0.1}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ ml:1 }}
                >
                  {product.rating.toFixed(1)}
                </Typography>
              </Box>
              <CardContent>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {review.comment}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
