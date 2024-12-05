import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import {
  AppBar,
  Container,
  createTheme,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CryptoContext } from "../CryptoContext";
const Title = styled("div")(() => ({
  flex: 1,
  color: "gold",
  fontWeight: "bolder",
  cursor: "pointer",
}));
function Header() {
  const { currency, setCurrency } = useContext(CryptoContext);
  const navigator = useNavigate();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Title>
              <Typography
                onClick={() => navigator("/")}
                fontWeight="bolder"
                variant="h6"
              >
                Crypto News
              </Typography>
            </Title>
            <Select
              value={currency}
              variant="outlined"
              onChange={(e) => {
                setCurrency(e.target.value);
              }}
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
                color: "black",
                backgroundColor: "white",
              }}
            >
              <MenuItem value={"usd"}>USD</MenuItem>
              <MenuItem value={"bdt"}>BDT</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
