import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import TrackVisibility from 'react-on-screen';
import firebaseApp from "../firebase/credenciales";
import { getAuth ,createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth";
import {getFirestore,doc,setDoc} from "firebase/firestore";
const auth = getAuth(firebaseApp);


export const Contact = () => {
  const [isRegistrando, setIsRegistrando] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('');
  const [name, setName] = useState('');
  const firestore = getFirestore(firebaseApp);

  //juntar nombre y appellido en en una constante 



  function SubmitHandler(e){
    e.preventDefault();
    
    async function registrarUsuario(email,password,rol,name){
      const infoUsuario = await createUserWithEmailAndPassword(auth, email, password,name)
      .then((usuarioFirebase) => {
        // Signed in
        return usuarioFirebase;
        // ...
      })
      .catch((error) => {
        alert(error.message);
        // ..
      });
      console.log(infoUsuario.user.uid);

      const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`);
      setDoc(docuRef, {
        correo: email,
        rol: rol,
        Nombre: name
      });

    }



    console.log(email,password,rol,name);

    if(isRegistrando){
      registrarUsuario(email,password,rol,name)
    }else{
      //iniciar sesion
      signInWithEmailAndPassword(auth, email, password)

    }


  }

  return (
    <section style={{
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>

      <Container style={{
        width: "100%",
        maxWidth: "1200px",
        padding: "0 20px",

      }}>
        <Row style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",

        }}>
          <Col size={12} md={6} style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <TrackVisibility style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
              {({ isVisible }) => (
                <img 
                  style={{
                    width: "60%",
                    height: "100%",
                    objectFit: "contain",
                    opacity: isVisible ? 1 : 0,
                    transition: "opacity 1s",
                    
                  }}

                  src={contactImg}
                 
                />
              )}
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                
                }}
                >
                  <h2 style={{
                    fontSize: "2.5rem",
                    fontWeight: "700",
                    color: "#0080ff",
                    marginBottom: "20px",
                  }}>{isRegistrando ? "Registrate" : "Iniciar Sesión"}</h2>
                  <form onSubmit={SubmitHandler} style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  
                  }} >
                    <Row style={{
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                      {isRegistrando && (
                        <>
                          <Col size={12} sm={6} className="px-1" style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",

                          }}>
                            <input
                              style={{
                                width: "50%",
                                height: "50px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                padding: "0 10px",
                                marginBottom: "10px",
                                marginTop: "10px",
                                    
                              }}
                              type="text"
                              placeholder="NickName"
                              onChange={(e) => setName(e.target.value)}
                            />
                          </Col>
                        </>
                      )}

                      <Col size={12} sm={6} className="px-1" style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",


                      }}>
                        <input
                          style={{
                            width: "50%",
                            height: "50px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            padding: "0 10px",
                            marginBottom: "10px",
                            marginTop: "10px",
                              
                          }}
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Correo Electronico"
                        />
                      </Col>
                      <Col size={12} sm={6} className="px-1" style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",

                      }}>
                        <input
                          style={{
                            width: "50%",
                            height: "50px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            padding: "0 10px",
                            marginBottom: "10px",
                            marginTop: "10px",

                          }}
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Contraseña"
                        />
                      </Col>
                      {
                        isRegistrando && (
                          <Col size={100} sm={100} className="px-1" style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}>
                          <select 
                          
                            style={{
                              width: "50%",
                              height: "50px",
                              borderRadius: "5px",
                              border: "1px solid #ccc",
                              padding: "0 10px",
                              marginBottom: "10px",
                              marginTop: "10px",
                            }}
                            onChange={(e) => setRol(e.target.value)}
                          >
                            <option value="Cliente">----------------</option>
                            <option value="AuxiliarDeSoporte">Auxiliar de Soporte</option>
                            <option value="AutorDelCliente">Autor del Cliente</option>
                            <option value="JefeDeSoporte">Jefe de Soporte</option>
                          </select>
                        </Col>
                        )
                      }
                      <Col size={100} sm={100} className="px-1" style={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}>
                        <input
                          type="submit"
                          value={
                            isRegistrando ? "Registrarme" : "Iniciar Sesión"
                          }
                          style={{
                            width: "50%",
                            height: "60px",
                            borderRadius: "5px",
                            padding: "0 10px",
                            marginBottom: "10px",
                            marginTop: "10px",
                            backgroundColor: "#0080ff",
                            color: "#fff",
                            border: "none",

                          }}
                        />
                        <button
                          style={{
                            width: "50%",
                            height: "60px",
                            borderRadius: "5px",
                            padding: "0 10px",
                            marginBottom: "10px",
                            marginTop: "10px",

                          }}
                          onClick={() => setIsRegistrando(!isRegistrando)}
                        >
                          <span>
                            {isRegistrando
                              ? "Ya tengo una cuenta"
                              : "Quiero registrarme"}
                          </span>
                        </button>
                      </Col>
                    </Row>
                  </form>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
