import React from "react";
import Link from "next/link";
import Card from "@mui/material/Card";
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Rating,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

interface cardProp {
  id:string;
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

  const router = useRouter()
  const handleProduct = (id:string) =>{
    router.push(`/products/${id}`);
  }
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardActionArea onClick={() => handleProduct(data.id)} >
        <CardMedia
          component="img"
          height="200"
          sx={{objectFit: "contain" }}
          image={data.thumbnail}
          title="green iguana"
        />
        <CardContent sx={{flexGrow:1}}>
          <Typography gutterBottom variant="h6" component="div" flexWrap={"wrap"}>
            {data.title}
          </Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Chip label={data.category} size="small" sx={{mr:1, textTransform: "capitalize"}} />
            <Typography variant="body2" color="text.secondary">
              {data.brandName}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <Rating value={data.rating} readOnly size="small" precision={0.1} />
            <Typography variant="body2" color="text.secondary" sx={{ml:1}}>
              {data.rating.toFixed(1)}
            </Typography>
          </Box>

          <Box display="flex" alignItems="baseline">
            <Typography variant="h6" sx={{fontWeight : "bold"}}>
              ${(data.price * (1-data.discountPercentage/100)).toFixed(2)}
            </Typography>
            {
              data.discountPercentage > 0 && (
                <Typography variant="h6" sx={{ml:1, textDecoration:"line-through"}}>
                  {data.price}
                </Typography>
              )
            }
            <Chip label={`${data.discountPercentage.toFixed(0)}%`} size="small" color="error" sx={{ml:1}} />
          </Box>
        </CardContent>
        
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
