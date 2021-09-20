import React from "react";
import "../styles/Coin.css";
import ChartProg from "./ChartProg";
import getSymbolFromCurrency from "currency-symbol-map";
// import "../starability.min.css";

const Coin = ({
  name,
  price,
  symbol,
  marketcap,
  volume,
  image,
  pricechange24h,
  pricechange7d,
  _id,
  circulatingsupply,
  graphdata,
  code,
}) => {
  return (
    <tr key={_id}>
      {/* <td className="starability">
        <fieldset className="starability-basic">
          <input
            type="checkbox"
            id="rate"
            className="input-no-rate"
            name="rating"
            value="0"
            checked
            aria-label="No rating."
          />
          <input type="checkbox" id="first-rate1" name="rating" value="0" />
          <label for="first-rate1" title="Add to Main Watchlist">
            1 star
          </label>
        </fieldset>
      </td> */}
      <td>{_id}</td>
      <td className="coin">
        <img src={image} alt="" />
        <span>{name}</span> &nbsp; <span className="mt-1">{symbol}</span>
      </td>
      <td>
        {getSymbolFromCurrency(code)}
        {price?.toLocaleString()}
      </td>
      {pricechange24h < 0 ? (
        <td className="coin-percent red">{pricechange24h?.toFixed(2)}%</td>
      ) : (
        <td className="coin-percent green">{pricechange24h?.toFixed(2)}%</td>
      )}
      {pricechange7d < 0 ? (
        <td className="coin-percent red">{pricechange7d?.toFixed(2)}%</td>
      ) : (
        <td className="coin-percent green">{pricechange7d?.toFixed(2)}%</td>
      )}
      <td>
        {getSymbolFromCurrency(code)}
        {marketcap?.toLocaleString()}
      </td>
      <td>
        {getSymbolFromCurrency(code)}
        {volume?.toLocaleString()}
      </td>

      <td className="coin-supply">
        {circulatingsupply?.toLocaleString()} <span>{symbol}</span>
      </td>

      {pricechange7d < 0 ? (
        <td>
          <ChartProg dataprog={graphdata} crypto={name} color="red" />
        </td>
      ) : (
        <td>
          <ChartProg dataprog={graphdata} crypto={name} color="green" />
        </td>
      )}
    </tr>
  );
};

export default Coin;
