import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import "./home.scss";
import { Link } from "react-router-dom";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import RemoveCircleOutlineSharpIcon from "@mui/icons-material/RemoveCircleOutlineSharp";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import Pagination from "../../components/Pagination/Pagination";
import { showToastr } from "../../services/toastrService";
import { sortLoop } from "../../services/sortService.js";

const Home = () => {
  const [orderType, setOrderType] = useState("");
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [removeData, setRemoveData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [linksPerPage] = useState(5);

  //Pagination
  const indexOfLastLink = currentPage * linksPerPage;
  const indexOfFirstLink = indexOfLastLink - linksPerPage;
  const currentLinks = data.slice(indexOfFirstLink, indexOfLastLink);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    getItem();
  }, []);

  const getItem = () => {
    let localStorageData = localStorage.getItem("LinkVote") ?? [];
    if (!Array.isArray(localStorageData)) {
      localStorageData = JSON.parse(localStorageData);
      localStorageData.sort(sortLoop("date", "desc"));
      return setData(localStorageData);
    }
    setData([]);
  };

  const removeItem = () => {
    const filteredData = data.filter(function (item) {
      return item.id !== removeData.id;
    });
    localStorage.setItem("LinkVote", JSON.stringify(filteredData));
    setData([...filteredData]);
    closeModal();
    showToastr(removeData.title, " removed");
  };

  const closeModal = () => setShow(false);

  const showModal = (item) => {
    setRemoveData(item);
    setShow(true);
  };

  const changeSelect = (event) => {
    setOrderType(event.target.value);
    data.sort(sortLoop("counter", orderType));
    setData([...data]);
  };

  const changePoint = (voteType, item) => {
    data.map((dataItem) => {
      if (dataItem.id === item.id) {
        item.counter = voteType === "up" ? item.counter + 1 : item.counter - 1;
      }
      return true;
    });
    localStorage.setItem("LinkVote", JSON.stringify(data));
    data.sort(sortLoop("counter", "desc"));
    setData([...data]);
  };

  return (
    <div className="home">
      <div className="homeContainer">
        <div className="topSubmit">
          <Link className="submitLink" to="/createLink">
            <Button className="submitButton" variant="outlined">
              <AddBoxOutlinedIcon className="icon" />
              SUBMIT A LINK
            </Button>
          </Link>
        </div>
        <div className="orderType">
          <FormControl className="selectOption" size="small">
            <InputLabel id="demo-select-small">Order Type</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={orderType}
              label="OrderType"
              onChange={changeSelect}
            >
              <MenuItem value={"desc"}>Most Voted(Z → A)</MenuItem>
              <MenuItem value={"asc"}>Most Voted(A → Z)</MenuItem>
            </Select>
          </FormControl>
        </div>
        {currentLinks.length > 0 ? (
          currentLinks.map((item) => (
            <div key={item.id} className="listItems">
              <div className="left">
                <Button className="emptyButton" variant="outlined">
                  <span>{item.counter}</span>
                  <span>POINTS</span>
                </Button>
              </div>
              <div className="right">
                <div className="rightTop">
                  <span>{item.title}</span>
                  <span>({item.url})</span>
                </div>
                <div className="rightBottom">
                  <span onClick={() => changePoint("up", item)}>
                    <ArrowUpwardOutlinedIcon />
                    Up Vote
                  </span>
                  <span onClick={() => changePoint("down", item)}>
                    <ArrowDownwardOutlinedIcon />
                    Down Vote
                  </span>
                </div>
              </div>
              <div className="removeButton">
                <RemoveCircleOutlineSharpIcon
                  onClick={() => showModal(item)}
                  className="icon"
                />
              </div>
            </div>
          ))
        ) : (
          <b style={{ marginTop: "20px" }}>Please add a link</b>
        )}

        {data.length > 5 ? (
            <Pagination
              linksPerPage={linksPerPage}
              totalLinks={data.length}
              paginate={paginate}
            />
          ) : ""}

        {}
      </div>
      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to remove: <b>{removeData.title}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={removeItem}>
            OK
          </Button>
          <Button
            className="d-flex justify-content-center align-items-center"
            variant="primary"
            onClick={closeModal}
          >
            CANCEL
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
