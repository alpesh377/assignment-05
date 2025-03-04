import React from "react";
import Link from "next/link";
import Card from "@mui/material/Card";
import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";

interface cardProp {
  thumbnail: string;
  title: string;
  description: string;
  category: string;
  brandName: string;
  rating: number;
  price: number;
  discountPercentage: number;
}

const ProductCard: React.FC<cardProp> = (data: cardProp) => {
  return (
    
      <Card>
        <CardMedia
          sx={{ height: 140 }}
          image={data.thumbnail}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {data.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    
  );
};

export default ProductCard;
