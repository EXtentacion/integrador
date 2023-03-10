import React, { useState, useEffect } from 'react';

function Comcliente() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://sheetdb.io/api/v1/zz2v9d1w4qbg2')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NOMBRE</th>
            <th>DETALLE</th>
            <th>ESTATUS</th>
            <th>COMENTARIO</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.nombre}</td>
              <td>{item.detalle}</td>
              <td>{item.estatus}</td>
              <td>{item.comentario}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Comcliente;
