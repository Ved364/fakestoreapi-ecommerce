"use client";

import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { badgeClasses } from "@mui/material";
import { useGlobalContext } from "@/context/global-context";
import Link from "next/link";

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -15px;
    right: -2px;
  }
`;

const Header = () => {
  const { userId, logout, totalQuantityCount } = useGlobalContext();
  return (
    <>
      <AppBar position="static" sx={{ marginBottom: "25px" }}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1, cursor: "pointer" }}>
            <Button
              component={Link}
              href="/"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              FakeStoreApi
            </Button>
          </Typography>
          {userId && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Button
                component={Link}
                href="/cart"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ShoppingCartIcon fontSize="medium" />
                <CartBadge
                  badgeContent={totalQuantityCount}
                  color="secondary"
                  overlap="circular"
                />
              </Button>
              <LogoutIcon onClick={logout} sx={{ cursor: "pointer" }} />
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
