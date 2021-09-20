import React from "react";
import getSymbolFromCurrency from "currency-symbol-map";
import "../styles/HomeScreen.css";

const Category = ({ _id, sr, name, marketcap, pricechange24h, volume }) => {
  return (
    <tr key={_id}>
      <td>{sr + 1}</td>
      <td className="coin">
        <span>{name}</span> &nbsp;
      </td>
      <td>
        {getSymbolFromCurrency("USD")}
        {marketcap?.toLocaleString()}
      </td>
      {pricechange24h < 0 ? (
        <td className="coin-percent red">{pricechange24h?.toFixed(2)}%</td>
      ) : (
        <td className="coin-percent green">{pricechange24h?.toFixed(2)}%</td>
      )}
      <td>
        {getSymbolFromCurrency("USD")}
        {volume?.toLocaleString()}
      </td>
    </tr>
  );
};

export default Category;
