import React from "react";
import firebaseApp from "../firebase/credenciales";
import { browserPopupRedirectResolver, getAuth , signOut} from "firebase/auth";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
const auth = getAuth(firebaseApp);




function Inicio({user}) {
  return (
    <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f5f5f5",
        
    }}>
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "15vh",
            width: "50vw",
            backgroundColor: "#0080ff",
            color: "#fff",
            borderRadius: "0.5rem",



        }}>
        <h1 style={{
            color: "#000",
            fontSize: "3rem",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            textTransform: "uppercase",
            letterSpacing: "0.2rem",
            textAlign: "center",

        }}>MENU</h1>
        </div>
        <Container style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "30vh",
            width: "100vw",
            backgroundColor: "#f5f5f5",
            marginTop: "5rem",
        }}>
            <button style={{
                backgroundColor: "#000",
                color: "#fff",
                fontSize: "1.5rem",
                marginTop: "5rem",
                borderRadius: "0.5rem",  
                fontWeight: "bold",
                fontFamily: "sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.2rem",
                textAlign: "center",
                

            }}>
                <Link to="/jefe" style={{
                    color: "#fff",
                    textDecoration: "none",
                }}>Administracion de Tickets</Link>

            </button>
            <button style={{
                backgroundColor: "#000",
                color: "#fff",
                fontSize: "1.5rem",
                marginTop: "5rem",
                borderRadius: "0.5rem",  
                fontWeight: "bold",
                fontFamily: "sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.2rem",
                textAlign: "center",
                

            }}>
                <Link to="/administracion" style={{
                    color: "#fff",
                    textDecoration: "none",
                }}>Administracion de Usuarios</Link>
            </button>
            <button style={{
                backgroundColor: "#000",
                color: "#fff",
                fontSize: "1.5rem",
                marginTop: "5rem",
                borderRadius: "0.5rem",  
                fontWeight: "bold",
                fontFamily: "sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.2rem",
                textAlign: "center",
            }}>
                <Link to="/departamentos" style={{
                    color: "#fff",
                    textDecoration: "none",
                }}> Registro de Departamentos</Link>
            </button>
            <button style={{
                backgroundColor: "#000",
                color: "#fff",
                fontSize: "1.5rem",
                marginTop: "5rem",
                borderRadius: "0.5rem",
                fontWeight: "bold",
                fontFamily: "sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.2rem",
                textAlign: "center",
            }}>
                <Link to="/comentarios" style={{
                    color: "#fff",
                    textDecoration: "none",
                }}>Comentarios</Link>
            </button>
            <button onClick={()=>signOut(auth)}>
                auth
            </button>
        </Container>
    </div>
  );
}

export default Inicio;











