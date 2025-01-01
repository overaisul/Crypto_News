import styled from "@emotion/styled";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CryptoContext } from "../../CryptoContext";
import AliceCarousel from "react-alice-carousel";

function Carousel() {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = useContext(CryptoContext);
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
      console.log(limitedData);
      setTrending(limitedData);
    } catch (error) {
      console.log("Failed to fetch currency data:", error);
    }
  }

  useEffect(() => {
    fetchCurrency();
  }, [currency]);

  const Carousel = styled("div")(() => ({
    height: "50%",
    display: "flex",
    alignItems: "center",
  }));
  const FlexBox = styled("div")(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  }));

  const items = trending.map((coin, index) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link
        to={`/coins/${coin.id}`}
        key={index}
        style={{ alignItems: "center" }}
      >
        <FlexBox>
          <div>
            <img
              src={coin?.image}
              alt={coin.name}
              height="100"
              style={{ marginBottom: 10 }}
            />
          </div>
          <h3>{coin?.symbol}</h3>
          <span style={{ color: profit ? "green" : "red" }}>
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
          <div>
            <h3>
              {symbol + " "}
              {coin?.current_price.toFixed(2)}
            </h3>
          </div>
        </FlexBox>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    700: {
      items: 4,
    },
  };
  return (
    <>
      <Carousel>
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          responsive={responsive}
          autoPlay
          items={items}
        />
      </Carousel>
    </>
  );
}

export default Carousel;
