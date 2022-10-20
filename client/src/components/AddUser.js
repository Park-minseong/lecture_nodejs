import React, { useState } from "react";
import axios from "axios";

const AddUser = ({ refreshData }) => {
  const [file, setFile] = useState();
  const [filename, setFilename] = useState("");
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [zip, setZip] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    addUser().then(() => {
      refreshData();
      setFile();
      setName("");
      setTel("");
      setZip("");
      setFilename("");
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.value);
  };

  const addUser = () => {
    const url = "/api/customers";
    const formData = new FormData();
    formData.append("name", name);
    formData.append("tel", tel);
    formData.append("zip", zip);
    formData.append("profile", file);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    return axios.post(url, formData, config);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        name="profile"
        file={file}
        value={filename}
        onChange={handleFileChange}
      />
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름"
      />
      <input
        type="text"
        name="tel"
        value={tel}
        onChange={(e) => setTel(e.target.value)}
        placeholder="전화번호"
      />
      <input
        type="text"
        name="zip"
        value={zip}
        onChange={(e) => setZip(e.target.value)}
        placeholder="주소"
      />
      <button type="submit">추가</button>
    </form>
  );
};

export default AddUser;
