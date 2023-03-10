import React, { useState,useEffect } from 'react';
import axios from 'axios';
import firebaseApp from '../firebase/credenciales';
import {getAuth,onAuthStateChanged, signOut} from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faUserCog } from '@fortawesome/free-solid-svg-icons';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';


const auth = getAuth(firebaseApp);

<FontAwesomeIcon icon={faTicketAlt} />


function Cliente() {
  
  const [data, setData] = useState([]);
  const [supportAuxiliaries, setSupportAuxiliaries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    ID: '',
    NOMBRE: '',
    DETALLE: '',
    ESTATUS: '',
    COMENTARIO: '',
  });


  useEffect(() => {
    const db = getFirestore();
    const auxiliariesRef = collection(db, 'usuarios'); // Cambia 'users' por el nombre de la colección que almacena los usuarios en Firestore

    const q = query(auxiliariesRef, where('rol', '==', 'AutorDelCliente')); // Cambia 'role' por el nombre del campo que almacena el rol del usuario en Firestore

    getDocs(q)
      .then((querySnapshot) => {
        const auxiliaries = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          auxiliaries.push({
            value: data.correo, // Cambia 'email' por el nombre del campo que almacena el correo electrónico del usuario en Firestore
            label: data.Nombre, // Cambia 'displayName' por el nombre del campo que almacena el nombre del usuario en Firestore
          });
        });
        setSupportAuxiliaries(auxiliaries);
      })
      .catch((error) => {
        console.error('Error getting documents: ', error);
      });
  }, []);






  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleNameChange = (selectedOption) => {
    // Obtenemos el valor del campo Correo del usuario seleccionado
    const selectedUser = supportAuxiliaries.find(
      (user) => user.label === selectedOption.label
    );
    setFormData({
      ...formData,
      NOMBRE: selectedOption.label,
      ID: selectedUser.value,
    });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://sheetdb.io/api/v1/xyo06rvk50u2q', formData)
      .then(res => {
        alert('Comentario enviado');
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
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100px',
        backgroundColor: '#f2f2f2',

      }}>
      <FontAwesomeIcon icon={faComment} style={{
        fontSize: '3rem',
        color: '#0080ff',
        marginLeft: '50px',
      }}/>
        <h1 style={{
          marginLeft: '50px',
        }}>COMENTARIOS DASHBOARD</h1>
        <button style={{
          marginRight: '50px',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }} onClick={()=> signOut(auth)}>
          <FontAwesomeIcon icon={faUser} style={{
            fontSize: '3rem',
            color: '#0080ff',
            marginLeft: '700px',
          }} onClick={()=>signOut(
            auth
              
          )}/>
        </button>

      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '200px',
      }}>
      <FontAwesomeIcon icon={faUserCog} style={{
        fontSize: '3rem',
        color: '#0080ff'
      }}/>
      <h1 style={{
        marginLeft: '20px',
      }}>COMENTARIOS A CLIENTES</h1>
      </div>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '50px'
    }}>

      <table style={{
        border: '1px solid black'

      }}>
        <thead style={{
          backgroundColor: '#0080ff',
          color: 'white',
        }}>
          <tr style={{
            height: '50px',

          }}>
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
              <td>{row.DETALLE}</td>
              <td style={{
                width: '200px',
              }}>{row.NOMBRE}</td>
              <td>{row.ESTATUS}</td>
              <td>{row.COMENTARIO}</td>
              <td><button onClick={() => handleDelete(index)}>Eliminar</button></td>
            </tr>
          ))}
          {tableData.map((rowData, index) => (
  <tr key={index}>
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
        style={{
          width: '200px',
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
          <button onClick={handleSubmit}></button>
      </td>
    <td>
      <button onClick={() => setTableData(tableData.filter((_, i) => i !== index))}>Eliminar fila</button>
    </td>
  </tr>
))}
          <tr>
            <td style={{
              width: '200px',
            }}>
              <select name="NOMBRE" value={formData.NOMBRE} onChange={handleChange} style={{
                width: '200px',
              }}>
              {supportAuxiliaries.map((auxiliary) => (
                          <option key={auxiliary.value} value={auxiliary.value}>
                            {auxiliary.label}
                          </option>
                        ))}
                </select>
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
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '30px',
    }}>
    </div>
    </div>
  );
}

export default Cliente;

