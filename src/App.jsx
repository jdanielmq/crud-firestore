import React from 'react';
import { firebase } from './firebase'



function App() {

  const [tareas, setTareas] = React.useState([]);
  const [tarea,setTarea] = React.useState('');
  const [modoEdicion, setModoEdicion] = React.useState(false);
  const [id, setId] = React.useState('');

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

  const eliminarTarea = async(id) => {
    try {
      const db = firebase.firestore()
      await db.collection('tareas').doc(id).delete();
      const arrayFiltrado = tareas.filter(item => item.id !== id)
      setTareas(arrayFiltrado);
      
    } catch (error) {
      console.log(error);
    }

  } 

  const activarEdicion = (item) => {
    try {
        setModoEdicion(true);
        setTarea(item.name);
        setId(item.id);

    } catch (error) {
      console.log(error);
    }

  }

  const editarTarea = async (e) => {
    e.preventDefault();
    if(!tarea.trim()){
      console.log(' tarea viene vacio');
      return;
    }
    
    try {
        const db = firebase.firestore();
        await db.collection('tareas').doc(id).update({
          name:tarea
        });

        const arrayEditado = tareas.map(item => (
          item.id === id ? {id:id, fecha:item.fecha, name: tarea} : item
        ));
        
        setTareas(arrayEditado);
        setTarea('');
        setId('');
        setModoEdicion(false);
        
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
                  
                  <button 
                    className="btn btn-danger btn-sm float-right" 
                    onClick={() => eliminarTarea(item.id)}
                    > Eliminar 
                    </button>
                    <button 
                    className="btn btn-warning btn-sm float-right mr-2" 
                    onClick={() => activarEdicion(item)}> Editar </button>
                  </li>
                ))
              }

            </ul>
             
          </div>
          <div className="col-md-6">
              <h3>
                {
                  modoEdicion ? 'Editar Tarea':'Agregar Tarea'
                }
              </h3>
              <form onSubmit={ modoEdicion ? editarTarea :agregarTarea }>
                <input 
                    type="text" 
                    placeholder = "Ingrese tarea"
                    className="form-control mb-2"
                    onChange = {e => setTarea(e.target.value)}
                    value = { tarea }
                    />
                <button className=
                  {
                    modoEdicion ? 'btn btn-warning btn-block' : 'btn btn-dark btn-block'
                  } 
                  type="submit"> 
                  {
                    modoEdicion ? 'Editar' : 'Agregar'
                  } 
                </button>
              </form>
          </div>
        </div>


    </div>
  );
}

export default App;
