"use client";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // ✅ prevent page reload

    const data = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      username: data.get("username"),
      password: data.get("password"),
      redirect: false,
    });

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 450,
        mx: "auto",
        mt: 12,
        px: 3,
      }}
    >
      <Card
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{
            mb: 3,
            textAlign: "center",
            fontWeight: 600,
            fontSize: "clamp(1.8rem, 5vw, 2.2rem)",
          }}
        >
          Sign In
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <FormControl fullWidth>
            <FormLabel htmlFor="username">Username</FormLabel>
            <TextField
              id="username"
              name="username"
              type="text"
              placeholder="e.g. rahul1723"
              required
              fullWidth
              variant="outlined"
              autoFocus
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              id="password"
              name="password"
              type="password"
              placeholder="••••••"
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 1 }}
          >
            Sign In
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
