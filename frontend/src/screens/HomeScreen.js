import React, { useState, useEffect } from "react";
import Coin from "../components/Coin";
import "../styles/HomeScreen.css";
import { Dropdown, Form, Table } from "react-bootstrap";
import { getFavCoins, listCoins } from "../actions/coinActions";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import SelectCurrency from "react-select-currency";
// import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import Tabs from "../components/Tabs";
import axios from "axios";

function HomeScreen() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [currencyCode, setCurrencyCode] = useState("USD");
  const [pageSize, setPageSize] = useState(10);
  const dispatch = useDispatch();
  const coinList = useSelector((state) => state.coinList);
  const { error, loading, coins, fav_coins } = coinList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [sortType, setSortType] = useState("Asc");
  const [filteredCoins, setFilteredCoins] = useState([]);

  const [global, setGlobal] = useState({});

  useEffect(() => {
    if (userInfo) dispatch(getFavCoins());
  }, [dispatch]);

  useEffect(async () => {
    const {data} = await axios.post(
      `http://127.0.0.1:8000/api/users/myprediction/`,
      {
        file: "https://res.cloudinary.com/dyuekopnr/raw/upload/v1/Crypto/files/coin_Bitcoin_btkgi1.csv",
        date_p: "2021-08-20",
        open_p: 47261.41,
        close_p: 47328.2,
        volume: 43909845642,
      }
    );
    console.log(data[0]);
  }, []);

  useEffect(() => {
    dispatch(listCoins(page, currencyCode, pageSize));
  }, [dispatch, page, currencyCode, pageSize]);

  useEffect(() => {
    for (let coin of coins) {
      coin["isFav"] = false;
    }
    setFilteredCoins(coins);
  }, [userInfo, fav_coins]);

  useEffect(() => {
    let filterCoins = coins.filter((coin) =>
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
  }, [coins, search, fav_coins]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "https://api.coingecko.com/api/v3/global"
      );
      setGlobal(data.data);
    };

    fetchData();
  }, []);

  const columns = [
    "market_cap_rank",
    "name",
    "current_price",
    "price_change_percentage_24h",
    "price_change_percentage_7d_in_currency",
    "market_cap",
    "total_volume",
    "circulating_supply",
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

  const handleChange = (_, value) => {
    setPage(value);
  };

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h2 className="coin-text">
          Today's Cryptocurrency Prices by Market Cap
        </h2>
        <p className="coin-global">
          The total active cryptocurrencies are{" "}
          {global["active_cryptocurrencies"]}, a{" "}
          {global["market_cap_change_percentage_24h_usd"] < 0 ? (
            <span className="coin-percent red">
              {global["market_cap_change_percentage_24h_usd"]?.toFixed(2)}%{" "}
            </span>
          ) : (
            <span className="coin-percent green">
              {global["market_cap_change_percentage_24h_usd"]?.toFixed(2)}%{" "}
            </span>
          )}
          change over the last day.
        </p>
        <Form className="search-box d-flex">
          <Form.Control
            type="text"
            name="q"
            placeholder="Search in Current Page"
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
        <Dropdown style={{ display: "flex" }}>
          <label>Show rows: </label> &nbsp;
          <Dropdown.Toggle
            variant="info"
            id="dropdown-basic"
            style={{ padding: "4px 8px" }}
          >
            {pageSize}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setPageSize(100)}>100</Dropdown.Item>
            <Dropdown.Item onClick={() => setPageSize(50)}>50</Dropdown.Item>
            <Dropdown.Item onClick={() => setPageSize(10)}>10</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Tabs active="cryptocurrencies" />
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage variant="danger">{error}</ErrorMessage>
      ) : (
        <>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th class="sort-link"></th>
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
                  24h%
                </th>
                <th className="sort-link" onClick={() => sortColumn(4)}>
                  7d%
                </th>
                <th className="sort-link" onClick={() => sortColumn(5)}>
                  Market Cap
                </th>
                <th className="sort-link" onClick={() => sortColumn(6)}>
                  Volume(24h)
                </th>
                <th className="sort-link" onClick={() => sortColumn(7)}>
                  Circulating Supply
                </th>
                <th>Last 7 days</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoins.map((coin) => {
                return (
                  <Coin
                    _id={coin.market_cap_rank}
                    key={coin.id}
                    coin_id={coin.id}
                    name={coin.name}
                    price={coin.current_price}
                    symbol={coin.symbol}
                    marketcap={coin.market_cap}
                    volume={coin.total_volume}
                    image={coin.image}
                    pricechange24h={coin.price_change_percentage_24h}
                    pricechange7d={coin.price_change_percentage_7d_in_currency}
                    circulatingsupply={coin.circulating_supply}
                    graphdata={coin.sparkline_in_7d}
                    code={currencyCode}
                    isFav={coin.isFav}
                  />
                );
              })}
            </tbody>
          </Table>
          <Pagination
            count={Math.floor(9100 / pageSize)}
            page={page}
            onChange={handleChange}
            size="large"
            variant="outlined"
            color="primary"
            showFirstButton
            showLastButton
          />
        </>
      )}
    </div>
  );
}

export default HomeScreen;
