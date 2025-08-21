import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../services/adminapi";
import { Card, CardContent, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const domainOptions = [
  { value: "", label: "All" },
  { value: "hotel", label: "Hotel Domain (@hotel)" },
  { value: "admin", label: "Admin Domain (@admin)" },
  { value: "other", label: "Other Domains" }
];

const getDomainType = (email) => {
  if (!email) return "";
  if (email.includes("@hotel")) return "hotel";
  if (email.includes("@admin")) return "admin";
  return "other";
};

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [domainFilter, setDomainFilter] = useState(""); // current filter

  useEffect(() => {
    getAllUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const filteredUsers = domainFilter
    ? users.filter(user => getDomainType(user.email) === domainFilter)
    : users;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Users</h2>
      <FormControl variant="outlined" sx={{ minWidth: 220, mb: 3 }}>
        <InputLabel id="domain-filter-label">Filter by Email Domain</InputLabel>
        <Select
          labelId="domain-filter-label"
          value={domainFilter}
          onChange={e => setDomainFilter(e.target.value)}
          label="Filter by Email Domain"
        >
          {domainOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {filteredUsers.map((user) => (
        <Card key={user.id} className="mb-3 shadow-md">
          <CardContent>
            <h3><strong>ID:</strong> {user.id}</h3>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminHome;
