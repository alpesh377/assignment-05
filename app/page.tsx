'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { Box} from "@mui/material";
import SignUp from "./signup/page";
import { useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Appbar from "@/components/Appbar";
const getLoggedInUser = () => localStorage.getItem("token")
const logoutUser = () =>{
  localStorage.removeItem("token")
  localStorage.removeItem("loggedInUser")
}

export default function Home() {

  return (
    <Box flexGrow={1}>
      <SignUp/>
    </Box>
  );
}
