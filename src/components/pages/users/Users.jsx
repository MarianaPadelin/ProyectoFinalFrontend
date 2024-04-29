import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { IconButton, Paper, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import Divider from "@mui/material/Divider";
import "./Users.css";
const Users = ({ users, eliminarUsuario, cambiarRol, buscarUsuario, getUsers }) => {
  return (
    <div className="usersContainer">
      {users.map((user) => {
        return (
          <div key={user.email}>
            <Paper elevation={10}>
              <List className="list">
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={user.name}
                    secondary={user.email + "--  Tipo de usuario: " + user.role}
                  />

                  <Tooltip title="Eliminar" className="tacho">
                    <IconButton
                      onClick={() => {
                        Swal.fire({
                          title: "¿Eliminar este usuario?",
                          icon: "warning",
                          showCancelButton: true,
                          background: "lightGrey",
                          confirmButtonColor: "cadetBlue",
                          cancelButtonColor: "lightCoral",
                          confirmButtonText: "Eliminar",
                          cancelButtonText: "Cancelar",
                        })
                          .then(async (result) => {
                            if (result.isConfirmed) {
                              console.log(user._id)
                              await eliminarUsuario(user._id);
                            }
                          })
                          .then(async () => {
                              const usuario = await buscarUsuario(user._id)
                              if(!usuario){
                                       Swal.fire({
                                         title: "Listo",
                                         text: "Usuario eliminado",
                                         icon: "success",
                                         background: "lightGrey",
                                         confirmButtonColor: "cadetBlue",
                                       });
                                       getUsers();
                              } else {
                                       Swal.fire({
                                         title: "Error",
                                         text: "No se pudo eliminar al usuario",
                                         icon: "error",
                                         background: "lightGrey",
                                         confirmButtonColor: "cadetBlue",
                                       });
                                       getUsers();
                              }
                            })
                          .catch((error) => {
                            console.log(error);
                            Swal.fire({
                              title: "Error",
                              text: "No se pudo eliminar al usuario",
                              icon: "error",
                              background: "lightGrey",
                              confirmButtonColor: "cadetBlue",
                            });
                            getUsers();
                          });
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Switch" className="tacho">
                    <IconButton
                      onClick={() => {
                        Swal.fire({
                          title: "¿Modificar el rol de este usuario?",
                          icon: "warning",
                          showCancelButton: true,
                          background: "lightGrey",
                          confirmButtonColor: "cadetBlue",
                          cancelButtonColor: "lightCoral",
                          confirmButtonText: "Modificar",
                          cancelButtonText: "Cancelar",
                        })
                          .then((result) => {
                            if (result.isConfirmed) {
                              console.log(user._id)
                              cambiarRol(user._id);
                              Swal.fire({
                                title: "Listo",
                                text: "Rol modificado",
                                icon: "success",
                                background: "lightGrey",
                                confirmButtonColor: "cadetBlue",
                              });
                              getUsers();
                            }
                          })
                          .catch((error) => {
                            console.log(error);
                            Swal.fire({
                              title: "Error",
                              text: "No se pudo eliminar al usuario",
                              icon: "error",
                              background: "lightGrey",
                              confirmButtonColor: "cadetBlue",
                            });
                            getUsers();
                          });
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </ListItem>
                <Divider component="li" />
              </List>
            </Paper>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
