import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const Fabricante = () => {

  const url = 'http://localhost:8080/api/tareafinal'

  const [fabricantes, setfabricantes] = useState([])
  const [id, setId] = useState('')
  const [nombre, setNombre] = useState('')
  const [title, setTitle] = useState('')
  const [operacion, setOperacion] = useState('') // 1 = Agregar, 2 = Editar

  const [error, setError] = useState('');

  // ------------------------- Funcion para obtener las fabricantes ------------------------- //
  const getfabricantes = async () => {
    try {
      const response = await axios.get(`${url}/fabricantes`) 
      setfabricantes(response.data.fabricanteResponse.fabricanteEntityList)
      setError(response.data.metadata.dato);
      console.log(response.data.fabricanteResponse.fabricanteEntityList)
    }
    catch (error) {
      console.log(error)
    }
  }

  //------------------ funcion para elegir la operacion ------------------//
  const openModal = (op, id, nombre) => {
    //Seterar valors de los inputs
    setId('')
    setNombre('')
    setError(null)

    setOperacion(op)
    if (op === 1) {
      setTitle('Agregar fabricante')
    } else if (op === 2) {
      setTitle('Editar fabricante')
      setId(id)
      setNombre(nombre)
    }

    //focus en el input nombre
    document.getElementById('nombre').focus()  // es para que el cursor se posicione en el input nombre

  }


  //------------------ funcion para validar los campos ------------------//

  const validar = () => {
    if (nombre === '') {
      Swal.fire({
        text: 'Ingrese un nombre',
        icon: 'warning',
      })
    } else {
      if (operacion === 1) {
        agregarfabricante()
      } else if (operacion === 2) {
        updatefabricante()
      }
    }
  }

  //------------------ funcion para agregar fabricante ------------------//
  const agregarfabricante = async () => {
    Swal.fire({
      title: '¿Está seguro de agregar el fabricante?',
      text: nombre,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(`${url}/fabricantes`, {
            nombre: nombre,
          })
          console.log(response.data)
          await getfabricantes()
          // Restablece el estado del error
          setError(null);
          document.getElementById('btnCerrar').click()
        } catch (error) {
          // Maneja el error de la respuesta
          if (error.response && error.response.status ===
            500) {
            // Si el código de respuesta es 500, actualiza el estado del error
            setError("Ya existe un fabricante con ese nombre");
          } else {
            // Maneja otros errores si es necesario
            console.error("Error desconocido:", error);
          }
        }
      }
    })
  }

  // ----------- udpate fabricante ------------------//
  const updatefabricante = async () => {
    Swal.fire({
      title: '¿Está seguro de actualizar el fabricante?',
      text: nombre,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then(async (result) => { // async: es para que espere a que se ejecute await y luego continue el codigo
      if (result.isConfirmed) {
        try {
          const response = await axios.put(`${url}/fabricantes/${id}`, {
            nombre: nombre,
          })
          console.log(response.data)
          await getfabricantes()
          // Restablece el estado del error
          setError(null);
          document.getElementById('btnCerrar').click()
        } catch (error) {
          // Maneja el error de la respuesta
          if (error.response && error.response.status ===
            500) {
            // Si el código de respuesta es 500, actualiza el estado del error
            setError("Ya existe un fabricante con ese nombre");
          } else {
            // Maneja otros errores si es necesario
            console.error("Error desconocido:", error);
          }
        }
      }
    })
  }
  //------------------ Eliminar fabricante ------------------//

  const eliminarfabricante = async (fabricante) => {
    Swal.fire({
      title: `¿Está seguro de eliminar fabricante ? ${fabricante.nombre}`,
      text: fabricante.nombre,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`${url}/fabricantes/${fabricante.id}`) 
          console.log(response.data)
          await getfabricantes()
        } catch (error) {
          console.log(error)
        }
      }
    })
  }





  // ------------------------- Renderizar el listado fabricante  ------------------------- //
  useEffect(() => {
    getfabricantes()
  }, [])


  return (
    <>
      <div className="jumbotron container py-5">
          <h1 className="display-4">Página de Fabricantes</h1>
      </div>
      {/*  Boton de Agregar fabricantes */}
      <div className='container-fluid'>
        <div className='row mt-3'>
          <div className='col-md-4 offset-md-4'>
            <div className='d-grid mx-auto'>
              <button onClick={() => openModal(1)} className='btn btn-dark btn-block' data-bs-toggle='modal' data-bs-target='#modalfabricantes'>
                <i className='fa-solid fa-circle-plus'></i> Agregar fabricante
              </button>
            </div>
          </div>
        </div>

        {/*  Tabla de fabricantes */}
        <div className='col-md-8 offset-md-2 py-3'>
          <table className='table table-striped table-hover'>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th></th>
              </tr>
            </thead>
            <tbody className='table-group-divider'>
              {
                fabricantes.map((fabricante) => (
                  <tr key={fabricante.id}>
                    <td>{fabricante.id}</td>
                    <td>{fabricante.nombre}</td>
                    <td>
                      <button onClick={() => openModal(2, fabricante.id, fabricante.nombre)} className='btn btn-sm  btn-outline-warning mx-1' data-bs-toggle='modal' data-bs-target='#modalfabricantes' >
                        <i className='fa-solid fa-pencil'></i>
                      </button>
                      <button onClick={() => eliminarfabricante(fabricante)} className='btn btn-sm  btn-outline-danger '>
                        <i className='fa-solid fa-trash'></i>
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>

      {/*  Modal de fabricantes */}

      <div id='modalfabricantes' className='modal fade' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <label className='h5'>{title}</label>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            {/* Cuerpo del Modal */}
            <div className='modal-body'>
              {error && (
                <div style={{ color: 'red' }}>
                  {error}
                </div>
              )}
              <input type='hidden' id='id' value={id}></input>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className="fa-solid fa-user"></i></span>
                <input
                  type='text'
                  id='nombre'
                  className='form-control'
                  placeholder='Agrega un nombre fabricante'
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              {/* Boton Guardar */}
              <div className='d-grid col-6 mx-auto'>
                <button onClick={() => validar()} className='btn btn-success btn-block'>
                  <i className='fa-solid fa-save'></i> Guardar...
                </button>
              </div>
            </div>
            {/* Pie del Modal */}
            <div className='modal-footer'>
              <button id='btnCerrar' type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                <i className='fa-solid fa-window-close'></i> Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Fabricante