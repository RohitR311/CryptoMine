import React from "react";
import { Link } from "react-router-dom";
import "../styles/Tabs.css";

const Tabs = ({ active }) => {
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div
        className="links"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          className={
            active === "cryptocurrencies" ? "tab-link active" : "tab-link"
          }
          to=""
        >
          CryptoCurrencies
        </Link>
        <Link
          className={active === "category" ? "tab-link active" : "tab-link"}
          to="/category"
        >
          Category
        </Link>
        <Link
          className={active === "prediction" ? "tab-link active" : "tab-link"}
          to="/predict"
        >
          Prediction
        </Link>
      </div>
    </div>
  );
};

export default Tabs;
