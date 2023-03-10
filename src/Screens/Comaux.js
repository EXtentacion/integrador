import React, { useState } from 'react';
import axios from 'axios';
import  firebaseApp  from '../firebase/credenciales';
import {getAuth,onAuthStateChanged, signOut} from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faUserCog } from '@fortawesome/free-solid-svg-icons';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';

const auth = getAuth(firebaseApp);




function Comaux() {
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    ID: '',
    NOMBRE: '',
    DETALLE: '',
    ESTATUS: '',
    COMENTARIO: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://sheetdb.io/api/v1/t9bbu84f769lr', formData)
      .then(res => {
        console.log(res);
        console.log(res.data);
        setTableData([...tableData, formData]);
        setFormData({
          ID: '',
          NOMBRE: '',
          DETALLE: '',
          ESTATUS: '',
          COMENTARIO: '',
        });
      })
  }
  

  const handleDelete = (index) => {
    setData(data.filter((row, i) => i !== index));
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <FontAwesomeIcon
          icon={faUserSecret}
          style={{
            fontSize: "3rem",
            color: "#0080ff",
          }}
        />
        <h1
          style={{
            marginLeft: "20px",
          }}
        >
          OBSERVACIONES A AUXILIARES
        </h1>
      </div>
      <div
        style={{
            display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <table
          style={{
            border: "1px solid black",
          }}
        >
          <thead
            style={{
              backgroundColor: "#0080ff",
              color: "white",
            }}
          >
            <tr
              style={{
                height: "50px",
              }}
            >
              <th>ID</th>
              <th>NOMBRE</th>
              <th>DETALLE</th>
              <th>ESTATUS</th>
              <th>COMENTARIO</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.ID}</td>
                <td>{row.DETALLE}</td>
                <td>{row.NOMBRE}</td>
                <td>{row.ESTATUS}</td>
                <td>{row.COMENTARIO}</td>
                <td>
                  <button onClick={() => handleDelete(index)}>Eliminar</button>
                </td>
              </tr>
            ))}
            {tableData.map((rowData, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    name="ID"
                    value={rowData.ID}
                    onChange={(e) => {
                      const newData = [...tableData];
                      newData[index].ID = e.target.value;
                      setTableData(newData);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="NOMBRE"
                    value={rowData.NOMBRE}
                    onChange={(e) => {
                      const newData = [...tableData];
                      newData[index].TICKETS = e.target.value;
                      setTableData(newData);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="DETALLE"
                    value={rowData.DETALLE}
                    onChange={(e) => {
                      const newData = [...tableData];
                      newData[index].AUTOR = e.target.value;
                      setTableData(newData);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="ESTATUS"
                    value={rowData.ESTATUS}
                    onChange={(e) => {
                      const newData = [...tableData];
                      newData[index].DEPARTAMENTO = e.target.value;
                      setTableData(newData);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="COMENTARIO"
                    value={rowData.COMENTARIO}
                    onChange={(e) => {
                      const newData = [...tableData];
                      newData[index].FECHA = e.target.value;
                      setTableData(newData);
                    }}
                  />
                </td>
                <td>
                  <button onClick={handleSubmit}>ENVIAR</button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      setTableData(tableData.filter((_, i) => i !== index))
                    }
                  >
                    Eliminar fila
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <input
                  type="text"
                  name="ID"
                  value={formData.ID}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="NOMBRE"
                  value={formData.NOMBRE}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="DETALLE"
                  value={formData.DETALLE}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="ESTATUS"
                  value={formData.ESTATUS}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="COMENTARIO"
                  value={formData.COMENTARIO}
                  onChange={handleChange}
                />
              </td>
              <td>
                <button onClick={handleSubmit}>ENVIAR</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <button
          onClick={() => setTableData([...tableData, {}])}
          style={{
            backgroundColor: "green",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100px",
          }}
        >
          Agregar fila
        </button>
      </div>
      <div style={{
        height: "100px",
      }}></div>
    </div>
  );
}

export default Comaux;

