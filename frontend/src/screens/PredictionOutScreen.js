import React, { useEffect, useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import ChartProg from "../components/ChartProg";

const PredictionOutScreen = () => {
  const [coin, setCoin] = useState({});

  const cryptoCoins = useSelector(state => state.cryptoCoins);
  const { crypto_coin, crypto_pred } = cryptoCoins;

  const cryptoCoinsList = useSelector(state => state.cryptoCoinsList);
  const { cryptolist } = cryptoCoinsList;

  const history = useHistory();

  console.log(coin);

  const getCoin = () => {
    if (cryptolist.length) {
      for (let crypto of cryptolist) {
        if (crypto_coin?.name === crypto?.id) {
          setCoin(crypto);
        }
      }
    }
  };

  useEffect(() => {
    getCoin();
  }, [cryptolist, crypto_coin]);

  return (
    <div>
      {crypto_pred && crypto_pred.length ? (
        <>
          <Alert variant="success">
            <h3 className="coin-text">
              Marketcap Value prediction is → $
              {crypto_pred[0]?.toLocaleString()}
            </h3>
          </Alert>
          <center>
            <Button
              type="submit"
              onClick={() => history.push("/predict")}
              variant="primary"
            >
              ← &nbsp; Go Back to Predict
            </Button>
          </center>
        </>
      ) : (
        <center>
          <Button
            type="submit"
            onClick={() => history.push("/predict")}
            variant="primary"
          >
            ← &nbsp; Go Back to Predict
          </Button>
        </center>
      )}
      <br />
      <br />
      {coin?.price_change_percentage_7d_in_currency < 0 ? (
        <div style={{ width: "900px", height: "600px" }}>
          <ChartProg
            dataprog={coin?.sparkline_in_7d}
            crypto={coin?.name}
            legend
            display
            color="red"
            step
          />
        </div>
      ) : (
        <div style={{ width: "900px", height: "600px" }}>
          <ChartProg
            dataprog={coin?.sparkline_in_7d}
            crypto={coin?.name}
            legend
            display
            color="green"
            step
          />
        </div>
      )}
    </div>
  );
};

export default PredictionOutScreen;

