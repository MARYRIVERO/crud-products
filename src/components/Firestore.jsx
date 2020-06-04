import React from 'react'
import {db} from '../firebase'

const Firestore = (props) => {

    const [tareas, setTareas] = React.useState([])
    const [producto, setProducto] = React.useState('')
    const [descripcion, setDescripcion] = React.useState('')
    const [precio, setPrecio] = React.useState('') 
    const [modoEdicion, setModoEdicion] = React.useState(false)
    const [id, setId] = React.useState('')
  
  
    React.useEffect(() => {
  
      const obtenerDatos = async () => {
  
        try {
  
          const data = await db.collection(props.user.uid).get()
          const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          console.log(arrayData)
          setTareas(arrayData)
          
        } catch (error) {
          console.log(error)
        }
  
      }
  
      obtenerDatos()
  
    }, [props.user.uid])
  
    const agregar = async (e) => {
      e.preventDefault()
  
      if(!producto.trim()){
        console.log('está vacio')
        return
      }
  
      try {
  
        const nuevaTarea = {
          titulo: producto,
          descripcion: descripcion,
          precio: precio
        }
        const data = await db.collection(props.user.uid).add(nuevaTarea)
  
        setTareas([
          ...tareas,
          {...nuevaTarea, id: data.id}
        ])
  
        setProducto('')
        setDescripcion('')
        setPrecio('')
        
      } catch (error) {
        console.log(error)
      }
  
      console.log(producto)
    }
  
    const eliminar = async (id) => {
      try {
        
        await db.collection(props.user.uid).doc(id).delete()
  
        const arrayFiltrado = tareas.filter(item => item.id !== id)
        setTareas(arrayFiltrado)
  
      } catch (error) {
        console.log(error)
      }
    }
  
    const activarEdicion = (item) => {
      setModoEdicion(true)
      setProducto(item.titulo)
      setDescripcion(item.descripcion)
      setPrecio(item.precio)
      setId(item.id)
    }
  
    const editar = async (e) => {
      e.preventDefault()
      if(!producto.trim()){
        console.log('vacio')
        return
      }
      try {
        
        await db.collection(props.user.uid).doc(id).update({
          titulo: producto,
          descripcion: descripcion,
          precio: precio
        })
        const arrayEditado = tareas.map(item => (
          item.id === id ? {id: item.id, titulo: producto, descripcion: descripcion, precio: precio} : item
        ))
        setTareas(arrayEditado)
        setModoEdicion(false)
        setProducto('')
        setDescripcion('')
        setPrecio('')
        setId('')
      } catch (error) {
        console.log(error)
      }
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <h3>Lista de Productos</h3>
                    <table className= 'table table-striped'>
                        <tr>
                            <td>Titulo</td>
                            <td>Descripción</td>
                            <td>Precio</td>
                            <td>Opciones</td>
                        </tr>
                        {
                        tareas.map(item => (
                            <tr  key={item.id}>
                                
                            <td>{item.titulo}</td>
                            <td>{item.descripcion}</td>
                            <td>{item.precio}</td>

                            <td>
                            <button 
                                className="btn btn-danger btn-sm float-right"
                                onClick={() => eliminar(item.id)}
                            >
                                Eliminar
                            </button>
                            <button 
                                className="btn btn-warning btn-sm float-right mr-2"
                                onClick={() => activarEdicion(item)}
                            >
                                Editar
                            </button>
                            </td>
                            </tr>
                        ))
                        }
                    </table>
                </div>
                <div className="col-md-6">
                    <h3>
                        {
                        modoEdicion ? 'Editar Producto' : 'Agregar Producto'
                        }
                    </h3>
                    <form onSubmit={modoEdicion ? editar : agregar}>
                        <input 
                        type="text"
                        placeholder="Ingrese producto"
                        className="form-control mb-2"
                        onChange={e => setProducto(e.target.value)}
                        value={producto}
                        />
                        <input 
                        type="text"
                        placeholder="Ingrese descripcion"
                        className="form-control mb-2"
                        onChange={e => setDescripcion(e.target.value)}
                        value={descripcion}
                        />
                        <input 
                        type="text"
                        placeholder="Ingrese precio"
                        className="form-control mb-2"
                        onChange={e => setPrecio(e.target.value)}
                        value={precio}
                        />
                        <button 
                        className={
                            modoEdicion ? 'btn btn-warning btn-block' : 'btn btn-dark btn-block'
                        }
                        type="submit"
                        >
                        {
                            modoEdicion ? 'Editar' : 'Agregar'
                        }
                        </button>
                    </form>
                </div>
            </div> 
        </div>
    )
}

export default Firestore