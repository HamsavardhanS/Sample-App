import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../services/adminapi";
import { Card, CardContent } from "@mui/material";

const AdminHome = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Users</h2>
      {users.map((user) => (
        <Card key={user.id} className="mb-3 shadow-md">
          <CardContent>
            <h3><strong>ID:</strong>{user.id}</h3>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminHome;
