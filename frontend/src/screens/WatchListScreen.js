import React, { useState, useEffect } from "react";
import Coin from "../components/Coin";
import { Form, Table } from "react-bootstrap";
import { getFavCoins, listFavCoins } from "../actions/coinActions";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import SelectCurrency from "react-select-currency";

function WatchListScreen() {
  const [search, setSearch] = useState("");
  const [currencyCode, setCurrencyCode] = useState("USD");
  const dispatch = useDispatch();
  const favCoins = useSelector((state) => state.favCoins);
  const { fav_coins } = favCoins;

  const watchList = useSelector((state) => state.watchList);
  const { error, loading } = watchList;
  let { watchlist } = watchList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [sortType, setSortType] = useState("Asc");
  const [filteredCoins, setFilteredCoins] = useState([]);

  useEffect(() => {
    if (userInfo) dispatch(getFavCoins());
  }, [dispatch]);

  useEffect(() => {
    if (fav_coins.length) dispatch(listFavCoins(currencyCode, fav_coins));
    else watchlist = [];
  }, [dispatch, currencyCode, fav_coins]);

  useEffect(() => {
    for (let coin of watchlist) {
      coin["isFav"] = false;
    }
    setFilteredCoins(watchlist);
  }, [userInfo, fav_coins]);

  useEffect(() => {
    let filterCoins = watchlist.filter((coin) =>
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
  }, [watchlist, search, fav_coins]);

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

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h2 className="coin-text">Main Watch List</h2>
        <p className="coin-global">
          Keep track of your favourite cryptocurrencies.
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <label>Select currency: </label> &nbsp;
          <SelectCurrency
            value={currencyCode}
            onChange={(e) => setCurrencyCode(e.target.value)}
          />
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage variant="danger">{error}</ErrorMessage>
      ) : filteredCoins.length === 0 ? (
        <ErrorMessage variant="info">You have no favourite coins.</ErrorMessage>
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
        </>
      )}
    </div>
  );
}

export default WatchListScreen;
