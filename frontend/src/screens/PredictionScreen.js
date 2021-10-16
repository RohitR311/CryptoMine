import React, { useState, useEffect } from "react";
import "../styles/HomeScreen.css";
import { Form, Table } from "react-bootstrap";
import {
  getCryptoCoins,
  getFavCoins,
  listCryptoCoins,
} from "../actions/coinActions";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import SelectCurrency from "react-select-currency";
import Tabs from "../components/Tabs";
import Prediction from "../components/Prediction";

function PredictionScreen() {
  const [search, setSearch] = useState("");
  const [currencyCode, setCurrencyCode] = useState("USD");
  const dispatch = useDispatch();
  const cryptoCoinsList = useSelector((state) => state.cryptoCoinsList);
  const { error, loading, cryptolist } =
    cryptoCoinsList;

  const favCoins = useSelector((state) => state.favCoins);
  const { fav_coins } = favCoins;

  const cryptoCoins = useSelector((state) => state.cryptoCoins);
  const { crypto_coins } =
    cryptoCoins;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [sortType, setSortType] = useState("Asc");
  const [filteredCoins, setFilteredCoins] = useState([]);

  useEffect(() => {
    if (userInfo) dispatch(getFavCoins());
  }, [dispatch, userInfo]);

  useEffect(() => {
    dispatch(getCryptoCoins());
  }, []);

  useEffect(() => {
    if (crypto_coins.length)
      dispatch(listCryptoCoins(currencyCode, crypto_coins));
  }, [dispatch, currencyCode, crypto_coins]);

  useEffect(() => {
    for (let coin of cryptolist) {
      coin["isFav"] = false;
    }
    setFilteredCoins(cryptolist);
  }, [userInfo, fav_coins, cryptolist]);

  useEffect(() => {
    let filterCoins = cryptolist.filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );

    if (fav_coins.length) {
      for (let fav of fav_coins) {
        for (let coin of filterCoins) {
          if (fav.coin === coin.id) {
            coin["isFav"] = true;
          }
        }
      }
    }

    setFilteredCoins(filterCoins);
  }, [cryptolist, search, fav_coins]);

  const columns = [
    "market_cap_rank",
    "name",
    "current_price",
    "market_cap",
    "total_volume",
  ];

  const sortColumn = (i) => {
    let sortKey = columns[i];
    let newFilteredCoins = [...filteredCoins];
    if (sortType === "Asc") {
      newFilteredCoins.sort((a, b) => {
        const relValA = a[sortKey];
        const relValB = b[sortKey];

        if (relValA < relValB) return -1;
        if (relValA > relValB) return 1;
        return 0;
      });
      setSortType("Desc");
    } else {
      newFilteredCoins.sort((a, b) => {
        const relValA = a[sortKey];
        const relValB = b[sortKey];

        if (relValA > relValB) return -1;
        if (relValA < relValB) return 1;
        return 0;
      });
      setSortType("Asc");
    }
    setFilteredCoins(newFilteredCoins);
  };

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h2 className="coin-text">Cryptocurrency Market Cap Prediction Page</h2>
        <p className="coin-global">
          The total available cryptocurrencies for prediction are{" "}
          <span className="coin-percent green">{crypto_coins.length}</span>.
        </p>
        <Form className="search-box d-flex">
          <Form.Control
            type="text"
            name="q"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            className="search-bar"
          ></Form.Control>
        </Form>
      </div>
      <div
        style={{
          display: "flex",
          width: "70%",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <label>Select currency: </label> &nbsp;
          <SelectCurrency
            value={currencyCode}
            onChange={(e) => setCurrencyCode(e.target.value)}
          />
        </div>
      </div>
      <Tabs active="prediction" />
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage variant="danger">{error}</ErrorMessage>
      ) : (
        <>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th className="sort-link"></th>
                <th className="sort-link" onClick={() => sortColumn(0)}>
                  #
                </th>
                <th className="sort-link" onClick={() => sortColumn(1)}>
                  Name
                </th>
                <th className="sort-link" onClick={() => sortColumn(2)}>
                  Price
                </th>
                <th className="sort-link" onClick={() => sortColumn(3)}>
                  Market Cap
                </th>
                <th className="sort-link" onClick={() => sortColumn(4)}>
                  Volume(24h)
                </th>
                <th>Last 7 days</th>
                <th>Predict</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoins.map((coin) => {
                return (
                  <Prediction
                    _id={coin.market_cap_rank}
                    key={coin.id}
                    coin_id={coin.id}
                    name={coin.name}
                    price={coin.current_price}
                    symbol={coin.symbol}
                    marketcap={coin.market_cap}
                    volume={coin.total_volume}
                    image={coin.image}
                    code={currencyCode}
                    pricechange7d={coin.price_change_percentage_7d_in_currency}
                    graphdata={coin.sparkline_in_7d}
                    isFav={coin.isFav}
                  />
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
}

export default PredictionScreen;
