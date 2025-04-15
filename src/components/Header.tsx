// Header.tsx
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About Me", to: "/aboutme" },
  { label: "Products", to: "/products" },
  { label: "Articles", to: "/articles" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(200, 200, 200, 0.3)",
        zIndex: 1000,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#333",
            fontFamily: "Cinzel, serif",
            letterSpacing: 1,
          }}
        >
          Zuaki's Portfolio
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          {navItems.map((item) => (
            <Button
              key={item.to}
              component={RouterLink}
              to={item.to}
              sx={{
                color: "#333",
                fontWeight: "bold",
                textTransform: "none",
                fontFamily: "Cinzel, serif",
                "&:hover": {
                  color: "#b8860b",
                  borderBottom: "2px solid #b8860b",
                  backgroundColor: "transparent",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
