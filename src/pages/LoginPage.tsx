"use client";

import { useGlobalContext } from "@/context/global-context";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import axios from "axios";

type Props = {
  username: string;
};

const LoginPage = () => {
  const { login } = useGlobalContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };
    console.log("Login data:", data);

    const response = await axios.post(
      "https://fakestoreapi.com/auth/login",
      data
    );
    const token = response.data.token;

    if (token) {
      const userResponse = await axios.get("https://fakestoreapi.com/users");
      const allUsers = userResponse.data;
      const loggedUserData = allUsers.find(
        (user: Props) => user.username === data.username
      );
      localStorage.setItem("token", token);
      localStorage.setItem("id", loggedUserData.id);
      login(loggedUserData.id);
    } else {
      console.error("Login failed: No token returned");
    }
  };

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ width: "500px", height: "300px" }}>
          <CardHeader title="Login" sx={{ justifySelf: "center" }} />
          <CardContent
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <TextField
              name="username"
              label="Username"
              placeholder="xyz"
              fullWidth
              required
            />
            <TextField
              name="password"
              type="password"
              label="Password"
              placeholder="........"
              fullWidth
              required
            />
            <Button type="submit" variant="contained">
              Login
            </Button>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default LoginPage;
