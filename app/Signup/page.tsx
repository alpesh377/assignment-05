'use client'

import { Button, Container, CssBaseline, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DefaultValues } from "react-hook-form";
import { signupSchema } from "../schme";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";



export default function SignUp() {

  const router = useRouter();
  const [emailError, setEmailError] = useState("")
  type formData = z.infer<typeof signupSchema>;
  useEffect(()=>{
const email = localStorage.getItem("loggedInUser")
const token = localStorage.getItem("token")
    if(!email && !token){
      router.push("/signup")
    }else{
      router.push("/products")
    }
  },[router])
  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const encryptPassword = async (password:string) =>{
    const encryptedpassword = await bcrypt.hashSync(password);
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
        setEmailError("Email Already Exists")
        return
    }

    setEmailError('')
    const hashed = bcrypt.hashSync(data.password)
    const encryptedData = {
      ...data,
      password : hashed
    }
    users.push(encryptedData);
    localStorage.setItem("users", JSON.stringify(users));
    router.push("/signin")
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
        {
          emailError && (
            <Typography color="error">
              {emailError}
            </Typography>
          )
        }

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
}
