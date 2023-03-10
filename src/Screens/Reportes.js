import React, { useState, useRef,useEffect } from 'react';
import html2canvas from 'html2canvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketSimple } from '@fortawesome/free-solid-svg-icons';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from '../firebase/credenciales';
import axios from 'axios';


function Reportes() {
  const [id, setId] = useState('');
  const [fecha, setFecha] = useState('');
  const [clasificacion, setClasificacion] = useState('');
  const [nombre, setNombre] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [detalles, setDetalles] = useState('');
  const [email, setEmail] = useState('');
  const [Estatus, setEstatus] = useState('');
  const formRef = useRef(null);
  const contentRef = useRef(null);
  const [name, setName] = useState('');
  const [data, setData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    html2canvas(contentRef.current).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'reporte.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://sheetdb.io/api/v1/g44unceikdnjr/search?ID=${id}`);
      setData(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userEmail = user.email;
        setEmail(userEmail);
        const displayName = user.Nombre;
        setName(userEmail);
        document.title = `${userEmail} - DASHBOARD`;
      }
    });
    return unsubscribe;
  }, []);

  return (
    <form ref={contentRef}>
      <div
        style={{
          border: "1px solid black",
          padding: "100px",
          borderRadius: "10px",
          marginTop: "40px",
          width: "800px",
          marginLeft: "auto",
          marginRight: "auto",
          borderColor: "grey",
          backgroundColor: "#f4f4f4",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "-100px",
          }}
        >
          <FontAwesomeIcon
            icon={faTicketSimple}
            style={{ fontSize: "3rem" }}
            color="#0080ff"
          />
          <h1 style={{ marginLeft: "20px" }}>Macuin Dashboards</h1>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "50px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="id">ID:</label>
              <input
                type="text"
                id="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                style={{ border: "none", backgroundColor: "transparent" }}
              />
              <label
                htmlFor="fecha"
                style={{
                  marginTop: "10px",
                }}
              >
                FECHA:
              </label>
              <input
                type="date"
                id="fecha"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                style={{ border: "none", backgroundColor: "transparent" }}
              />
              <label
                htmlFor="clasificacion"
                style={{
                  marginTop: "10px",
                }}
              >
                CLASIFICACION:
              </label>
              <input
                type="text"
                id="clasificacion"
                value={clasificacion}
                onChange={(e) => setClasificacion(e.target.value)}
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  width: "250px",
                }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "200px",
            }}
          >
            <label htmlFor="nombre" style={{}}>
              NOMBRE:
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={{
                border: "none",
                backgroundColor: "transparent",
                width: "350px",
              }}
            />
            <label htmlFor="departamento" style={{ marginTop: "10px" }}>
              DEPARTAMENTO:
            </label>
            <select
              id="departamento"
              value={departamento}
              onChange={(e) => setDepartamento(e.target.value)}
              style={{
                border: "none",
                backgroundColor: "transparent",
                width: "350px",
                marginTop: "10px",
              }}
            >
              <option value="Compras">Compras</option>
              <option value="Asignado">Contabilidad</option>
              <option value="Logistica">En Proceso</option>
              <option value="Produccion">Produccion</option>
              <option value="Ventas">Ventas</option>
            </select>
          </div>
        </div>
        <div
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label
            htmlFor="detalles"
            style={{
              marginRight: "20px",
            }}
          >
            DETALLES:
          </label>
          <textarea
            id="detalles"
            value={detalles}
            onChange={(e) => setDetalles(e.target.value)}
            style={{
              width: "100%",
              height: "200px",
              border: "none",
              backgroundColor: "transparent",
              fontSize: "1rem",
              fontWeight: "bold",
              color: "#1E90FF",
              boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
              borderRadius: "5px",
              padding: "10px",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <label htmlFor="nombre">Estatus:</label>
          <select
              id="estatus"
              value={Estatus}
              onChange={(e) => setEstatus(e.target.value)}
              style={{
                border: "none",
                backgroundColor: "transparent",
                width: "350px",
                marginTop: "10px",
              }}
            >
              <option value={null}>---------------</option>
              <option value="Completado">Completado</option>
              <option value="Contabilidad">Asignado</option>
              <option value="En Proceso">En proceso</option>
              <option value="Nunca Solucionado">Nunca Solucionado</option>
              <option value="Cancelado por cliente">Cancelado por cliente</option>
            </select>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <button
            type="submit"
            onClick={handleSubmit}
            style={{
              marginTop: "20px",
              backgroundColor: "#1E90FF",
              color: "white",
              border: "none",
              padding: "10px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "bold",
              width: "200px",
              height: "50px",
              boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
            }}
          >
            Descargar formato
          </button>
        </div>
      </div>
    </form>
  );
  
}

export default Reportes;
