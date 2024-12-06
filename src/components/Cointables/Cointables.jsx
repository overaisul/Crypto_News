import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { CryptoContext } from "../../CryptoContext";

function Cointables() {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = useContext(CryptoContext);
  const [search, setSearch] = useState("");
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": "CG-U4VqSZUd9CryLVzNUaZGTtGz",
    },
  };

  async function fetchCurrency() {
    try {
      console.log(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`
      );
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`,
        options
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const limitedData = data.slice(0, 20);
      console.log(data);
      setTrending(limitedData);
    } catch (error) {
      console.log("Failed to fetch currency data:", error);
    }
  }

  useEffect(() => {
    fetchCurrency();
  }, [currency]);

  return (
    <>
      <Container style={{ textAlign: "center" }}>
        <Typography variant="h3" style={{ margin: 18 }}>
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search By Name"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "white", // Text color
              "& fieldset": {
                borderColor: "white", // Outline color
              },
              "&:hover fieldset": {
                borderColor: "white", // Outline color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "white", // Outline color when focused
              },
            },
            "& .MuiInputLabel-root": {
              color: "white", // Label color
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "white", // Label color when focused
            },
          }}
          style={{ width: "60%", marginBottom: 20 }}
          onChange={(e) => setSearch(e.target.value)}
        ></TextField>
        <TableContainer>
          <Table>
            <TableHead style={{ backgroundColor: "#EEBC1D" }}>
              <TableRow>
                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => {
                  return (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                      }}
                      key={head}
                    >
                      {head}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default Cointables;
