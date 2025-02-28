import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, [])
console.log(listUsers);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/users",
      {
        validateStatus: () => {
          return true;
        },
      }

    );
    if (result.status === 302) {
      setListUsers(result.data);
    }
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-primary">Danh sách người dùng</h2>
      <table className="table table-hover table-bordered table-striped shadow">
        <thead className="bg-dark text-white">
          <tr>
            <th className="text-center">ID</th>
            <th className="text-center">Tên</th>
            <th className="text-center">Email</th>
          </tr>
        </thead>
        <tbody>
          {listUsers.map((user) => (
            <tr key={user.id}>
              <td className="text-center">{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
