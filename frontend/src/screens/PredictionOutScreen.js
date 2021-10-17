import getSymbolFromCurrency from "currency-symbol-map";
import React, { useEffect, useState } from "react";
import { Alert, Col, Row, Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import ChartProg from "../components/ChartProg";
import Loader from "../components/Loader";

const PredictionOutScreen = () => {
  const [coin, setCoin] = useState({});

  const cryptoCoins = useSelector(state => state.cryptoCoins);
  const { crypto_coin, crypto_pred } = cryptoCoins;

  const cryptoCoinsList = useSelector(state => state.cryptoCoinsList);
  const { cryptolist } = cryptoCoinsList;

  const history = useHistory();
  const { state } = useLocation();

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
    <>
      {
        crypto_pred ? (
          <div>

            {crypto_pred && crypto_pred.length ? (
              <>
                <Row className="coin-info">
                  <Col md="9">
                    <Row>
                      <Col md="auto">
                        <img src={coin?.image} alt="" />
                      </Col>
                      <Col md="auto">
                        <h2>
                          {coin?.name}{" "}
                          <span className="symbol">({coin?.symbol})</span>
                        </h2>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="auto">
                        <small className="coin-data">
                          Rank #{coin?.market_cap_rank}
                        </small>{" "}
                        &nbsp;
                      </Col>
                      <Col md="auto">
                        <small className="coin-data">Coin</small>
                      </Col>
                      <Col md="auto">
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Alert variant="success">
                  <h3 className="coin-text">
                    Marketcap Value Prediction is → $
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
            <Row>
              <Col md="8">
                <h2 style={{ marginBottom: "14px" }}>{coin?.name} 7day Chart</h2>
                {coin?.price_change_percentage_7d_in_currency < 0 ? (
                  <div style={{ width: "900px", height: "600px" }}>
                    <ChartProg
                      dataprog={coin?.sparkline_in_7d}
                      crypto={coin?.name}
                      legend
                      display
                      color="red"
                      stepped
                      fill={false}
                    />
                  </div>
                ) : (
                  <div>
                    <ChartProg
                      dataprog={coin?.sparkline_in_7d}
                      crypto={coin?.name}
                      legend
                      display
                      color="green"
                      stepped
                      fill={false}
                    />
                  </div>
                )}
              </Col>
              <Col md="4">

                <Row>
                  <h2>Investers Input</h2>
                  <Table>
                    <tr>
                      <td>Input Date</td>
                      <td>
                        <b>
                          {state?.date}
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td>Input Volume</td>
                      <td>
                        <b>
                          {state?.volume}
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td>Input Closing Price</td>
                      <td>
                        <b>
                          {state?.closePrice}
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td>Input Opening Price</td>
                      <td>
                        <b>
                          {state?.openPrice}
                        </b>
                      </td>
                    </tr>
                  </Table>
                </Row>
                <Row>
                  <h2>{coin?.name} Market Data</h2>
                  <Table>
                    <tr>
                      <td>Today's Marketcap</td>
                      <td>
                        <b>
                          {getSymbolFromCurrency("usd")}
                          {coin?.market_cap}
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td>24 Hour Marketcap Change</td>
                      <td>
                        <b>
                          {getSymbolFromCurrency("usd")}
                          {coin?.market_cap_change_24h}
                        </b>
                      </td>
                    </tr>
                    {/* <tr>
                <td>Current Price</td>
                <td>
                  <b>
                    {getSymbolFromCurrency("usd")}
                    {coin?.current_price}
                  </b>
                </td>
              </tr> */}
                  </Table>
                </Row>
              </Col>
            </Row>
          </div>
        ) : (
          <Loader />
        )
      }
    </>


  );
};

export default PredictionOutScreen;

