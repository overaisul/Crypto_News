import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Homepage from "./Pages/Homepage";
import Coinpage from "./Pages/Coinpage";
import { styled } from "@mui/material/styles";
import { CryptoContext } from "./CryptoContext";
import { useEffect, useState } from "react";

const AppContainer = styled("div")(() => ({
  backgroundColor: "#14161a",
  color: "white",
}));

function App() {
  const [currency, setCurrency] = useState("bdt");
  const [symbol, setSymbol] = useState("৳");

  useEffect(() => {
    if (currency === "bdt") setSymbol("৳");
    if (currency === "usd") setSymbol("$");
  }, [currency]);

  return (
    <CryptoContext.Provider
      value={{ currency, setCurrency, symbol, setSymbol }}
    >
      <AppContainer>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/coins/:id" element={<Coinpage />} />
        </Routes>
      </AppContainer>
    </CryptoContext.Provider>
  );
}

export default App;
