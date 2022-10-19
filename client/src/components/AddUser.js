import React, { useState } from "react";
import axios from "axios";

const AddUser = () => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState();
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [zip, setZip] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    addUser().then((response) => {
      console.log(response.data);
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFile(e.target.value);
  };

  const addUser = () => {
    const url = "/api/customers";
    const formData = new FormData();
    formData.append("name", name);
    formData.append("tel", tel);
    formData.append("zip", zip);
    formData.append("porfile", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
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
        value={fileName}
        onChange={handleFileChange}
        placeholder="프로필 사진"
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
