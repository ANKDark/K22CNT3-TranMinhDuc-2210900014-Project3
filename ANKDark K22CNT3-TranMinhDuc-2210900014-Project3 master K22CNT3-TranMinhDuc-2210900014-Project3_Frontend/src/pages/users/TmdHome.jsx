import { useState, useEffect } from "react";
import axios from "axios";

export default function TmdHome() {
  //   const [listUsers, setListUsers] = useState([]);

  //   useEffect(() => {
  //     loadUsers();
  //   }, [])
  // console.log(listUsers);

  //   const loadUsers = async () => {
  //     const result = await axios.get("http://localhost:8080/users",
  //       {
  //         validateStatus: () => {
  //           return true;
  //         },
  //       }

  //     );
  //       setListUsers(result.data);
  //   }

  return (
    <div className="container mt-4 text-white mt-5">
      <div className="container text-center">
        <div className="row d-flex justify-content-between">
          <div className="col bg-secondary p-4 mx-3 d-flex flex-column align-items-center justify-content-center">
            <span className="fs-5 fw-bold" style={{ color: "#A1E3F9" }}>8000$</span>
            <p className="mt-2">Thu nhập</p>
          </div>
          <div className="col bg-secondary p-4 mx-3 d-flex flex-column align-items-center justify-content-center">
            <span className="fs-5 fw-bold" style={{ color: "#8E1616" }}>5000$</span>
            <p className="mt-2">Chi tiêu</p>
          </div>
          <div className="col bg-secondary p-4 mx-3 d-flex flex-column align-items-center justify-content-center">
            <span className="fs-5 fw-bold" style={{ color: "#433878" }}>3000$</span>
            <p className="mt-2">Tiết kiệm</p>
          </div>
          <div className="col bg-secondary p-4 mx-3 d-flex flex-column align-items-center justify-content-center">
            <span className="fs-5 fw-bold" style={{ color: "#433878" }}>1000$</span>
            <p className="mt-2">Investment</p>
          </div>
        </div>
      </div>
    </div>
  );
}  