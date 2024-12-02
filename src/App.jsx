import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Homepage from "./Pages/Homepage";
import Coinpage from "./Pages/Coinpage";
import { styled } from "@mui/material/styles";

const AppContainer = styled("div")(() => ({
  backgroundColor: "#14161a",
  color: "white",
}));

function App() {
  return (
    <AppContainer>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/coins/:id" element={<Coinpage />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
