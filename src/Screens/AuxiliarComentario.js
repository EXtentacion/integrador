import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Table from './Table';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Table2 from './Table2';
import firebaseApp from '../firebase/credenciales';
import { getAuth, signOut } from "firebase/auth";
import { Link } from 'react-router-dom';
import '../App.css'

const auth = getAuth(firebaseApp);


function AuxiliarComentario() {
  const [data, setData] = useState([]);
  const [encargado, setEncargado] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [text, setText] = useState('');
  const [estatus, setEstatus] = useState('');
  const [tableData, setTableData] = useState([]);
  const [fecha, setFecha] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [id, setId] = useState('');


  const [rows, setRows] = useState([
    { id: 1, estatus: 'Completado' },
    { id: 2, estatus: 'Asignado' },
    { id: 3, estatus: 'En proceso' },
    { id: 4, estatus: 'Nunca Solucionado' },
    { id: 5, estatus: 'Cancelado por cliente' },
  ]);


  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      ID: id,
      ESTATUS: estatus,
      FECHA: fecha,
      DEPARTAMENTOS: departamento
    };

    axios.post('https://sheetdb.io/api/v1/ae78dg3ntqrae', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log(response);
      alert('Los datos han sido enviados exitosamente');
    })
    .catch(error => {
      console.error(error);
      alert('Ocurrió un error al enviar los datos');
    });
  }



  const handleChange = (id, value) => {
    setRows(rows => {
      const index = rows.findIndex(row => row.id === id);
      const updatedRow = {...rows[index], estatus: value};
      const updatedRows = [...rows];
      updatedRows[index] = updatedRow;
      return updatedRows;
    });
    setEstatus(value); // Actualizar el estado de "estatus" con el valor seleccionado
  }
  


  const getData = async () => {
    try {
      const response = await axios.get('https://sheetdb.io/api/v1/g44unceikdnjr');
      const filteredData = response.data.filter(row => row.ENCARGADO === auth.currentUser.email);
      setData(filteredData);
    } catch (error) {
      console.error(error);
    }
  };
  
  const updateName = (num) => {
    fetch(`https://sheetdb.io/api/v1/g44unceikdnjr/ID/${num}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          'ESTATUS': estatus
        }
      })
    })
    .then((response) => response.json())
    .then((data) => console.log(data));
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          marginLeft: "30px",
          color: "#0080ff",
        }}
      >
        <h1 style={{
          marginTop: "50px",
        }}>ASIGNACIONES DEL JEFE</h1>
        <table style={{
          marginTop: "50px",
        }}>
          <thead
            style={{
              backgroundColor: "#f2f2f2",
              color: "#000",
              fontSize: "15px",

            }}
          >
            <tr>
              <th>ID</th>
              <th>TICKETS</th>
              <th>AUTOR</th>
              <th>DEPARTAMENTO</th>
              <th>DETALLES</th>
              <th>ENCARGADO</th>
              <th>OBSERVACIONES</th>
              <th>FECHA FIN</th>
              <th>ESTATUS</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={row.ID}
                    disabled
                    style={{
                      width: "50px",
                      textAlign: "center",
                    }}
                  />
                </td>
                <td>
                  <input type="text" value={row.TICKETS} disabled />
                </td>
                <td>
                  <input type="text" value={row.AUTOR} disabled />
                </td>
                <td>
                  <input type="text" value={row.DEPARTAMENTO} disabled />
                </td>
                <td>
                  <input type="text" value={row.DETALLES} disabled />
                </td>
                <td>
                  <input type="text" value={row.ENCARGADO} disabled />
                </td>
                <td>
                  <input type="text" value={row.OBSERVACIONES} disabled />
                </td>
                <td>
                  <input type="text" value={row.FECHA_FIN} disabled />
                </td>
                <td>
                  <select
                    value={row.estatus}
                    onChange={(event) =>
                      handleChange(row.id, event.target.value)
                    }
                  >
                    <option value="Completado">Completado</option>
                    <option value="Asignado">Asignado</option>
                    <option value="En proceso">En proceso</option>
                    <option value="Nunca Solucionado">Nunca Solucionado</option>
                    <option value="Cancelado por cliente">
                      Cancelado por cliente
                    </option>
                  </select>
                </td>
                <td>
                  <button onClick={() => updateName(row.ID)}>Actualizar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h1 style={{
          color: "#0080ff",
          marginTop: "50px",

        }}>GENERAR REPORTES </h1>
        <form onSubmit={handleSubmit}>
          <div class="form-group">
            <label htmlFor="id">ID:</label>
            <input
              style={{
                width: "200px",
                textAlign: "center",
                marginLeft: "10px",
                marginTop: "30px",

              }}
              type="text"
              id="id"
              value={id}
              onChange={(event) => setId(event.target.value)}
            />
          </div>

          <div class="form-group">
            <label htmlFor="estatus">Estatus:</label>
            <select
              type="text"
              id="estatus"
              value={estatus}
              onChange={(event) => setEstatus(event.target.value)}
              style={{
                width: "200px",
                textAlign: "center",
                marginLeft: "10px",
                marginTop: "30px",
              }}
            >
              <option value={null}>--------------------</option>
              <option value="Completado">Completado</option>
              <option value="Asignado">Asignado</option>
              <option value="En proceso">En proceso</option>
              <option value="Nunca Solucionado">Nunca Solucionado</option>
              <option value="Cancelado por cliente">Cancelado por cliente</option>

            </select>
          </div>

          <div class="form-group">
            <label htmlFor="Fecha">Fecha:</label>
            <input
               style={{
                width: "200px",
                textAlign: "center",
                marginLeft: "10px",
                marginTop: "30px",
               }}
              type="date"
              id="Fecha"
              value={fecha}
              onChange={(event) => setFecha(event.target.value)}
            />
          </div>

          <div class="form-group">
            <label htmlFor="departamento">Departamento:</label>
            <input
              type="text"
              id="departamento"
              value={departamento}
              onChange={(event) => setDepartamento(event.target.value)}
              style={{
                width: "200px",
                textAlign: "center",
                marginLeft: "10px",
                marginTop: "30px",
              }}
            />
          </div>

          <button type="submit" style={{
            width: "200px",
            textAlign: "center",
            marginLeft: "10px",
            marginTop: "30px",
          
          }}>Enviar</button>
        </form>
      </div>
      <button style={{
            width: "200px",
            textAlign: "center",
            marginLeft: "650px",
            marginTop: "30px",
            backgroundColor: "#0080ff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            padding: "10px",
            cursor: "pointer",
            outline: "none",
            marginTop: "150px",
      }}
          >
            <Link to="/reportes" style={{
              color: "#fff",
            }}>
              GENERAR REPORTE
            </Link>
          </button>
    </div>
  );
}

export default AuxiliarComentario;
