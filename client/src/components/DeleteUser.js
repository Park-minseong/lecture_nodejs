import React from "react";

const DeleteUser = ({ id, refreshData }) => {
  const deleteUser = () => {
    const url = "/api/customers/" + id;
    fetch(url, {
      method: "DELETE",
    }).then(() => {
      refreshData();
    });
  };

  return (
    <div>
      <button onClick={deleteUser}>삭제</button>
    </div>
  );
};

export default DeleteUser;
