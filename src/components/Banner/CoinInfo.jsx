import { useContext, useEffect, useState } from "react";
import { CryptoContext } from "../../CryptoContext";
import { HistoricalChart } from "../../Config/api";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import styled from "@emotion/styled";
import { chartDays } from "../../Config/data";
import SeclectButton from "./selectButton";
import { data } from "react-router-dom";

function CoinInfo({ coin }) {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);

  const { currency } = useContext(CryptoContext);

  const fetchHistoricalData = async () => {
    const response = await fetch(HistoricalChart(coin.id, days, currency));
    const data = await response.json();
    console.log("data", historicalData);
    setHistoricalData(data.prices);
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [days, currency]);

  const Container = styled("div")`
    width: 65vw;
    height: 100%;
    text-align: center;
    margin-right: 20px;
    @media (max-width: 768px) {
      width: 100%;
    }
  `;
  return (
    <>
      {!historicalData ? (
        <h1>Loading...</h1>
      ) : (
        <Container>
          <Line
            data={{
              labels: historicalData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;

                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  label: `Price (Past ${days} Days) in ${currency}`,
                  data: historicalData.map((coin) => coin[1]),
                  borderColor: "#EEBC1D",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 0,
                },
              },
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            {chartDays.map((day) => (
              <SeclectButton
                key={day.value}
                onCLick={() => setDays(day.value)}
                onSelected={days === day.value}
              >
                {day.label}
              </SeclectButton>
            ))}
          </div>
        </Container>
      )}
    </>
  );
}

export default CoinInfo;
