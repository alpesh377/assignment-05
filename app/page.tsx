import Image from "next/image";
import styles from "./page.module.css";
import { Container } from "@mui/material";
import SignUp from "./Signup/page";

export default function Home() {
  return (
    <Container>
      <SignUp/>
    </Container>
  );
}
