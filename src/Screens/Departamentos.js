import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faSave, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

function Departamentos() {
  const [empleados, setEmpleados] = useState([]);
  const [editando, setEditando] = useState({});
  
  useEffect(() => {
    fetch('https://sheetdb.io/api/v1/bb3a2w5pl600v')
      .then(response => response.json())
      .then(data => {
        setEmpleados(data);
      });
  }, []);
  
  
  
  const handleEditar = (empleado) => {
    setEditando(empleado);
  };

  const handleChange = (campo, valor) => {
    setEditando({
      ...editando,
      [campo]: valor
    });
  }

  const handledGuradar = (num) => {
    fetch(`https://sheetdb.io/api/v1/bb3a2w5pl600v/NOMBRE/${num}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          ID: editando.ID,
          NOMBRE: editando.NOMBRE,
          DEPARTAMENTO: editando.DEPARTAMENTO,
          OCUPACION: editando.OCUPACION
        }
      })
    })
    .then((response) => response.json())
    .then((data) => alert(data));
  }



  const handleAgregarFila = () => {
    const nuevoEmpleado = {
      ID: '',
      NOMBRE: '',
      DEPARTAMENTO: '',
      OCUPACION: ''
    };
    setEmpleados([...empleados, nuevoEmpleado]);
  };

  const handleEliminar = (num) => {
    fetch(`https://sheetdb.io/api/v1/bb3a2w5pl600v/NOMBRE/${num}`, {
      method: 'DELETE'
    })
    .then((response) => response.json())
    .then((data) => alert(data));
  }

  const handleSubmit = () => {
    const dataToSend = empleados.map(({ ID, ...rest }) => rest); // Eliminar campo ID
    fetch('https://sheetdb.io/api/v1/bb3a2w5pl600v', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
    .then((response) => response.json())
    .then((data) => alert(data));
  };



  return (
    <div>
      <div style={{    
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 0, 0.5)',
      }}>
        <table style={{
          border: '1px solid black',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          borderRadius: '10px',
          padding: '10px',
          margin: '10px',
        }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>NOMBRE</th>
              <th>DEPARTAMENTO</th>
              <th>OCUPACION</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado) => (
              <tr key={empleado.ID}>
                <td>
                  {editando.ID === empleado.ID ? (
                    <input
                      type="text"
                      value={editando.ID}
                      onChange={(e) => handleChange('ID', e.target.value)}
                    />
                  ) : (
                    empleado.ID
                  )}
                </td>
                <td>
                  {editando.ID === empleado.ID ? (
                    <input
                      type="text"
                      value={editando.NOMBRE}
                      onChange={(e) => handleChange('NOMBRE', e.target.value)}
                    />
                  ) : (
                    empleado.NOMBRE
                  )}
                </td>
                <td>
                  {editando.ID === empleado.ID ? (
                    <input
                      type="text"
                      value={editando.DEPARTAMENTO}
                      onChange={(e) => handleChange('DEPARTAMENTO', e.target.value)}
                    />
                  ) : (
                    empleado.DEPARTAMENTO
                  )}
                </td>
                <td>
                  {editando.ID === empleado.ID ? (
                    <input
                      type="text"
                      value={editando.OCUPACION}
                      onChange={(e) => handleChange('OCUPACION', e.target.value)}
                    />
                  ) : (
                    empleado.OCUPACION
                  )}
                </td>
                <td>
                  {editando.ID === empleado.ID ? (
                    <button onClick={() => handledGuradar(empleado.NOMBRE)}>
                      <FontAwesomeIcon icon={faSave} />
                    </button>
                  ) : ( 
                    <button onClick={() => handleEditar(empleado)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  )}
                  <button onClick={() => handleEliminar(empleado.NOMBRE)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
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
   
