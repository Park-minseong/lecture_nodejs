import "./App.css";
import { useEffect, useState } from "react";
import CircularStatic from "./components/CircularStatic";
import AddUser from "./components/AddUser";
import DeleteUser from "./components/DeleteUser";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    callApi()
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, []);

  const refreshData = () => {
    setData([]);
    setTimeout(() => {
      callApi()
        .then((res) => setData(res))
        .catch((err) => console.log(err));
    }, 500);
  };

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
      <AddUser refreshData={refreshData}></AddUser>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>프로필</div>
        <div>이름</div>
        <div>전화번호</div>
        <div>주소</div>
        <div>설정</div>
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
            <div>
              <img
                src={user.profile}
                alt="프로필"
                style={{ width: "30px", height: "30px", objectFit: "cover" }}
              />
            </div>
            <div>{user.name}</div>
            <div>{user.tel}</div>
            <div>{user.zip}</div>
            <DeleteUser id={user.user_idx} refreshData={refreshData} />
          </div>
        ))
      ) : (
        <CircularStatic />
      )}
    </div>
  );
}

export default App;
