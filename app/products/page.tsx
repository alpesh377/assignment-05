"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Grid2, Pagination } from "@mui/material";
import ProductCard from "@/components/Card";
import { useRouter } from "next/navigation";

export default function Products() {
  const router = useRouter()
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0)
  const [page, setPage] = useState(1)
  const limit = 8

  const handleChange = (event:any, value:any) =>{
    console.log("Value : ", value)
    setPage(value);
  }
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
        `https://dummyjson.com/products?skip=${(page-1)*limit}&limit=${limit}`
      );
      console.log(res);
      setProducts(res.data.products);
      setTotalPage(Math.ceil(res.data.total/8))
    };

    getData();
  }, [page]);

  // console.log(products)

  return (
    <>
      <Grid
        container
        spacing={3}
        marginTop={3}
        p={2}
      >
        {products.map((product:any) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard
              key={product.id}
              id={product.id}
              thumbnail ={product.thumbnail}
              title = {product.title}
              description = {product.description}
              category = {product.category}
              brandName = {product.brand}
              rating={product.rating}
              price={product.price}
              discountPercentage={product.discountPercentage}
            />
          </Grid>
        ))}
      </Grid>
      <Pagination count={totalPage} page={page} onChange={handleChange}  sx={{display:"flex", alignItems:"center", justifyContent:"center", mt:4}} size="large" />
    </>
  );
}
