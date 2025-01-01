import {
  Container,
  Pagination,
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
import { useNavigate } from "react-router-dom";

function Cointables() {
  const [coins, setCoins] = useState([]);
  const { currency, symbol } = useContext(CryptoContext);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": "CG-U4VqSZUd9CryLVzNUaZGTtGz",
    },
  };

  async function fetchCurrency() {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
        options
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCoins(data);
    } catch (error) {
      console.error("Failed to fetch currency data:", error);
    }
  }

  useEffect(() => {
    fetchCurrency();
  }, [currency]);

  const formatNumber = (number) => {
    return number?.toLocaleString("en-US");
  };

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

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
              color: "white",
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "white",
            },
          }}
          style={{ width: "60%", marginBottom: 20 }}
          onChange={(e) => setSearch(e.target.value)}
        ></TextField>
        <TableContainer>
          <Table>
            <TableHead style={{ backgroundColor: "#EEBC1D" }}>
              <TableRow>
                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                  <TableCell
                    style={{
                      color: "black",
                      fontWeight: "700",
                      textAlign: "center",
                    }}
                    key={head}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {handleSearch()
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row) => {
                  const profit = row.price_change_percentage_24h > 0;

                  return (
                    <TableRow
                      onClick={() => navigate(`/coins/${row.id}`)}
                      key={row.id}
                      style={{
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "#131111",
                        },
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 15,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <span style={{ fontWeight: 500, color: "white" }}>
                            {row?.name}
                          </span>
                          <br />
                          <span
                            style={{
                              textTransform: "uppercase",
                              color: "white",
                              fontSize: 12,
                            }}
                          >
                            {row?.symbol}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell
                        style={{ textAlign: "center", color: "white" }}
                      >
                        {symbol} {formatNumber(row.current_price)}
                      </TableCell>
                      <TableCell
                        style={{
                          color: profit ? "green" : "red",
                          fontWeight: 500,
                          textAlign: "center",
                        }}
                      >
                        {profit && "+"}
                        {row.price_change_percentage_24h?.toFixed(2)}%
                      </TableCell>
                      <TableCell
                        style={{ textAlign: "center", color: "white" }}
                      >
                        {symbol} {formatNumber(row.market_cap)}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          style={{
            backgroundColor: "#EEBC1D",
            padding: 15,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          count={(handleSearch()?.length / 10).toFixed()}
          onChange={(e, value) => {
            setPage(value);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      </Container>
    </>
  );
}

export default Cointables;
