"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { changePasswordSchema } from "../schme";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import bcrypt from "bcryptjs";

export default function ChangePassword() {
  const router = useRouter();
  const [passwordError, setPasswordError] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);
  // const currentUserEmail = localStorage.getItem("loggedInUser");

  type formData = z.infer<typeof changePasswordSchema>;
  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
    setValue,
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
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
  }, [router]);

  const onSubmit = async (data: formData) => {
    console.log("in the function ", currentUser.password);
    console.log("in the function ", data.currentPassword);
    if (!currentUser) return;

    const isCurrentPassworValid = await bcrypt.compare(
      data.currentPassword,
      currentUser.password
    );
    console.log("dkfgnk", isCurrentPassworValid);

    if (!isCurrentPassworValid) {
      setPasswordError("Current Password is incorrect...");
      return;
    }
    console.log("HERE");
    setPasswordError("");

    const hashed = bcrypt.hashSync(data.password);
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUser = users.map((u: any) =>
      u.email === currentUser.email ? { ...u, password: hashed } : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUser));

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
          label="current Password"
          type="password"
          fullWidth
          margin="normal"
          error={!!errors.currentPassword && touchedFields.currentPassword}
          {...register("currentPassword")}
          helperText={errors.currentPassword?.message}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...register("password")}
          error={!!errors.password && touchedFields.password}
          helperText={errors.password?.message}
        />
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          {...register("confirmPassword")}
          error={!!errors.confirmPassword && touchedFields.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />

        {passwordError && <Typography>{passwordError}</Typography>}

        <Button type="submit" variant="contained" color="primary">
          Update Password
        </Button>
      </form>
    </Container>
  );
}
