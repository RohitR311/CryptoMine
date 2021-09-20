import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
// import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import "../styles/SearchBox.css";

const SearchBox = () => {
  const [keyword, setKeyword] = useState();

  // const productList = useSelector((state) => state.productList);
  // const { page } = productList;

  // let history = useHistory();

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   if (keyword) history.push(`/?keyword=${keyword}&page=${page}`);
  //   else history.push(history.push(history.location.pathname));
  // };

  return (
    <Form className="search-box d-flex">
      <Form.Control
        type="text"
        name="q"
        onChange={e => setKeyword(e.target.value)}
        value={keyword}
        className="search-bar"
      ></Form.Control>

      <Button type="submit" variant="outline-success" className="p-2">
        Submit
      </Button>
    </Form>
  );
};

export default SearchBox;
