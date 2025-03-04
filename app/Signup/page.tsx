'use client'

import { Button, Container, CssBaseline, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { DefaultValues } from "react-hook-form";
import { signupSchema } from "../schme";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import bcrypt from "bcryptjs";



export default function SignUp() {
  type formData = z.infer<typeof signupSchema>;
  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const encryptPassword = async (password:string) =>{
    const encryptedpassword = await bcrypt.hash(password, 10);
    return encryptedpassword;
  }
  const defaultValues: DefaultValues<formData> = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    mobileNumber: "",
  };

  const onSubmit = async (data: formData) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    const emailExists = users.some((user:any) => user.email  === data.email)
    
    if(emailExists){
        throw new Error("User already Exists")
    }

    const encryptedData = {
      ...data,
      password : encryptPassword(data.password)
    }

    users.push(encryptedData);
    localStorage.setItem("uses", JSON.stringify(users));
    
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
  };
  return (
    <Container>
      <CssBaseline enableColorScheme />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" gutterBottom>
          Signup
        </Typography>

        <TextField
          label="First name"
          fullWidth
          margin="normal"
          defaultValue={defaultValues.firstname}
          error={!!errors.firstname && touchedFields.firstname}
          {...register("firstname")}
          helperText={errors.firstname?.message}
        />

        <TextField
          label="Last name"
          type="text"
          fullWidth
          margin="normal"
          defaultValue={defaultValues.lastname}
          {...register("lastname")}
          error={!!errors.lastname && touchedFields.lastname}
          helperText={errors.lastname?.message}
        />
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
        <TextField
          label="Mobile Number"
          fullWidth
          margin="normal"
          {...register("mobileNumber")}
          error={!!errors.mobileNumber && touchedFields.mobileNumber}
          helperText={errors.mobileNumber?.message}
        />

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
}
