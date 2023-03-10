import React from "react";
import firebaseApp from "../firebase/credenciales";
import {  getAuth } from "firebase/auth";
import Auxiliar from "./Auxiliar";
import Cliente from "./Cliente";
import Inicio from "./Inicio";
const auth = getAuth(firebaseApp);

function Home({user}) {
  return (
    <div>
        {user.rol === "JefeDeSoporte" && <Inicio/>}
        {user.rol === "AuxiliarDeSoporte" && <Auxiliar/>}
        {user.rol === "AutorDelCliente" && <Cliente/>}
    </div>
  )
}

export default Home