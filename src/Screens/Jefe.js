  import axios from 'axios';
  import post from 'axios';
  import React, { useState, useEffect } from 'react';
  import Table from './Table';
  import { faSearch } from '@fortawesome/free-solid-svg-icons'
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faUser } from '@fortawesome/free-solid-svg-icons';
  import Table2 from './Table2';
  import firebaseApp from '../firebase/credenciales';
  import { getAuth, signOut} from "firebase/auth";
  import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
  import DatePicker, { CalendarContainer } from 'react-datepicker';
  import { Link } from 'react-router-dom';


  const auth = getAuth(firebaseApp);
  const put = axios.put;

  function Jefe() {
    const [data, setData] = useState([]);
    const [text, setText] = useState('');
    const [supportAuxiliaries, setSupportAuxiliaries] = useState([]);
    const [encargado, setEncargado] = useState("");
    const [observaciones, setObservaciones] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [id, setId] = useState("");
    const [editingRow, setEditingRow] = useState(null);
    const [ticket, setTicket] = useState(null)
    const [showTicket, setShowTicket] = useState(true);
    const [num, setNum] = useState('');
    const [comentario, setComentario] = useState('');

    // ...
    

    
    


    const updateName = (num) => {
      fetch(`https://sheetdb.io/api/v1/g44unceikdnjr/ID/${num}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: {
            'ENCARGADO': encargado,
            'OBSERVACIONES': observaciones,
            'FECHA_FIN': fechaFin,
            'COMENTARIO': comentario
          }
        })
      })
      .then((response) => response.json())
      .then((data) => console.log(data));
    }
    
    

    const handleSearch = async () => {
      try {
        const response = await axios.get(`https://sheetdb.io/api/v1/g44unceikdnjr/search_or?ID=${text}`);
        setTicket(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    
    
    useEffect(() => {
      const db = getFirestore();
      const auxiliariesRef = collection(db, 'usuarios'); // Cambia 'users' por el nombre de la colección que almacena los usuarios en Firestore

      const q = query(auxiliariesRef, where('rol', '==', 'AuxiliarDeSoporte')); // Cambia 'role' por el nombre del campo que almacena el rol del usuario en Firestore

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

    
    const getData = async () => {
      try {
        const response = await axios.get('https://sheetdb.io/api/v1/g44unceikdnjr');
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    useEffect(() => {
      getData();
    }, []);


    return (
      <div>
        <div
          style={{
            display: "flex",
            backgroundColor: "#0080f0",
            height: "150px",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              marginLeft: "50px",
              fontSize: "50px",
              color: "#fff",
            }}
          >
            JEFE
          </h1>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              height: "40px",
              marginLeft: "800px",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#fff",
              
            }}
            placeholder="Buscar Ticket"
          />
          <button
            style={{
              marginRight: "1000px",
              width: "30px",
              height: "42px",
              backgroundColor: "#fff",
            }}
            onClick={handleSearch}
          >
            <FontAwesomeIcon
              icon={faSearch}
              style={{
                color: "#000",
              }}
            />
          </button>
        </div>
        <button
          onClick={() =>
            signOut(auth).then(() => {
              window.location.href = "/";
            })
          }
          style={{
            width: "90px",
            height: "90px",
            backgroundColor: "#f4f4f4",
            border: "none",
            borderRadius: "5px",
            marginLeft: "1300px",
            marginTop: "-150px",
          }}
        >
          <FontAwesomeIcon
            icon={faUser}
            style={{
              color: "#000",
              backgroundColor: "#fff",
              scale: "2",
            }}
          />
        </button>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            marginLeft: "10px",
            color: "#0080ff",
          }}
        >
          {ticket && showTicket && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f4f4f4",
                width: "500px",
                height: "550px",
                borderRadius: "20px",
              }}
            >
              <h2>Información del ticket {ticket.ID}</h2>
              <p>Tickets: {ticket.TICKETS}</p>
              <p>Autor: {ticket.AUTOR}</p>
              <p>Departamento: {ticket.DEPARTAMENTO}</p>
              <p>Fecha: {ticket.FECHA}</p>
              <p>Detalles: {ticket.DETALLES}</p>
              <p>Encargado: {ticket.ENCARGADO}</p>
              <p>Observaciones: {ticket.OBSERVACIONES}</p>
              <p>Fecha de finalización: {ticket.FECHA_FIN}</p>
              <p>Estatus: {ticket.ESTATUS}</p>
            </div>
          )}
          {!ticket && showTicket && <p>No se encontró el ticket.</p>}
          <button
            style={{
              marginBottom: "10px",
            }}
            onClick={() => setShowTicket(!showTicket)}
          >
            {showTicket ? "Ocultar Ticket" : "Mostrar Ticket"}
          </button>

          <h1>TABLA DE TICKETS</h1>
          <table>
            <thead
              style={{
                backgroundColor: "#0080ff",
                color: "#fff",
              }}
            >
              <tr>
                <th>ID</th>
                <th>TICKETS</th>
                <th>AUTOR</th>
                <th>DEPARTAMENTO</th>
                <th>FECHA</th>
                <th>DETALLES</th>
              </tr>
            </thead>
            <tbody>
              {data.map((rowData, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: "#f4f4f4",
                    color: "#000",
                  }}
                >
                  <td
                    style={{
                      width: "100px",
                    }}
                  >
                    {rowData.ID}
                  </td>
                  <td
                    style={{
                      width: "200px",
                    }}
                  >
                    {rowData.TICKETS}
                  </td>
                  <td
                    style={{
                      width: "200px",
                    }}
                  >
                    {rowData.AUTOR}
                  </td>
                  <td
                    style={{
                      width: "200px",
                    }}
                  >
                    {rowData.DEPARTAMENTO}
                  </td>
                  <td
                    style={{
                      width: "200px",
                    }}
                  >
                    {rowData.FECHA}
                  </td>
                  <td
                    style={{
                      width: "400px",
                    }}
                  >
                    {rowData.DETALLES}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        <h2 style={{
          color: "#0080ff",
          marginTop: "50px",
        }}>ASIGNACION DE TICKETS</h2>
          <table>
            <thead
              style={{
                backgroundColor: "#0080ff",
                color: "#fff",
              }}
            >
              <tr>
                {/* ... */}
                <th>ID</th>
                <th>ENCARGADO</th>
                <th>OBSERVACIONES</th>
                <th>FECHA FIN</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* ... */}
                <td>
                  <input
                    type="text"
                    value={num}
                    onChange={(e) => setNum(e.target.value)}
                    placeholder="ID"
                    style={{
                      width: "100px",
                      height: "100px",
                      textAlign: "center",
                    }}
                  />
                </td>
                <td>
                <select style={{
                        width: "200px",
                        height: "100px",
                      }}
                        value={encargado}
                        onChange={(e) => setEncargado(e.target.value)}
                      >
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
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                    placeholder="Observaciones"
                    style={{
                      width: "250px",
                      height: "100px",
                      textAlign: "center",
                    }}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                    placeholder="Fecha Fin"
                    style={{
                      width: "200px",
                      height: "100px",
                      textAlign: "center",
                    }}
                  />
                </td>
                <td>
                  <button
                    onClick={() => {
                      updateName(num);
                    }}
                    style={{
                      width: "200px",
                      height: "100px",
                      backgroundColor: "#0080ff",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                    }}
                    
                  >
                    Actualizar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <h3 style={{
            color: "#0080ff",
            marginTop: "50px",
          }}>COMENTARIOS A CLIENTES</h3>
          <table>
            <thead
              style={{
                backgroundColor: "#0080ff",
                color: "#fff",
              }}
            >
              <tr>
                {/* ... */}
                <th>ID</th>
                <th>COMENTARIO</th>

              </tr>
            </thead>
            <tbody>
              <tr>
                {/* ... */}
                <td>
                  <input
                    type="text"
                    value={num}
                    onChange={(e) => setNum(e.target.value)}
                    placeholder="ID"
                    style={{
                      width: "100px",
                      height: "100px",
                      textAlign: "center",
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    placeholder="Comentario"
                    style={{
                      width: "250px",
                      height: "100px",
                      textAlign: "center",
                    }}
                  />
                </td>
                <td>
                  <button
                    onClick={() => {
                      updateName(num);
                    }}
                    style={{
                      width: "200px",
                      height: "100px",
                      backgroundColor: "#000",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                    }}

                  >
                    Actualizar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{
            marginTop: "50px",
          }}>
            </div>
          <button style={{
            width: "200px",
            height: "50px",
            backgroundColor: "#0080ff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            marginTop: "50px",
          }}
          >
            <Link to="/reportes" style={{
              color: "#fff",
            }}>
              GENERAR REPORTE
            </Link>
          </button>
          <div style={{
            marginTop: "50px",
          }}>
            </div>
        </div>
      </div>
    );
  }

  export default Jefe;

          

