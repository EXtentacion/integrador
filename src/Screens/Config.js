import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  updateDoc, doc
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase/credenciales";


const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);


function Config() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedUser, setSearchedUser] = useState({});
  const [image, setImage] = useState(null);
  const [, set] = useState("");
  const [showAlert, setShowAlert] = useState(false);



  

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        setUserEmail(user.email);
      
        const usersRef = collection(firestore, "usuarios");
        const querySnapshot = await getDocs(
          query(usersRef, where("correo", "==", user.email))
        );
        const searchData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (searchData.length > 0) {
          setSearchedUser(searchData[0]);
          if (searchData[0].foto) {
            set(searchData[0].foto);
          }
        } else {
          setSearchedUser({});
        }
      }
      
    });
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      const usersRef = collection(firestore, "usuarios");
      const usersSnapshot = await getDocs(usersRef);
      const usersData = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const usersRef = collection(firestore, "usuarios");
        const querySnapshot = await getDocs(
          query(usersRef, where("correo", "==", userEmail))
        );
        const searchData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (searchData.length > 0) {
          setSearchedUser(searchData[0]);
        } else {
          setSearchedUser({});
        }
      } catch (error) {
        console.error(error);
      }
    };
    handleSearch();
  }, [userEmail]);


  const handleUpdateUser = async (event) => {
    event.preventDefault();
    try {
      if (image) {
        const storageRef = ref(
          storage,
          `users/${searchedUser.id}/profile-picture`
        );
        const uploadTask = uploadBytesResumable(storageRef, image);
        await uploadTask;
        const downloadURL = await getDownloadURL(storageRef);
        searchedUser.foto = downloadURL;
      }
  
      await updateDoc(doc(firestore, "usuarios", searchedUser.id), searchedUser);
    } catch (error) {
      console.error(error);
    }
  };
  
  

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "50px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "50px",
        }}
      >
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            backgroundColor: "gray",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {image ? (
            <img
              src={image ? URL.createObjectURL(image) : null}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : null}
        </div>
        <h1>Bienvenido, {searchedUser.Nombre}!</h1>
      </div>
      <div>
        <form
          onSubmit={handleUpdateUser}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "300px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label htmlFor="nombre">Nombre:</label>
          <input
            style={{
              textAlign: "center",
              width: "300px",
              height: "30px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              padding: "0 10px",
            }}
            type="text"
            id="nombre"
            defaultValue={searchedUser.Nombre}
            onChange={(event) =>
              setSearchedUser((prevState) => ({
                ...prevState,
                Nombre: event.target.value,
              }))
            }
          />
          <label htmlFor="correo">Correo:</label>
          <input
            style={{
              textAlign: "center",
              width: "300px",
              height: "30px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              padding: "0 10px",
            }}
            type="text"
            id="correo"
            defaultValue={searchedUser.correo}
            onChange={(event) => {
              const emailRegex = /\S+@\S+\.\S+/; // expresión regular para validar el formato de correo electrónico
              const newEmail = event.target.value;
              if (emailRegex.test(newEmail)) {
                setSearchedUser((prevState) => ({
                  ...prevState,
                  correo: newEmail,
                }));
              } else {
                // el valor ingresado no es un formato de correo electrónico válido, se puede mostrar un mensaje de error o tomar otra acción apropiada
                
              }
            }}
          />

          <label htmlFor="rol">Rol:</label>
          <input
            style={{
              textAlign: "center",
              width: "300px",
              height: "30px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              padding: "0 10px",
            }}
            type="text"
            id="rol"
            defaultValue={searchedUser.rol}
            onChange={(event) =>
              setSearchedUser((prevState) => ({
                ...prevState,
                rol: event.target.value,
              }))
            }
          />
          <label htmlFor="genero">Genero:</label>
          <select
            style={{
              textAlign: "center",
              width: "300px",
              height: "30px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              padding: "0 10px",
            }}
            id="genero"
            defaultValue={searchedUser.genero}
            onChange={(event) =>
              setSearchedUser((prevState) => ({
                ...prevState,
                genero: event.target.value,
              }))
            }
          >
            <option value={null}>-----------</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
          <label htmlFor="telefono">Telefono:</label>
          <input
            style={{
              textAlign: "center",
              width: "300px",
              height: "30px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              padding: "0 10px",
            }}
            type="text"
            id="telefono"
            defaultValue={searchedUser.telefono}
            onChange={(event) =>
              setSearchedUser((prevState) => ({
                ...prevState,
                telefono: event.target.value,
              }))
            }
          />
          <label htmlFor="foto">Foto:</label>
          <input
            type="file"
            onChange={(event) => setImage(event.target.files[0])}
          />
          {/* Add more fields here... */}
          <button
            type="submit"
            onClick={() => alert("Se han guardado los cambios")}
          >
            Guardar cambios
          </button>
        </form>
      </div>
    </div>
  );
}


export default Config;
