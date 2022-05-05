import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./createLink.scss";
import {showToastr} from "../../services/toastrService"

const CreateLink = () => {
  const [data, setData] = useState([]);
  let currentDateTime = new Date().toISOString();
  const [form, setForm] = useState({
    id: 0,
    title: "",
    url: "",
    counter: 0,
    date: currentDateTime,
  });

  const getItem = () => {
    const localStorageData = localStorage.getItem("LinkVote") ?? [];
    setData(
      Array.isArray(localStorageData) ? [] : JSON.parse(localStorageData)
    );
  };

  useEffect(() => {
    getItem();
  }, []);

  const saveItem = () => {
    if (form.title === "" || form.url === "") {
      alert("Please fill in the blanks");
      return;
    }
    const localStorageData = localStorage.getItem("LinkVote") ?? [];
    const parsedData = Array.isArray(localStorageData) ? [] : JSON.parse(localStorageData);

    let adata = [];
    if (!Array.isArray(localStorageData)) {
      parsedData.filter(function (item) {
        return adata.push(item.id);
      });
    }

    const maxId = Math.max(...adata);

    form.counter = 0;
    form.date = currentDateTime;
    form.id = adata.length > 0 ? maxId + 1 : 1;

    data.push({ ...form });
    localStorage.setItem("LinkVote", JSON.stringify(data));
    showToastr(form.title, " added");

    setForm({
      id: 0,
      title: "",
      url: "",
      counter: 0,
      date: "",
    });
  };

  return (
    <div className="create-link">
      <div className="create-container">
        <Link className="returnList" to="/" id="returnList">
          ← Return to List
        </Link>
        <span className="title">Add New Link</span>
        <div className="inputs">
          <div className="input">
            <span>Link Name:</span>
            <input
              onChange={(event) =>
                setForm({ ...form, title: event.target.value })
              }
              value={form.title}
              className="inputType"
              placeholder="e.g. Alphabet"
              type="text"
            ></input>
          </div>
          <div className="input">
            <span>Link Url:</span>
            <input
              onChange={(event) =>
                setForm({ ...form, url: event.target.value })
              }
              value={form.url}
              className="inputType"
              placeholder="e.g. http://abc.xyz"
              type="text"
            ></input>
          </div>
        </div>
        <div className="createButton">
          <button onClick={() => saveItem()} className="addButton">
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateLink;
