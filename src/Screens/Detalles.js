import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';



function Detalles() {
  const [data, setData] = useState([{ ID: '', NOMBRE: '', DEPARTAMENTO: '', OCUPACION: '' }]);

  const handleAddRow = () => {
    const newRow = { ID: uuidv4(), NOMBRE: '', DEPARTAMENTO: '', OCUPACION: '' };
    setData([...data, newRow]);
  };
  
  

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...data];
    list[index][name] = value;
    setData(list);
  };  

  const handleSubmit = () => {
    const dataToSend = data.map(({ ID, ...rest }) => rest); // Eliminar campo ID
    fetch('https://sheetdb.io/api/v1/bb3a2w5pl600v/ID', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setData([{ ID: '', NOMBRE: '', DEPARTAMENTO: '', OCUPACION: '' }]);
      return alert('Datos guardados');
    })
    .catch(error => {
      console.error(error);
      return alert('Error al guardar los datos');
    });
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
            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
            width: '70%',
            height: '50%',
            marginTop: '100px',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'

      }}>
        <thead style={{
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
        }}>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Departamento</th>
            <th>Ocupación</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
                <td style={{
                    width: '35%'
                }}>
                    <input type="text" name="ID" value={row.ID} onChange={e => handleChange(e, index)} style={{
                        width: '97%'
                    }}/>
                </td>
                <td style={{
                    width: '35%'
                }}>
                    <input type="text" style={{
                        width: '97%'
                    }} name="NOMBRE" value={row.NOMBRE} onChange={e => handleChange(e, index)} />
                </td>
                <td style={{
                    width: '20%'
                }}>
                    <select name="DEPARTAMENTO" value={row.DEPARTAMENTO} onChange={e => handleChange(e, index)} style={{
                        width: '97%'
                    }}>
                        <option value="null">Selecciona un departamento</option>
                        <option value="Administracion">Compras</option>
                        <option value="Contabilidad">Contabilidad</option>
                        <option value="Produccion">Producción</option>
                        <option value="Logistica">Logistica</option>
                        <option value="Ventas">Ventas</option>

                    </select>
                </td>
                <td style={{
                    width: '50%'
                }}>
                    <input type="text"  style={{
                        width: '100%'
                    }} name="OCUPACION" value={row.OCUPACION} onChange={e => handleChange(e, index)} />
                </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',    
    }}>
        <button onClick={handleAddRow} style={{
            backgroundColor: '#0080ff',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '10px',
            padding: '10px',
            marginRight: '10px'
        }}>Agregar</button>
        <button onClick={handleSubmit} style={{
            backgroundColor: '#0080ff',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '10px',
            padding: '10px',
        }}>Enviar</button>
    </div>
    <div style={{
        height: '100px'

    }}></div>
    </div>
  );
}

export default Detalles;
