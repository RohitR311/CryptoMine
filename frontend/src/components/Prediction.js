import React from "react";
import "../styles/Coin.css";
import getSymbolFromCurrency from "currency-symbol-map";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import StarIcon from "@material-ui/icons/Star";
import { getCoinById, updateFavCoins } from "../actions/coinActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import ChartProg from "./ChartProg";
import PredictionInput from "./PredictionInput";
import { Link } from "react-router-dom";

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
  const getCryptoId = (id) => {
    dispatch(getCoinById(id));
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
        <Link to={`/crypto/${coin_id}`}><span onClick={() => getCryptoId(coin_id)} className='coin-name'>{name}</span></Link> &nbsp; <span className="mt-1">{symbol}</span>
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
          <ChartProg dataprog={graphdata} crypto={name} color="red" legend={false} />
        </td>
      ) : (
        <td>
          <ChartProg dataprog={graphdata} crypto={name} color="green" legend={false} />
        </td>
      )}

      <td className="predict-btn">
        <PredictionInput coin_id={coin_id}/>
      </td>
    </tr>
  );
};

export default Prediction;
