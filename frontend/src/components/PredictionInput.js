import React, { useState } from "react";
import { Button, Form, Modal, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getCryptoCoinById,
  getCryptoCoinPrediction,
} from "../actions/coinActions";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router";
// import { LinkContainer } from "react-router-bootstrap";
// import ErrorMessage from "./ErrorMessage";
// import PredictionOut from "./PredictionOut";

function PredictOutModal(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Alert
        variant="warning"
        style={{ padding: "0", backgroundColor: "white" }}
      >
        <Modal.Header
          closeButton
          style={{
            borderRadius: "30px",
            border: "white solid 10px",
            backgroundColor: "#fdf2df",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
          id="pred1"
        >
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ width: "100%" }}
          >
            Warning
            <h6>Invest on your own risk</h6>
          </Modal.Title>
        </Modal.Header>
      </Alert>
      <Modal.Body>
        <h4>Prediction Is : </h4>
        <h4>{props.prediction}</h4>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

function MyVerticallyCenteredModal(props) {
  const [predShow, setPredShow] = useState(false);
  const [date, setDate] = useState("");
  const [openPrice, setOpenPrice] = useState();
  const [closePrice, setClosePrice] = useState();
  const [volume, setVolume] = useState();

  const dispatch = useDispatch();

  const coinList = useSelector((state) => state.coinList);
  const { crypto_coin, crypto_pred } = coinList;

  const OnClose = (e) => {
    e.preventDefault();                     
    dispatch(
      getCryptoCoinPrediction(
        crypto_coin["csv_file"],
        date,
        openPrice,
        closePrice,
        volume
      )
    );
    document.querySelector(".btn-close").click();
    setPredShow(true);
  };
  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Alert variant="dark">
          <Modal.Header
            closeButton
            style={{ padding: "0", borderRadius: "360px" }}
            id="pred1"
          >
            <Modal.Title
              id="contained-modal-title-vcenter"
              style={{ width: "100%", textAlign: "center" }}
            >
              <h4 style={{ fontSize: "2.3rem" }}>Prediction</h4>
            </Modal.Title>
          </Modal.Header>
        </Alert>
        <Modal.Body>
          <Form onSubmit={OnClose}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                placeholder=""
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicnumber">
              <Form.Label>Open Price</Form.Label>
              <Form.Control
                type="number"
                placeholder=""
                onChange={(e) => setOpenPrice(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicnumber">
              <Form.Label>Close Price</Form.Label>
              <Form.Control
                type="number"
                placeholder=""
                onChange={(e) => setClosePrice(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicnumber">
              <Form.Label>Volume</Form.Label>
              <Form.Control
                type="number"
                placeholder=""
                onChange={(e) => setVolume(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="T&C*" required />
            </Form.Group>

            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <PredictOutModal
        show={predShow}
        className="submit"
        onHide={() => setPredShow(false)}
        prediction={crypto_pred}
      />
    </>
  );
}

const PredictionInput = ({ coin_id }) => {
  const [modalShow, setModalShow] = useState(false);

  const dispatch = useDispatch();

  const getCoinId = (coin_id) => {
    setModalShow(true);
    dispatch(getCryptoCoinById(coin_id));
  };

  return (
    <>
      <Button variant="primary" onClick={() => getCoinId(coin_id)}>
        Predict
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        className="submit"
        onHide={() => setModalShow(false)}
        dispatch={dispatch}
      />
    </>
  );
};

export default PredictionInput;
