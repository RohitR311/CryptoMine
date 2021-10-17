import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import ChartProg from "../components/ChartProg";
import getSymbolFromCurrency from "currency-symbol-map";
import ErrorMessage from "../components/ErrorMessage";
import { Alert, Col, Row, Table } from "react-bootstrap";
import {
  getCoinById,
  getCryptoCoins,
  getFavCoins,
  updateFavCoins,
} from "../actions/coinActions";
import "../styles/CoinScreen.css";
import PredictionInput from "../components/PredictionInput";
import { useHistory } from "react-router";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import StarIcon from "@material-ui/icons/Star";

const CoinScreen = ({ match }) => {
  const cryptoCoins = useSelector((state) => state.cryptoCoins);
  const { crypto_coins } = cryptoCoins;
  const dispatch = useDispatch();

  const [isFav, setIsFav] = useState(false);
  const [predictable, setPredictable] = useState(false);

  const cryptoCoin = useSelector((state) => state.cryptoCoin);
  const { loading, error, crypto } = cryptoCoin;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const history = useHistory();

  const favCoins = useSelector((state) => state.favCoins);
  const { fav_coins } = favCoins;

  const redirectToLogin = () => {
    if (userInfo) dispatch(updateFavCoins(match.params.id));
    else history.push("/login");
  };

  useEffect(() => {
    for (let i of crypto_coins) {
      if (i.name === match.params.id) {
        setPredictable(true);
        break;
      } else setPredictable(false);
    }
  }, [crypto_coins]);

  useEffect(() => {
    if (userInfo) dispatch(getFavCoins());
    dispatch(getCryptoCoins());
  }, [dispatch]);

  console.log(fav_coins);

  useEffect(() => {
    dispatch(getCoinById(match.params.id));
  }, [dispatch, match.params.id]);

  useEffect(() => {
    if (fav_coins.length) {
      for (let fav of fav_coins) {
        if (fav.coin === match.params.id) {
          setIsFav(true);
        } else {
          setIsFav(false);
        }
      }
    }
  }, [match.params.id, fav_coins]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage variant="danger">{error}</ErrorMessage>
      ) : (
        <>
          <Row className="coin-info">
            <Col md="9">
              <Row>
                <Col md="auto">
                  <img src={crypto?.image?.large} alt="" />
                </Col>
                <Col md="auto">
                  <h2>
                    {crypto?.name}{" "}
                    <span className="symbol">({crypto?.symbol})</span>
                  </h2>
                </Col>
                <Col md="auto">
                  <div className="coin-star">
                    {!isFav ? (
                      <StarOutlineIcon onClick={() => redirectToLogin()} />
                    ) : (
                      <StarIcon onClick={() => redirectToLogin()} />
                    )}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="auto">
                  <small className="coin-data">
                    Rank #{crypto?.market_cap_rank}
                  </small>{" "}
                  &nbsp;
                </Col>
                <Col md="auto">
                  <small className="coin-data">Coin</small>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row lg="4" style={{ marginBottom: "30px" }}>
            <Col style={{ padding: "10px" }}>
              <div
                style={{
                  backgroundColor: "#E2E5E4",
                  padding: "10px",
                  borderRadius: "15px",
                }}
              >
                <Row>
                  <h4>Market Cap</h4>
                </Row>
                <Row>
                  <p style={{ textAlign: "left" }}>
                    {getSymbolFromCurrency("usd")}
                    {crypto?.market_data?.market_cap?.usd?.toLocaleString()}
                  </p>
                </Row>
              </div>
            </Col>
            <Col style={{ padding: "10px" }}>
              <div
                style={{
                  backgroundColor: "#E2E5E4",
                  padding: "10px",
                  borderRadius: "15px",
                }}
              >
                <Row>
                  <h4>Volume</h4>
                </Row>
                <Row>
                  <p style={{ textAlign: "left" }}>
                    {getSymbolFromCurrency("usd")}
                    {crypto?.market_data?.total_volume?.usd?.toLocaleString()}
                  </p>
                </Row>
              </div>
            </Col>
            <Col style={{ padding: "10px" }}>
              <div
                style={{
                  backgroundColor: "#E2E5E4",
                  padding: "10px",
                  borderRadius: "15px",
                }}
              >
                <Row>
                  <h4>All Time High</h4>
                </Row>
                <Row>
                  <p style={{ textAlign: "left" }}>
                    {getSymbolFromCurrency("usd")}
                    {crypto?.market_data?.ath?.usd?.toLocaleString()}
                  </p>
                </Row>
              </div>
            </Col>
            <Col style={{ padding: "10px" }}>
              <div
                style={{
                  backgroundColor: "#E2E5E4",
                  padding: "10px",
                  borderRadius: "15px",
                }}
              >
                <Row>
                  <h4>All Time Low</h4>
                </Row>
                <Row>
                  <p style={{ textAlign: "left" }}>
                    {getSymbolFromCurrency("usd")}
                    {crypto?.market_data?.atl?.usd?.toLocaleString()}
                  </p>
                </Row>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="8" style={{ paddingRight: "40px" }}>
              <Row>
                <h3>{crypto?.name} to USD</h3>
                {crypto?.market_data?.price_change_percentage_7d < 0 ? (
                  <ChartProg
                    dataprog={crypto?.market_data?.sparkline_7d}
                    crypto={crypto?.name}
                    color="red"
                    legend={true}
                  />
                ) : (
                  <ChartProg
                    dataprog={crypto?.market_data?.sparkline_7d}
                    crypto={crypto?.name}
                    color="green"
                    legend={true}
                  />
                )}
              </Row>
              {crypto?.description?.en == "" ? (
                <></>
              ) : (
                <Row style={{ marginTop: "10px" }}>
                  <h3>
                    What is {crypto?.name}{" "}
                    <span className="symbol-desc">({crypto?.symbol})?</span>
                  </h3>
                  <br />
                  <p className="coin-description">
                    {crypto?.description?.en.split(".", 6)}.
                  </p>
                </Row>
              )}
            </Col>
            <Col md="4">
              <Row>
                <Alert variant="info">
                  <h2>
                    Price : {getSymbolFromCurrency("usd")}
                    {crypto?.market_data?.current_price?.usd?.toLocaleString()}
                  </h2>
                </Alert>
              </Row>
              <Row>
                <h2>{crypto?.name} Stats</h2>
                <Table>
                  <tr>
                    <td>24 Hour Price Change</td>
                    <td>
                      <b>
                        {getSymbolFromCurrency("usd")}
                        {crypto?.market_data?.price_change_24h}
                      </b>
                    </td>
                  </tr>
                  <tr>
                    <td>Daily High</td>
                    <td>
                      <b>
                        {getSymbolFromCurrency("usd")}
                        {crypto?.market_data?.high_24h?.usd?.toLocaleString()}
                      </b>
                    </td>
                  </tr>
                  <tr>
                    <td>Daily Low</td>
                    <td>
                      <b>
                        {getSymbolFromCurrency("usd")}
                        {crypto?.market_data?.low_24h?.usd?.toLocaleString()}
                      </b>
                    </td>
                  </tr>
                  <tr>
                    <td>Total supply</td>
                    <td>
                      <b>
                        {crypto?.market_data?.total_supply?.toLocaleString()}{" "}
                        <span className="symbol">{crypto?.symbol}</span>
                      </b>
                    </td>
                  </tr>
                  <tr>
                    <td>Total Volume</td>
                    <td>
                      <b>
                        {getSymbolFromCurrency("usd")}
                        {crypto?.market_data?.total_volume?.usd?.toLocaleString()}
                      </b>
                    </td>
                  </tr>
                  <tr>
                    <td>24 Hour Marketcap change</td>
                    <td>
                      <b>
                        {getSymbolFromCurrency("usd")}
                        {crypto?.market_data?.market_cap_change_24h}
                      </b>
                    </td>
                  </tr>
                  <tr>
                    <td>Community Score</td>
                    <td>
                      <b>{crypto?.community_score}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>Liquidity Score</td>
                    <td>
                      <b>{crypto?.liquidity_score}</b>
                    </td>
                  </tr>
                </Table>
              </Row>
              <Row>
                {predictable ? <PredictionInput coin_id={crypto?.id} /> : null}
              </Row>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default CoinScreen;
