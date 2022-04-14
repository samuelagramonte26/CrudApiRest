import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'


const Table = (props)=>{
return(
    <table className="table table-hover">
    <thead className="table-dark">
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Edad</th>
        <th>Sexo</th>
        <th>Acciones</th>
      </tr>
    </thead>

    <tbody>
      {
        props.personas.map(persona => {
          return (
            <tr key={persona.id}>
              <td>{persona.id}</td>
              <td>{persona.nombre}</td>
              <td>{persona.apellido}</td>
              <td>{persona.edad}</td>
              <td>{(persona.sexo === "1") ? 'M' : (persona.sexo === '2') ? 'F' : persona.sexo}</td>
              <td>
                <button className="btn btn-warning" onClick={() => props.handleEdit(persona)} ><i className="bi bi-pencil-square"></i>Editar</button>{"  "}
                <button onClick={() => props.eliminar(persona.id)} className="btn btn-danger" ><i className="bi bi-trash3"></i>Eliminar</button>
              </td>
            </tr>
          )
        })
      }
    </tbody>
  </table>
)
}
export default Table;

