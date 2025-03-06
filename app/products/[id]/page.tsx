import axios from "axios";
import {
  Button,
  Card,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import ProductDetail from "@/components/ProductDetail";

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
  stock: string;
  images: string[];
  [key: string]: any;
}
interface ProductPageProp {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProp) {
  const getData = async (id: string) => {
    const res = await axios.get(`https://dummyjson.com/products/${id}`);
    console.log(res.data);
    return res.data;
  };
  const products = await getData(params.id);
  // useEffect(() => {
  //   const email = localStorage.getItem("loggedInUser");
  //   const token = localStorage.getItem("token");

  //   if (!email) {
  //     router.push("signin");
  //     return;
  //   }
  //   const users = JSON.parse(localStorage.getItem("users") || "[]");
  //   const user = users.find((u: any) => u.email === email);

  //   if (!user) {
  //     router.push("signin");
  //     return;
  //   }
  // }, [router]);
  // useEffect(() => {
  //     const getData = async (id:string) => {
  //       const res = await axios.get(
  //         `https://dummyjson.com/products/${id}`
  //       );
  //       console.log(res.data);
  //       setProducts(res.data);

  //     };

  //   }, [id]);

  // console.log(products)
  if (!products) {
    return <Typography>No products Found</Typography>;
  }
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <ProductDetail product={products} />
    </Container>
  );
}
