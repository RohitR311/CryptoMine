import React from "react";
import "../styles/Coin.css";
import getSymbolFromCurrency from "currency-symbol-map";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import StarIcon from "@material-ui/icons/Star";
import { updateFavCoins } from "../actions/coinActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Button } from "react-bootstrap";
import ChartProg from "./ChartProg";
import PredictionInput from "./PredictionInput";
// import "../starability.min.css";

const Prediction = ({
  name,
  price,
  symbol,
  marketcap,
  volume,
  image,
  pricechange7d,
  _id,
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

      <td>
        {getSymbolFromCurrency(code)}
        {marketcap?.toLocaleString()}
      </td>
      <td>
        {getSymbolFromCurrency(code)}
        {volume?.toLocaleString()}
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

      <td className="predict-btn">
        <PredictionInput coin_id={coin_id}/>
      </td>
    </tr>
  );
};

export default Prediction;
