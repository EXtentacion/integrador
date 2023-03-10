import React, { useState } from 'react';
import firebaseApp from "../firebase/credenciales";
import {  getAuth , signOut} from "firebase/auth";
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid';



const auth = getAuth(firebaseApp);

function Table() {
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
        Encargado: item.name,
        Observaciones: item.age,
        FechaFin: item.perro,
      };
    });
  
    fetch('https://sheetdb.io/api/v1/d88j2miuh1pp5', {
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
      <table className="my-table">
        <thead style={{
          backgroundColor: "#0080ff",
          color: "#fff",
          fontSize: "1rem",
        }}>
          <tr>
            <th>ID</th>
            <th>Encargado</th>
            <th>Observaciones</th>
            <th>FechaFin</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
                <tr key={index}>
                    <td>
                        <input type="text" name="ID" value={item.ID} onChange={event => handleInputChange(event, index)} />
                    </td>
                    <td>
                        <select>
                            <option value="1">Juan</option>
                            <option value="2">Pedro</option>
                            <option value="3">Maria</option>
                        </select>
                    </td>
                    <td>
                        <input type="text" name="age" value={item.age} onChange={event => handleInputChange(event, index)} />
                    </td>
                    <td>
                        <input type="text" name="perro" value={item.perro} onChange={event => handleInputChange(event, index)} />
                    </td>
                    <button 
                    style={{
                        marginLeft: "30px",
                        marginTop: "10px",
                    }}
                        onClick={() => handleRemoveClick(index)}>
                        Eliminar
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
        <button
            onClick={handleSaveClick}
            style={{
                backgroundColor: "#0080ff",
                color: "#fff",
                fontSize: "1rem",
                borderRadius: "0.5rem",
                fontWeight: "bold",
                fontFamily: "sans-serif",
                textTransform: "uppercase",
                marginRight: "500px",
                }}
        >
            Guardar
        </button>
      </div>
    </div>
  );
}


export default Table;
