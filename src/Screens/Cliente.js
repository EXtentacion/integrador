import React, { useState,useEffect } from 'react';
import axios from 'axios';
import  firebaseApp  from '../firebase/credenciales';
import {getAuth,onAuthStateChanged, signOut} from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import Comcliente from './Comcliente';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';



const auth = getAuth(firebaseApp);

<FontAwesomeIcon icon={faTicketAlt} />


function Cliente() {
  const [data1, setData1] = useState([]);
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    ID: '',
    TICKETS: '',
    AUTOR: '',
    DEPARTAMENTO: '',
    FECHA: '',
    DETALLES: ''
  });

  const getData = async () => {
    try {
      const response = await axios.get('https://sheetdb.io/api/v1/xyo06rvk50u2q');
      const filteredData = response.data.filter(row => row.NOMBRE === auth.currentUser.email);
      setData1(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

    useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setFormData({
          ...formData,
          AUTOR: user.email
        });
      } else {
        setFormData({
          ...formData,
          AUTOR: ''
        });
      }
    });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const autor = formData.AUTOR;
    const newFormData = {
      ...formData,
      ID: parseInt(uuidv4().replace(/\D/g, '')).toString().substring(0, 7),
      AUTOR: autor
    };
    axios.post('https://sheetdb.io/api/v1/g44unceikdnjr', newFormData)
      .then(res => {
        console.log(res);
        console.log(res.data);
        setTableData([...tableData, newFormData]);
        setFormData({
          TICKETS: '',
          AUTOR: autor,
          DEPARTAMENTO: '',
          FECHA: '',
          DETALLES: '',
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
          alignItems: "center",
          width: "100%",
          height: "100px",
          backgroundColor: "#f2f2f2",
        }}
      >
        <FontAwesomeIcon
          icon={faUser}
          style={{
            fontSize: "3rem",
            color: "#0080ff",
            marginLeft: "50px",
          }}
        />
        <h1
          style={{
            marginLeft: "50px",
          }}
        >
          {data1.map((row) => (
            <div key={row.ID}>
              {row.NOMBRE}
            </div>
          ))}
        </h1>
        <button
          style={{
            marginRight: "50px",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <Link
            to="/config"
            style={{
              color: "#0080ff",
              textDecoration: "none",
            }}
          >
            Administracion de Perfil
          </Link>
        </button>

        <FontAwesomeIcon
          icon={faTicketAlt}
          style={{
            fontSize: "3rem",
            color: "#0080ff",
            marginLeft: "50px",
          }}
        />
        <h1
          style={{
            marginLeft: "50px",
          }}
        >
          GENERAR TICKET
        </h1>
        <button
          style={{
            marginRight: "50px",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() =>
            signOut(auth).then(() => {
              window.location.href = "/";
            })
          }
        >
          <FontAwesomeIcon
            icon={faClose}
            style={{
              fontSize: "3rem",
              color: "#0080ff",
              marginLeft: "700px",
            }}
          />
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <FontAwesomeIcon
          icon={faTicketAlt}
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
          GENERAR TICKET
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
              <th>TICKETS</th>
              <th>AUTOR</th>
              <th>DEPARTAMENTO</th>
              <th>FECHA</th>
              <th>DETALLES</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.ID}</td>
                <td>{row.TICKETS}</td>
                <td>{row.AUTOR}</td>
                <td>{row.DEPARTAMENTO}</td>
                <td>{row.FECHA}</td>
                <td>{row.DETALLES}</td>
                <td>
                  <button onClick={() => handleDelete(index)}>Eliminar</button>
                </td>
              </tr>
            ))}
            {tableData.map((rowData, index) => (
              <tr key={index}>
                <td>
                  <input type="text" name="ID" value={rowData.ID} disabled />
                </td>
                <td>
                  <input
                    type="text"
                    name="TICKETS"
                    value={rowData.TICKETS}
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
                    name="AUTOR"
                    value={rowData.AUTOR}
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
                    name="DEPARTAMENTO"
                    value={rowData.DEPARTAMENTO}
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
                    name="FECHA"
                    value={rowData.FECHA}
                    onChange={(e) => {
                      const newData = [...tableData];
                      newData[index].FECHA = e.target.value;
                      setTableData(newData);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="DETALLES"
                    value={rowData.DETALLES}
                    onChange={(e) => {
                      const newData = [...tableData];
                      newData[index].DETALLES = e.target.value;
                      setTableData(newData);
                    }}
                  />
                </td>
                <td>
                  <button onClick={handleSubmit}>Guardar</button>
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
                  disabled
                />
              </td>
              <td>
                <input
                  type="text"
                  name="TICKETS"
                  value={formData.TICKETS}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="AUTOR"
                  value={formData.AUTOR}
                  onChange={handleChange}
                />
              </td>
              <td>
                <select
                  name="DEPARTAMENTO"
                  value={formData.DEPARTAMENTO}
                  onChange={handleChange}
                  style={{
                    width: "200px",
                    height: "30px",
                    borderRadius: "5px",
                    border: "1px solid #0080ff",
                  }}
                >
                  <option value={null}>-------------</option>
                  <option value="Compras">Compras</option>
                  <option value="Contabilidad">Contabilidad</option>
                  <option value="Logistica">Logística</option>
                  <option value="Produccion">Producción</option>
                  <option value="Ventas">Ventas</option>
                </select>
              </td>

              <td>
                <input
                  type="date"
                  name="FECHA"
                  value={formData.FECHA}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="DETALLES"
                  value={formData.DETALLES}
                  onChange={handleChange}
                />
              </td>
              <td>
                <button onClick={handleSubmit}>Guardar</button>
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
      ></div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "60px",
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
              <th>NOMBRE</th>
              <th>DETALLE</th>
              <th>ESTATUS</th>
              <th>COMENTARIO</th>
            </tr>
          </thead>
          <tbody
            style={{
              backgroundColor: "#F4F4F4",
              color: "#000",
            }}
          >
            {data1.map((row, index) => (
              <tr key={index}>
                <td
                  style={{
                    border: "1px solid black",
                    width: "110px",
                  }}
                >
                  {row.NOMBRE}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    width: "300px",
                    textAlign: "center",
                  }}
                >
                  {row.DETALLE}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    width: "110px",
                    textAlign: "center",
                  }}
                >
                  {row.ESTATUS}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    width: "300px",
                    textAlign: "center",
                  }}
                >
                  {row.COMENTARIO}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Cliente;

