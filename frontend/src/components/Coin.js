import React from "react";
import "../styles/Coin.css";
import ChartProg from "./ChartProg";
import getSymbolFromCurrency from "currency-symbol-map";
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarIcon from '@material-ui/icons/Star';
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
      <td className="starability"><StarIcon /></td>
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
