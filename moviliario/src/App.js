import './App.css';
import { useState } from "react";
import Mobiliario from './Components/Mobiliario';

function App() {

  const [mobiliarios, setMobiliarios] = useState(null);
 
  const repApi = async () => {
    const api = await fetch("http://localhost:8080/api/mobiliario/listadoMobiliario");
    const listado = await api.json();
    setMobiliarios(listado)
  }

  return (
    <div className="App">
      <header className="App-header">
        
        {mobiliarios ? (
          <Mobiliario mobiliarios={mobiliarios} setMobiliarios={setMobiliarios}/>
        ) : (
          <>
            <h1>Moviliario</h1>
            <button  class="btn btn-success" onClick={repApi}>
              Listar moviliario
            </button> 
          </>
        )}
      </header>
    </div>
  );
}

export default App;
