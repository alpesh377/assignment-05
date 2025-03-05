"use client";

import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DefaultValues } from "react-hook-form";
import { editProfileSchema, signupSchema } from "../schme";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";

export default function EditProfile() {
  const router = useRouter();
  const [emailError, setEmailError] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);
  // const currentUserEmail = localStorage.getItem("loggedInUser");

  type formData = z.infer<typeof editProfileSchema>;
  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
    setValue,
  } = useForm({
    resolver: zodResolver(editProfileSchema),
  });

  useEffect(() => {
    const email = localStorage.getItem("loggedInUser");
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

    setCurrentUser(user);
    setValue("firstname", user.firstname);
    setValue("lastname", user.lastname);
    setValue("email", user.email);
    setValue("mobileNumber", user.mobileNumber);
  }, [setValue, router]);

  const onSubmit = (data: formData) => {

    console.log("in handle function")
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const otherUsers = users.filter((u: any) => u.email === currentUser.email);

    if (otherUsers.some((u: any) => u.email === data.email)) {
      setEmailError("Email Already exists");
      return;
    }

    setEmailError("");
    const updatedUser = users.map((u:any)=> u.email === currentUser.email ? {...u,...data} : u)
    
    localStorage.setItem("users", JSON.stringify(updatedUser));
    localStorage.setItem("loggedInUser", data.email)

    router.push("/products");
  };
  return (
    <Container>
      <CssBaseline enableColorScheme />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" gutterBottom>
          EditProfile
        </Typography>

        <TextField
          label="First name"
          fullWidth
          margin="normal"
          error={!!errors.firstname && touchedFields.firstname}
          {...register("firstname")}
          helperText={errors.firstname?.message}
        />

        <TextField
          label="Last name"
          type="text"
          fullWidth
          margin="normal"
          {...register("lastname")}
          error={!!errors.lastname && touchedFields.lastname}
          helperText={errors.lastname?.message}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          {...register("email")}
          error={!!errors.email && touchedFields.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Mobile Number"
          fullWidth
          margin="normal"
          {...register("mobileNumber")}
          error={!!errors.mobileNumber && touchedFields.mobileNumber}
          helperText={errors.mobileNumber?.message}
        />
        {emailError && <Typography>{emailError}</Typography>}

        <Button type="submit" variant="contained" color="primary">
          Update Details
        </Button>
      </form>
    </Container>
  );
}
