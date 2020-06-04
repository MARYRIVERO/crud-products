import React from 'react'
import {db, storage} from '../firebase'
import '../styles/firestore.css'

const Firestore = (props) => {

    const [listado, setListado] = React.useState([])
    const [producto, setProducto] = React.useState('')
    const [descripcion, setDescripcion] = React.useState('')
    const [precio, setPrecio] = React.useState('')
    const [image, setImage] = React.useState(null);
    const [url, setUrl] = React.useState("");
    const [progress, setProgress] = React.useState(0);
    const [modoEdicion, setModoEdicion] = React.useState(false)
    const [errores, setErrores] = React.useState(null)
    const [id, setId] = React.useState('')
  
  
    React.useEffect(() => {
  
      const obtenerDatos = async () => {
  
        try {
  
          const data = await db.collection(props.user.uid).get()
          const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          console.log(arrayData)
          setListado(arrayData)
          
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
        setErrores('Por favor complete los campos')
        return
      }
      if(!descripcion.trim()){
        console.log('está vacio')
        setErrores('Por favor complete los campos')
        return
      }
      if(!precio.trim()){
        console.log('está vacio')
        setErrores('Por favor complete los campos')
        return
      }
      if(!url.trim()){
        console.log('está vacio')
        setErrores('Por favor complete los campos')
        return
      }
      setErrores('')
  
      try {
  
        const nuevaTarea = {
          titulo: producto,
          descripcion: descripcion,
          precio: precio,
          image: url
        }
        const data = await db.collection(props.user.uid).add(nuevaTarea)
  
        setListado([
          ...listado,
          {...nuevaTarea, id: data.id}
        ])
  
        setProducto('')
        setDescripcion('')
        setPrecio('')
        setImage('')
        setUrl('')
        
      } catch (error) {
        console.log(error)
      }
  
      console.log(producto)
    }
  
    const eliminar = async (id) => {
      try {
        
        await db.collection(props.user.uid).doc(id).delete()
  
        const arrayFiltrado = listado.filter(item => item.id !== id)
        setListado(arrayFiltrado)
  
      } catch (error) {
        console.log(error)
      }
    }
  
    const activarEdicion = (item) => {
      setModoEdicion(true)
      setProducto(item.titulo)
      setDescripcion(item.descripcion)
      setPrecio(item.precio)
      setImage(item.image)
      setUrl(item.url)
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
          precio: precio,
          image:url
        })
        const arrayEditado = listado.map(item => (
          item.id === id ? {id: item.id, titulo: producto, descripcion: descripcion,
          precio: precio, image:image} : item
        ))
        setListado(arrayEditado)
        setModoEdicion(false)
        setProducto('')
        setDescripcion('')
        setPrecio('')
        setImage('')
        setUrl('')
        setId('')
      } catch (error) {
        console.log(error)
      }
    }




  const handleChange = async(e) => {
    e.preventDefault()
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setUrl(url);
          });
      }
    );
  };

  console.log("image: ", image);




    return (
        <div>
            <div className="row ">
                <div className="col-md-6 fondo linea-derecha">
                    <h3>Lista de Productos</h3>
                    <div className= 'table-responsive'>
                        <table className= 'table table-striped '>
                            <tr>
                                <td>Titulo</td>
                                <td>Descripción</td>
                                <td>Precio</td>
                                <td>Imagen</td>
                                <td>Opciones</td>
                            </tr>
                            {
                              listado.map(item => (
                                <tr  key={item.id}>
                                    
                                <td>{item.titulo}</td>
                                <td>{item.descripcion}</td>
                                <td>{item.precio}</td>
                                <td>
                                  <img className= 'imagenes' src={item.image} alt="firebase" />
                                </td>
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
                </div>
                <div className="col-md-6 fondo">
                    <h3>
                        {
                        modoEdicion ? 'Editar Producto' : 'Agregar Producto'
                        }
                    </h3>
                    <form onSubmit= 
                        {
                          modoEdicion ? editar : agregar
                        }
                        >
                        {
                            errores ? (
                                <div className="alert alert-danger">
                                    {errores}
                                </div>
                            ) : null
                        }
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
                        {/* <div className= 'form-group'>
                          <label>Agregar Imagen</label>
                          <input 
                            type="file"
                            placeholder="Ingrese imagen"
                            className="form-control"
                            name='foto'
                            id='foto'
                          />
                        </div> */}
                      <div>
                          <progress value={progress} max="100" />
                          <br />
                          <br />
                          <input type="file" onChange={handleChange} />
                          <button onClick={handleUpload}>Subir</button>
                          <br />
                          <br />
                          <img className= 'imagenes' src={url || "http://via.placeholder.com/150"} 
                          alt="firebase" />
                      </div>

                        <button 
                        className=
                        {
                            modoEdicion ? 'btn btn-warning btn-block mb-2' : 'btn btn-dark btn-block mb-2'
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
