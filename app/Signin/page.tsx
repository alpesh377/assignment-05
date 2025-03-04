'use client'
import { Button, Container, CssBaseline, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { DefaultValues } from "react-hook-form";
import { signinSchema, signupSchema } from "../schme";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import bcrypt from "bcryptjs";

export default function SignIn() {

    const defaultValues: DefaultValues<formData> = {
        email: "",
        password: "",
    };

    const comparePassword = (password : string)=>{
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        return bcrypt.compare(password,users.password)
    }

    type formData = z.infer<typeof signinSchema>;
    const {register, handleSubmit, formState:{errors, touchedFields}} = useForm({
        resolver : zodResolver(signinSchema)
    })

    const onSubmit = (data : formData)=>{
        const users = JSON.parse(localStorage.getItem("users") || "[]")
        const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
        const userWithToken={
            ...data,
            token
        }

        users.push(userWithToken)
        localStorage.setItem("uses", JSON.stringify(users));
    }

    const logout = () =>{
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        
    }


  return (
    <Container>
      <CssBaseline enableColorScheme />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" gutterBottom>
          Signin
        </Typography>

        

        
        
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          defaultValue={defaultValues.email}
          {...register("email")}
          error={!!errors.email && touchedFields.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          defaultValue={defaultValues.password}
          {...register("password")}
          error={!!errors.password && touchedFields.password}
          helperText={errors.password?.message}
        />
       
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  )
}
