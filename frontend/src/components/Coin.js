import React from "react";
import "../styles/Coin.css";
import ChartProg from "./ChartProg";
import getSymbolFromCurrency from "currency-symbol-map";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import StarIcon from "@material-ui/icons/Star";
import { updateFavCoins } from "../actions/coinActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
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
  coin_id,
  isFav,
}) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const history = useHistory();
  const redirectToLogin = () => {
    if (userInfo) dispatch(updateFavCoins(coin_id));
    else history.push("/login");
  };
  return (
    <tr key={_id}>
      <td className="starability">
        {!isFav ? (
          <StarOutlineIcon onClick={() => redirectToLogin()} />
        ) : (
          <StarIcon onClick={() => redirectToLogin()} />
        )}
      </td>
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
