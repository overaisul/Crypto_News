import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoContext } from "../CryptoContext";
import { SingleCoin } from "../Config/api";
import styled from "@emotion/styled";
import CoinInfo from "../components/Banner/CoinInfo";
import { Typography } from "@mui/material";
import HTMLReactParser from "html-react-parser/lib/index";

const Coinpage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = useContext(CryptoContext);
  const [loading, setLoading] = useState(false);

  const fetchCoin = async () => {
    const response = await fetch(SingleCoin(id));
    const data = await response.json();
    setCoin(data);
    setLoading(true);
  };

  useEffect(() => {
    fetchCoin();
  }, []);
  const formatNumber = (number) => {
    return number?.toLocaleString("en-US");
  };

  const Container = styled("div")`
    display: flex;
    height: 100vh;
    width: 100%;
    @media (max-width: 768px) {
      flex-direction: column;
      height: 100%;
    }
  `;

  const Section = styled("div")`
    flex: 1;
    margin: 40px;
    justify-content: center;
    @media (max-width: 768px) {
      flex-direction: column;
    }
  `;

  const Sidebar = styled("div")`
    width: 25vw;
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 20px;
    img {
      align-self: center;
    }
    @media (max-width: 768px) {
      width: 100%;
    }
  `;

  const CoinDetails = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  `;

  return (
    <>
      {loading ? (
        <Container>
          <Section>
            <Sidebar>
              <img
                src={coin?.image?.large}
                alt={coin?.name}
                height="200"
                width="200"
              />
              <Typography variant="h4" style={{ fontWeight: "bold" }}>
                {coin?.name}
              </Typography>
              <Typography variant="subtitle2" className="details">
                {coin?.description?.en
                  ? HTMLReactParser(coin.description.en.split(". ")[0] || "")
                  : "Description not available."}
              </Typography>
              <CoinDetails>
                <Typography variant="h6" style={{ color: "#EEBC1D" }}>
                  Rank: {coin?.market_cap_rank}
                </Typography>
                <Typography variant="h6" style={{ color: "#EEBC1D" }}>
                  Current Price: {symbol}{" "}
                  {formatNumber(coin?.market_data?.current_price[currency])}
                </Typography>
                <Typography variant="h6" s style={{ color: "#EEBC1D" }}>
                  Market Cap: {symbol}{" "}
                  {formatNumber(coin?.market_data?.market_cap[currency])}
                </Typography>
              </CoinDetails>
            </Sidebar>
          </Section>

          <Section>
            <CoinInfo coin={coin} currency={currency} symbol={symbol} />
          </Section>
        </Container>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default Coinpage;
