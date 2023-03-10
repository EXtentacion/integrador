import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, deleteDoc, doc, addDoc, query, where, updateDoc } from "firebase/firestore";
import firebaseApp from "../firebase/credenciales";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from 'uuid';
import Detalles from "./Detalles";
import '../App.css'

const firestore = getFirestore(firebaseApp);

function Administracion() {
  const [users, setUsers] = useState([]);
  const [showAddRow, setShowAddRow] = useState(false);
  const [newUser, setNewUser] = useState({Nombre: "", correo: "", rol: "", contraseña: ""});
  const [showInfo, setShowInfo] = useState(true);
  const [showEditRow, setShowEditRow] = useState(false);
  const [editingUser, setEditingUser] = useState({});



  const handleShowInfo = () => {
    setShowInfo(!showInfo);
  };
  const handleEdit = (email) => {
    const userToEdit = users.find(user => user.correo === email);
    setEditingUser(userToEdit);
    setShowEditRow(true);
  };
  

  useEffect(() => {
    async function fetchUsers() {
      const usersRef = collection(firestore, "usuarios");
      const usersSnapshot = await getDocs(usersRef);
      const usersData = usersSnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
      setUsers(usersData);
    }
    fetchUsers();
  }, []);

  const handleDelete = async (email) => {
    try {
      const userRef = collection(firestore, "usuarios");
      const querySnapshot = await getDocs(query(userRef, where("correo", "==", email)));
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      setUsers(users.filter(user => user.correo !== email));
      return alert("El usuario ha sido eliminado con éxito");
    } catch (error) {
      console.error(error);
    }
  }
  
  const handleAdd = async () => {
    try {
      const userRef = collection(firestore, "usuarios");
      const docRef = await addDoc(userRef, newUser);
      const newUserWithUid = { ...newUser, uid: docRef.id };
      setUsers([...users, newUserWithUid]);
      setNewUser({Nombre: "", correo: "", rol: "", contraseña: ""});
      setShowAddRow(false);
      return alert("El usuario ha sido agregado con éxito");
    } catch (error) {
      console.error(error);
    }
  }

  const handleUpdate = async (email, newRole) => {
    try {
      const usersRef = collection(firestore, "usuarios");
      const querySnapshot = await getDocs(query(usersRef, where("correo", "==", email)));
      querySnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, { rol: newRole });
      });
      setUsers(users.map(user => user.correo === email ? { ...user, rol: newRole } : user));
      return alert("El rol del usuario ha sido actualizado con éxito");
    } catch (error) {
      console.error(error);
    }
  };

  const [searchedUser, setSearchedUser] = useState({});

  const handleSearch = async () => {
    try {
      const searchTerm = document.getElementById("search-input").value;
      const usersRef = collection(firestore, "usuarios");
      const querySnapshot = await getDocs(query(usersRef, where("correo", "==", searchTerm)));
      const searchData = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
      if (searchData.length > 0) {
        setSearchedUser(searchData[0]);
      } else {
        setSearchedUser({});
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="container"
      style={{
        backgroundColor: "#fff",
      }}
    >
      <div
        className="row"
        style={{
          backgroundColor: "#0080ff",
          color: "white",
          padding: "10px",
          borderRadius: "10px",
          marginLeft: "1px",
        }}
      >
        <div
          className="col-12"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <FontAwesomeIcon
            icon={faUsers}
            style={{
              fontSize: "40px",
              marginLeft: "40px",
              marginRight: "40px",
            }}
          />

          <h1 className="text-center">Administración</h1>
          <input
            type="text"
            className="form-control"
            id="search-input"
            placeholder="Buscar usuario por correo"
            style={{
              marginLeft: "auto",
              marginRight: "10px",
              width: "300px",
              height: "40px",
              borderRadius: "10px",
            }}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={handleSearch}
            style={{
              height: "45px",
              borderRadius: "10px",
            }}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-12"></div>
      </div>
      <div
        className="row"
        style={{
          padding: "10px",
          borderRadius: "10px",
          marginLeft: "100px",
          marginRight: "100px",
        }}
      >
        <div className="col-12">
          <div className="card-body">
            <h5 className="card-title">Información del usuario</h5>
            {showInfo && (
              <>
                <p className="card-text">Nombre: {searchedUser.Nombre}</p>
                <p className="card-text">
                  Correo electrónico: {searchedUser.correo}
                </p>
                <p className="card-text">Rol: {searchedUser.rol}</p>
                <p className="card-text">
                  Contraseña: {searchedUser.contraseña}
                </p>
              </>
            )}
            <button onClick={handleShowInfo}>
              {showInfo ? "Ocultar información" : ""}
            </button>
          </div>
          <button
            className="btn btn-success"
            onClick={() => setShowAddRow(true)}
          >
            Agregar usuario
          </button>
          <table className="table table-striped">
            <thead
              style={{
                backgroundColor: "#0080ff",
                color: "white",
                marginLeft: "100px",
              }}
            >
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Correo electrónico</th>
                <th scope="col">Rol</th>
              </tr>
            </thead>
            <tbody
              style={{
                backgroundColor: "#f5f5f5",
              }}
            >
              {showAddRow && (
                <tr>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={newUser.Nombre}
                      onChange={(e) =>
                        setNewUser({ ...newUser, Nombre: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={newUser.correo}
                      onChange={(e) =>
                        setNewUser({ ...newUser, correo: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={newUser.rol}
                      onChange={(e) =>
                        setNewUser({ ...newUser, rol: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <button className="btn btn-success" onClick={handleAdd}>
                      Agregar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => setShowAddRow(false)}
                    >
                      Cancelar
                    </button>
                  </td>
                </tr>
              )}
              {users.map((user) => (
                <tr key={user.correo}>
                  <td
                    style={{
                      width: "20%",
                    }}
                  >
                    {user.Nombre}
                  </td>
                  <td
                    style={{
                      width: "20%",
                    }}
                  >
                    {user.correo}
                  </td>
                  <td
                    style={{
                      width: "20%",
                    }}
                  >
                    {user.rol}
                  </td>
                  <td
                    style={{
                      width: "20%",
                    }}
                  >
                    {user.contraseña}
                  </td>
                  <td>
                    <select
                      onChange={(event) =>
                        handleUpdate(user.correo, event.target.value)
                      }
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="JefeDeSoporte">Hacer JefeDeSoporte</option>
                      <option value="AuxiliarDeSoporte">
                        Hacer AuxiliarDeSoporte
                      </option>
                      <option value="AutorDelCliente">
                        Hacer AutorDelCliente
                      </option>
                    </select>
                  </td>
                  <td>
                    {" "}
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(user.correo)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <h1 style={{
        backgroundColor: "purple",
        color: "white",
        padding: "10px",
        borderRadius: "10px",
        marginLeft: "100px",
        marginRight: "100px",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

      }}>Detalles</h1>
      <Detalles />
    </div>
  );
}

export default Administracion;
