'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useParams } from 'next/navigation'
import { Button, Card, CardMedia, Container, Grid } from "@mui/material";

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


export default function ProductPage() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    // console.log("id", id)
    const [products, setProducts] = useState<any>();
    useEffect(() => {
        const email = localStorage.getItem("loggedInUser");
        const token = localStorage.getItem("token")
        
        if (!email) {
          router.push("signin");
          return;
        }
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find((u: any) => u.email === email);
    
        if (!user) {
          router.push("signin");
          return;
        }
      }, [router]);
    useEffect(() => {
        const getData = async () => {
          const res = await axios.get(
            `https://dummyjson.com/products/${id}`
          );
          console.log(res.data);
          setProducts(res.data);
          
        };
    
        getData();
      }, [id]);

      // console.log(products)
  return (
    <Container maxWidth="lg" sx={{py:4}}>
        <ProductDetail product={products} productrating = {products?.rating}/>
    </Container>
  )
}
