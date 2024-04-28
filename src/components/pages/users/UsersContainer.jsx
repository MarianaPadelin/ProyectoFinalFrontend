import { useState } from "react";
import axios from "axios";
import Users from "./Users";
import { useEffect } from "react";

const UsersContainer = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, [setUsers]);

  async function getUsers() {
    await axios.get(`/api/users`)
    .then((res) => {
      let data = res.data.users;
      setUsers(data);
    });
  }

  async function eliminarUsuario(uid) {
    await axios.delete(`/api/users/${uid}`);
  }

  async function cambiarRol(uid) {
    await axios.put(`/api/users/${uid}`);
  }

  async function buscarUsuario(uid){
     await axios.get(`/api/users/${uid}`);
  }

  return (
    <Users
      users={users}
      eliminarUsuario={eliminarUsuario}
      cambiarRol={cambiarRol}
      getUsers={getUsers}
      buscarUsuario={buscarUsuario}
    />
  );
};

export default UsersContainer;
