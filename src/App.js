import { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';


function App() {

  const[nombreIntegrante, setNombreIntegrante] = useState("");
  const[codigoIntegrante, setCodigoIntegrante] = useState(0);
  const[rolIntegrante, setrolIntegrante] = useState("");
  const[nuevoNombre, setNuevoNombre] = useState("");

  const [listaIntegrantes, setListaIntegrantes] = useState([])
  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response)=>{
      setListaIntegrantes (response.data);
    })
  }, [])

  const registrar = () =>{
    Axios.post("http://localhost:3001/insert", {
      nombreIntegrante: nombreIntegrante,
      codigoIntegrante: codigoIntegrante,
      rolIntegrante: rolIntegrante,
    });
  };

  const actualizarNombre = (id) => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      nuevoNombre: nuevoNombre,
    });
  };

  const eliminarNombre = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`, {
    });
  };

  return (
    <div className="App">
      <h1>Integrantes</h1>
      <label>Nombre</label>
      <input type="text"
      onChange={(event) => {
        setNombreIntegrante(event.target.value);
      }
      }/>
      <label>Codigo</label>
      <input type="number" onChange={(event) => {
        setCodigoIntegrante(event.target.value);
      }
      }/>
      <label>Rol</label>
      <input type="text" onChange={(event) => {
        setrolIntegrante(event.target.value);
      }
      }/>
      <button onClick={registrar}>Registrar</button>

      <h1>Lista de integrantes</h1>

      {listaIntegrantes.map((val, key)=> {
        return  <div className="user" key={key}>
                  <h1>Nombre: {val.nombreIntegrante}</h1>
                  <h1>Codigo: {val.codigoIntegrante}</h1>
                  <h1>Rol: {val.rolIntegrante}</h1>
                  <input type="text" placeholder="Nuevo Nombre"
                  onChange={(event) => {
                    setNuevoNombre(event.target.value);
                  }}
                  />
                  <button onClick={() => actualizarNombre(val._id)}>Update</button>
                  <button onClick={() => eliminarNombre(val._id)}>Eliminar participante</button>
                </div>
      })}

    </div>
  );
}

export default App;
