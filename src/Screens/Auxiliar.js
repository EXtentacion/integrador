
import React, { useState } from 'react';
import AuxiliarComentario from './AuxiliarComentario';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faUserCog } from '@fortawesome/free-solid-svg-icons';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import firebaseApp from '../firebase/credenciales';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const auth = getAuth(firebaseApp);

//pendiente de implementar

function Auxiliar() {
  const [text, setText] = useState('');
  const [data, setData] = useState([
    {
      Tickets: '',
      Nombre: '',
      Edad: '',
      Apellido: '',
      Pajaro: '',
      Otro: '',
      comentario: ''
    }
  ]);

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...data];
    list[index][name] = value;
    setData(list);
  };

  const handleClick = () => {
    const payload = {
      Tickets: text
    };

    fetch('https://sheetdb.io/api/v1/5kbi02ol2tgy5', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
  };

  const handleAddClick = () => {
    setData([...data, { name: '', age: '', perro: '', gato: '', Pajaro: '', Otro: '', comentario: '' }]);
  };

  const handleRemoveClick = index => {
    const list = [...data];
    list.splice(index, 1);
    setData(list);
  };

  const handleSaveClick = () => {
    const payload = data.map(item => {
      return {
        Tickets: item.name,
        Edad: item.age,
        Perro: item.perro,
        Gato: item.gato,
        Pajaro: item.Pajaro,
        Otro: item.Otro,
        Comentario: item.comentario
      };
    });

    fetch('https://sheetdb.io/api/v1/5kbi02ol2tgy5', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
  };

  return (
    <div>
            <div
        style={{
          display: "flex",
          backgroundColor: "#f2f2f2",
          height: "140px",
          width: "100%",
        }}
      >
        <h1 style={{ marginLeft: "50px" ,
        marginTop: "50px",
        fontSize: "50px",
        color: "#0080ff",
      }}>RESOLUCION DE TICKETS</h1>
            <button onClick={() => signOut(auth)} 
        style={{
          marginLeft:'600px',
          marginTop: "80px",
          border: "none",
          borderRadius: "50%",
          width: "100px",
          height: "100px",
          backgroundColor: "#fff",
          border: "1px solid #0080ff",
        }}
        >
          <FontAwesomeIcon icon={faUser} style={{
            color: "#0080ff",
            fontSize: "40px",
          }}/>
        </button>
      </div>


     <AuxiliarComentario/>
     </div>
  );
}


export default Auxiliar;