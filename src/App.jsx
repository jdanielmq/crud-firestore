import React from 'react';
import { firebase } from './firebase'



function App() {

  React.useEffect(() => {

    const obtenerDatos = async () => {
      const db = firebase.firestore();  
      try {
            const data = await db.collection('tareas').get();
            console.log(data.docs);
        } catch (error) {
          console.log(error);
        }
    }
    obtenerDatos();
  }, [])

  return (
    <div className="container">
      <h1 className="text-center">Proyecto Crud Firestore</h1>
    </div>
  );
}

export default App;
