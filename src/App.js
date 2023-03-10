import React,{useState} from "react";
import { BrowserRouter ,Routes, Route,Link } from "react-router-dom";
import  firebaseApp  from './firebase/credenciales';
import {getAuth,onAuthStateChanged, signOut} from "firebase/auth";
import {getFirestore,doc,getDoc} from 'firebase/firestore'
import { Contact } from "./Screens/Contact";
import Home from "./Screens/Home";
import Inicio from "./Screens/Inicio";
import Cliente from "./Screens/Cliente";
import Jefe from "./Screens/Jefe";
import Departamentos from "./Screens/Departamentos";
import Administracion from "./Screens/Administracion";
import Comentarios from "./Screens/Comentarios";
import Reportes from "./Screens/Reportes";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);




function App() {
  
  const [user , setUser] = useState(null);

  async function getRol(uid){
     const docRef = doc(firestore, `usuarios/${uid}`);
     const docSnapCifrada = await getDoc(docRef);
     const docSnap = docSnapCifrada.data().rol;
     return docSnap;
  }

  function getUserData(usuarioFirebase){
    getRol(usuarioFirebase.uid).then((rol)=>{
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        rol: rol
      }
      setUser(userData);
      console.log('User Data Final ',userData);
    })
  }
  
  
  onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
       if (!user) {
        getUserData(usuarioFirebase);
       }
      } else {
        setUser(null);
      }
  });


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Home user={user} /> : <Contact />} />
        <Route path="/jefe" element={<Jefe/>} />
        <Route path="/administracion" element={<Administracion/>}/>
        <Route path="/departamentos" element={<Departamentos/>} />
        <Route path="/comentarios" element={<Comentarios/>} />
        <Route path="/reportes" element={<Reportes/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

