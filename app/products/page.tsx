"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid2, Pagination } from "@mui/material";
import ProductCard from "@/components/Card";

export default function Products() {
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
    const getData = async () => {
      const res = await axios.get(
        `https://dummyjson.com/products?skip=${(page-1)*limit}&limit=${limit}`
      );
      console.log(res);
      setProducts(res.data.products);
      setTotalPage(Math.ceil(res.data.data.total/8))
    };

    getData();
  }, [page]);

  // console.log(products)

  return (
    <>
      <Grid2
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 3, sm: 8, md: 12 }}
      >
        {products.map((product:any) => (
          <Grid2 key={product.id} size={{ xs: 2, sm: 4, md: 4,lg:5 }}>
            <ProductCard
              key={product.id}
              thumbnail ={product.thumbnail}
              title = {product.title}
              description = {product.description}
              category = {product.category}
              brandName = {product.brand}
              rating={product.rating}
              price={product.price}
              discountPercentage={product.discountPercentage}
            />
          </Grid2>
        ))}
      </Grid2>
      <Pagination count={4} page={page} onChange={handleChange} size="small" />
    </>
  );
}
