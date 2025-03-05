"use client";
import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { DefaultValues } from "react-hook-form";
import { signinSchema, signupSchema } from "../schme";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();

  const [emailError, setEmailError] = useState("");
  const [loginError, setLoginError] = useState("");
  const defaultValues: DefaultValues<formData> = {
    email: "",
    password: "",
  };

  type formData = z.infer<typeof signinSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = (data: formData) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((user: any) => user.email === data.email);

    // console.log("gngngjnfjkn", user);
    if (!user) {
      setEmailError("User doesn't exists");
      return;
    }

    const isMatch = bcrypt.compareSync(data.password, user.password);
    if (!isMatch) {
      setLoginError("Incorrect Password");
      return;
    }

    setLoginError("");
    const token =
      Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem("token", token);
    localStorage.setItem("loggedInUser", data.email);

    router.push("/products");
  };

  

  return (
    <Container component="main" maxWidth="xs">
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
  );
}
