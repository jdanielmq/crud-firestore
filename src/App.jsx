import React from 'react';
import { firebase } from './firebase'



function App() {

  const [tareas, setTareas] = React.useState([]);

  React.useEffect(() => {

    const obtenerDatos = async () => {
      const db = firebase.firestore();  
      try {
            const data = await db.collection('tareas').get();
            const arrayTareas = data.docs.map(doc => ({id:doc.id, ...doc.data()}))
            console.log(arrayTareas);
            setTareas(arrayTareas);
        } catch (error) {
          console.log(error);
        }
    }
    obtenerDatos();
  }, [])

  return (
    <div className="container">
      <h1 className="text-center">Proyecto Crud Firestore</h1>
        <div className="row">
          <div className="col-md-6">
            <ul className="list-group">
              Lista de Tareas
              {
                tareas.map(item => (
                  <li className="list-group-item" key={item.id}> 
                    {item.name}
                  </li>
                ))
              }

            </ul>
             
          </div>
          <div className="col-md-6">
              Formulario
          </div>
        </div>


    </div>
  );
}

export default App;
