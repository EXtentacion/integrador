import React, { useState } from 'react';
import firebaseApp from "../firebase/credenciales";
import {  getAuth , signOut} from "firebase/auth";
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';





const auth = getAuth(firebaseApp);

function Table2() {
  const [text, setText] = useState('');
  const [data, setData] = useState([
    {
        ID: '',
        Encargado: '',
        Observaciones: '',
        FechaFin: '',
    }
  ]);

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...data];
    list[index][name] = value;
    setData(list);
  };


  const handleAddClick = () => {
    setData([...data, { name: '', age: '', perro: '' }]);
  };




  const handleRemoveClick = index => {
    const list = [...data];
    list.splice(index, 1);
    setData(list);
  };

  const handleSaveClick = () => {
    const payload = data.map((item) => {
      return {
            ID: item.ID,
            Tipo: item.tipo,
            Descripcion: item.descripcion,
            FechaInicio: item.fechaInicio,
            FechaFin: item.FechaFin,
            Estado: item.estado,
            Encargado: item.Encargado,

      };
    });
  
    fetch('https://sheetdb.io/api/v1/5kbi02ol2tgy5', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };
  

  return (
    <div style={{
      marginTop: "50px",
    }}>
        <div>
            <h1 style={{
                textAlign: 'left',
                color: "#000",

            }}>Generar Reportes</h1>
        </div>
      <table className="my-table">
        <thead style={{
          backgroundColor: "#0080ff",
          color: "#fff",
          fontSize: "1rem",
        }}>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Descripcion</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Estado</th>
            <th>Encargado</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
                <tr key={index}>
                    <td>
                        <input  
                            type="text"
                            name="ID"
                            value={item.ID}
                            onChange={event => handleInputChange(event, index)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            name="tipo"
                            value={item.tipo}
                            onChange={event => handleInputChange(event, index)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            name="descripcion"
                            value={item.descripcion}
                            onChange={event => handleInputChange(event, index)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            name="fechaInicio"
                            value={item.fechaInicio}
                            onChange={event => handleInputChange(event, index)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            name="FechaFin"
                            value={item.FechaFin}
                            onChange={event => handleInputChange(event, index)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            name="estado"
                            value={item.estado}
                            onChange={event => handleInputChange(event, index)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            name="Encargado"
                            value={item.Encargado}
                            onChange={event => handleInputChange(event, index)}
                        />
                    </td>
                    <button 
                    style={{
                        marginLeft: "30px",
                        marginTop: "10px",
                    }}
                        onClick={() => [handleSaveClick(),
                            alert("Reporte generado con exito"),
                        ]}>
                        <FontAwesomeIcon icon={faNewspaper} />
                    </button>
                </tr>

            );
          })}
        </tbody>
      </table>
      <div
        style={{
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        <button
          onClick={handleAddClick}
          style={{
            backgroundColor: "#0080ff",
            color: "#fff",
            fontSize: "1rem",
            borderRadius: "0.5rem",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            textTransform: "uppercase",
            marginRight: "10px",

          }}
        >
            Agregar
        </button>
        <div style={{
            marginTop: "100px",

        }}/>
      </div>
    </div>
  );
}


export default Table2;