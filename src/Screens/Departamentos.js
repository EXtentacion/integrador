import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';

function Departamentos() {
  const [empleados, setEmpleados] = useState([]);
  const [editando, setEditando] = useState({});

  useEffect(() => {
    fetch('https://sheetdb.io/api/v1/bb3a2w5pl600v')
      .then(response => response.json())
      .then(data => setEmpleados(data));
  }, []);

  const handleEditar = (empleado) => {
    setEditando(empleado);
  };

  const handleGuardar = () => {
    // Aquí podrías enviar los datos editados al servidor o hacer cualquier otra acción necesaria
    setEditando({});
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          backgroundColor: "#0080ff", //color verde en rgba  (0, 255, 0, 0.5)
          color: "white",
          alignItems: "center",
          borderRadius: "10px",
          padding: "10px",
          margin: "10px",
        }}
      >
        <FontAwesomeIcon
          icon={faInfoCircle}
          style={{
            fontSize: "50px",
            marginLeft: "10px",
          }}
        />
        <h1
          style={{
            marginLeft: "10px",
          }}
        >
          DEPARTAMENTOS
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 255, 0.5)",
            borderRadius: "50%",
            width: "150px",
            height: "150px",
          }}
        >
          <FontAwesomeIcon
            icon={faBuilding}
            style={{
              fontSize: "50px",
              color: "white",
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginTop: "100px",
        }}
      >
        <table>
          <thead
            style={{
              backgroundColor: "rgba(255, 0, 0, 0.5)",
              color: "white",
            }}
          >
            <tr>
              <th>ID</th>
              <th>NOMBRE</th>
              <th>DEPARTAMENTO</th>
              <th>OCUPACION</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado) => (
              <tr key={empleado.id}>
                <td>
                  <input
                    value={
                      editando.ID === empleado.ID ? editando.ID : empleado.ID
                    }
                    disabled={editando.ID !== empleado.ID}
                    style={{
                      width: "300px",
                      height: "30px",
                    }}
                    onChange={(e) =>
                      setEditando({ ...editando, ID: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    value={
                      editando.ID === empleado.ID
                        ? editando.NOMBRE
                        : empleado.NOMBRE
                    }
                    disabled={editando.ID !== empleado.ID}
                    style={{
                      width: "300px",
                      height: "30px",
                    }}
                    onChange={(e) =>
                      setEditando({ ...editando, NOMBRE: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    value={
                      editando.ID === empleado.ID
                        ? editando.DEPARTAMENTO
                        : empleado.DEPARTAMENTO
                    }
                    disabled={editando.ID !== empleado.ID}
                    style={{
                      width: "300px",
                      height: "30px",
                    }}
                    onChange={(e) =>
                      setEditando({ ...editando, DEPARTAMENTO: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    value={
                      editando.ID === empleado.ID
                        ? editando.OCUPACION
                        : empleado.OCUPACION
                    }
                    disabled={editando.ID !== empleado.ID}
                    style={{
                      width: "300px",
                      height: "30px",
                    }}
                    onChange={(e) =>
                      setEditando({ ...editando, OCUPACION: e.target.value })
                    }
                  />
                </td>
                <td>
                  {editando.ID === empleado.ID ? (
                    <FontAwesomeIcon
                      icon={faSave}
                      style={{
                        fontSize: "30px",
                        marginLeft: "10px",
                        cursor: "pointer",
                        color: "green",
                      }}
                      onClick={handleGuardar}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEdit}
                      style={{
                        fontSize: "30px",
                        marginLeft: "10px",
                        cursor: "pointer",
                        color: "blue",
                      }}
                      onClick={() => handleEditar(empleado)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Departamentos;
