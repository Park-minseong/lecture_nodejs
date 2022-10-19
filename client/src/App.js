import "./App.css";
import { useEffect, useState } from "react";
import CircularStatic from "./components/CircularStatic";
import AddUser from "./components/AddUser";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      callApi()
        .then((res) => setData(res))
        .catch((err) => console.log(err));
    }, 1000);
  }, []);

  const callApi = async () => {
    const response = await fetch("/api/customers");
    const body = await response.json();
    return body;
  };

  return (
    <div
      style={{
        background: "gray",
        color: "white",
        margin: "0 auto",
        maxWidth: "1200px",
      }}
    >
      <AddUser></AddUser>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>이름</div>
        <div>전화번호</div>
        <div>주소</div>
      </div>
      {data.length > 0 ? (
        data.map((user, index) => (
          <div
            key={index}
            style={{
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>{user.name}</div>
            <div>{user.tel}</div>
            <div>{user.zip}</div>
          </div>
        ))
      ) : (
        <CircularStatic />
      )}
    </div>
  );
}

export default App;
