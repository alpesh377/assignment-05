'use client'
import { Box, Button, Container, CssBaseline, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const getLoggedInUser = () => localStorage.getItem("loggedInUser")
const logoutUser = () =>{
    localStorage.removeItem("token")
    localStorage.removeItem("loggedInUser")
}

export default function Dashboard() {
    const router = useRouter()

    useEffect(()=>{
        const email = getLoggedInUser();
        if(!email){
            router.push("/signin")
            return
        }
    },[router])

    const handleEditProfile = () =>{
        router.push("/editprofile");
    }
    const handleEditProducts = () =>{
        router.push("/products");
    }
    const handleLogout = () =>{
        logoutUser()
        router.push("/signin");
    }

    const currentEmail = getLoggedInUser();
    if(!currentEmail){
        return null;
    }
  return (
    <Container>
        <CssBaseline enableColorScheme />
        <Box sx={{textAlign:"center",mt:4}}>
            <Typography variant='h4' gutterBottom>
                Dashboard
            </Typography>
            <Typography variant='h4' gutterBottom>
                Welcome, {currentEmail}
            </Typography>
            <Box sx={{
                display:"flex",
                justifyContent:"center",
                gap:2,
                mt:4
            }}>
                <Button
                variant='contained'
                color='primary'
                onClick={handleEditProfile}
                >
                    Edit Profile
                </Button>
                <Button
                variant='contained'
                color='primary'
                onClick={handleEditProducts}
                >
                    Product List
                </Button>
                <Button
                variant='contained'
                color='primary'
                onClick={handleLogout}
                >
                    Logout
                </Button>
            </Box>
        </Box>
    </Container>
  )
}
