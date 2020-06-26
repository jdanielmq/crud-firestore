import React from 'react';
import { firebase } from './firebase'



function App() {

  const [tareas, setTareas] = React.useState([]);
  const [tarea,setTarea] = React.useState('');

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

  const agregarTarea = async (e) => {
    e.preventDefault();
    console.log(tarea);
    if(!tarea.trim()){
      console.log('Debe ingresar una tarea.');
      return ;
    }

    try {
        const db = firebase.firestore();
        const nuevaTarea = {
          name: tarea,
          fecha: Date.now()
        }

        const data = await db.collection('tareas').add(nuevaTarea);

        setTareas([
          ...tareas,
          {...nuevaTarea, id: data.id}
        ]);
        
        setTarea('');
      
    } catch (error) {
      console.log(error);
    }


  }


  return (
    <div className="container">
      <h1 className="text-center">Proyecto Crud Firestore</h1>
        <br/>
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
              <h3>Formulario</h3>
              <form onSubmit={ agregarTarea }>
                <input 
                    type="text" 
                    placeholder = "Ingrese tarea"
                    className="form-control mb-2"
                    onChange = {e => setTarea(e.target.value)}
                    value = { tarea }
                    />
                <button className="btn btn-dark btn-block" type="submit"> Agregar </button>
              </form>
          </div>
        </div>


    </div>
  );
}

export default App;
