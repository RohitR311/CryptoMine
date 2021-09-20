import React, { useState, useEffect } from "react";
import axios from "axios";
import { listCategories } from "../actions/categoryAction";
import Category from "../components/Category";
import { useSelector, useDispatch } from "react-redux";
import Tabs from "../components/Tabs";
import Loader from "../components/Loader";
import { Form, Table } from "react-bootstrap";

import "../styles/CategoryScreen.css";

const CategoryScreen = () => {
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState("Asc");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [global, setGlobal] = useState({});
  const [filteredCategory, setFilteredCategories] = useState([]);

  const categoryList = useSelector((state) => state.categoryList);
  const { loading, categories } = categoryList;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  useEffect(() => {
    setCategory(categories);
  }, [categories]);

  categories.map((cat, i) => {
    return (cat["key"] = i);
  });

  useEffect(() => {
    let filterCategory = category.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCategories(filterCategory);
  }, [category, search]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "https://api.coingecko.com/api/v3/global"
      );
      setGlobal(data.data);
    };

    fetchData()
  }, [categories, category]);

  const columns = [
    "name",
    "market_cap",
    "market_cap_change_24h",
    "volume_24h",
    "key",
  ];

  const sortColumn = (i) => {
    let sortKey = columns[i];
    let newCategory = [...category];
    if (sortType === "Asc") {
      newCategory.sort((a, b) => {
        const relValA = a[sortKey];
        const relValB = b[sortKey];

        if (relValA < relValB) return -1;
        if (relValA > relValB) return 1;
        return 0;
      });
      setSortType("Desc");
    } else {
      newCategory.sort((a, b) => {
        const relValA = a[sortKey];
        const relValB = b[sortKey];

        if (relValA > relValB) return -1;
        if (relValA < relValB) return 1;
        return 0;
      });
      setSortType("Asc");
    }
    setCategory(newCategory);
  };

  return (
    <div className="category-app">
      <div className="category-search">
        <h2 className="category-text">
          Cryptocurrency Category by 24h Price Change
        </h2>
        <p className="category-global">
          The total active cryptocurrencies are{" "}
          {global["active_cryptocurrencies"]}, a{" "}
          {global["market_cap_change_percentage_24h_usd"] < 0 ? (
            <span className="category-percent red">
              {global["market_cap_change_percentage_24h_usd"]?.toFixed(2)}%{" "}
            </span>
          ) : (
            <span className="category-percent green">
              {global["market_cap_change_percentage_24h_usd"]?.toFixed(2)}%{" "}
            </span>
          )}
          change over the last day.
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
      <Tabs active="category" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Table striped hover responsive size="lg">
            <thead>
              <tr>
                <th className="sort-link" onClick={() => sortColumn(4)}>
                  #
                </th>
                <th className="sort-link" onClick={() => sortColumn(0)}>
                  Name
                </th>
                <th className="sort-link" onClick={() => sortColumn(1)}>
                  Market Cap
                </th>
                <th className="sort-link" onClick={() => sortColumn(2)}>
                  24h%
                </th>
                <th className="sort-link" onClick={() => sortColumn(3)}>
                  Volume(24h)
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCategory.map((category) => {
                return (
                  <Category
                    _id={category.id}
                    sr={category.key}
                    key={category.id}
                    pricechange24h={category.market_cap_change_24h}
                    name={category.name}
                    marketcap={category.market_cap}
                    volume={category.volume_24h}
                  />
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default CategoryScreen;
