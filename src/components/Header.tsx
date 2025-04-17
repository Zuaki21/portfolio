import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
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
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", backgroundColor: "#fff", height: "100%" }}
    >
      <Typography
        variant="h6"
        sx={{
          my: 2,
          fontFamily: "Cinzel, serif",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Zuaki's Portfolio
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.to} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.to}
              sx={{
                textAlign: "center",
                color: "#333",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontFamily: "Cinzel, serif",
                  fontWeight: "bold",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(200, 200, 200, 0.4)",
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
              flexGrow: { xs: 1, md: 0 },
            }}
          >
            Zuaki's Portfolio
          </Typography>

          <IconButton
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{
              display: { md: "none" },
              color: "#333",
              outline: "none",
              "&:focus": {
                outline: "none",
              },
              "&:active": {
                backgroundColor: "transparent", // ← タップ時の黒背景を防ぐ
              },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.to}
                component={RouterLink}
                to={item.to}
                sx={{
                  position: "relative",
                  color: "#333",
                  fontWeight: "bold",
                  textTransform: "none",
                  fontFamily: "Cinzel, serif",
                  paddingBottom: "4px",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "2px",
                    backgroundColor: "#b8860b",
                    transform: "scaleX(0)",
                    transformOrigin: "center", // ← 中央から伸びるように変更！
                    transition: "transform 0.2s ease-out",
                  },
                  "&:hover::after": {
                    transform: "scaleX(1)",
                  },
                  "&:hover": {
                    color: "#b8860b",
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

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            backgroundColor: "#fff",
            color: "#333",
            boxSizing: "border-box",
            width: 240,
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
