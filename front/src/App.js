
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import Alert from './components/Alert';
import Modal from './components/Modal';
import Table from './components/Table';
import {GetData,DeleteData,PostData,PutData} from './provides/Api'
import {handleForm} from './provides/handle'



function App() {

  //Hooks
  const [personas, setPersonas] = useState([]);
  const [abrirM, setAbrirModal] = useState(false);
  const [accion, setAccion] = useState('');
  const [method, setMethod] = useState({ add: false, edit: false });
  const [personaDatos, setPersonaDatos] = useState({
    id: '',
    nombre: '',
    apellido: '',
    edad: '',
    sexo: ''
  })
  const cleanForm = {
    id: '',
    nombre: '',
    apellido: '',
    edad: '',
    sexo: ''
  }
  const [msjAlert, setMsjAlert] = useState({ status: false, msj: [], variant: null, header: null });
  let objAlert = {};
  useEffect(() => {
   GetData(setPersonas)
  }, [])
  const abrirModal = (accion) => {
    if (accion === "Agregar") {
      setMethod({ add: true, edit: false });
    }
    setAbrirModal(!abrirM);
    setAccion(accion);
    if (!abrirM) {
      setPersonaDatos(cleanForm);
    }
  }
  const handResult = (data) => {
    if (data.data.Status) {
      if (method.add) {
        setPersonas(personas.concat(data.data.persona))
      } else if (method.edit) {
        let index = 0;
        personas.map((persona, i) =>
          (persona.id === data.data.persona.id) ?
            index = i : null
        )
        let newdata = personas;
        newdata[index] = data.data.persona;
        setPersonas(newdata);
      }
      objAlert = { status: true, msj: [], variant: 'success', header: 'Exito' }
      objAlert.msj.push(data.data.Mensaje)
      setMsjAlert(objAlert);
      setAbrirModal(false)
      setTimeout(() => {
        setMsjAlert({ status: false, msj: [] })  
      }
        , 5000)
    } else {

      objAlert = { status: true, msj: [], variant: 'warning', header: 'Advertencia' }
      data.data.forEach(element => {
        objAlert.msj.push(element);
      });
      setMsjAlert(objAlert)
      setTimeout(() => {
        setMsjAlert({ status: false, msj: [] })
      }
        , 5000)
    }
    setMethod({ add: false, edit: false });

  }
  const handleChange = e => {
    const { name, value } = e.target;
    setPersonaDatos((datosPrevios) => ({
      ...datosPrevios,
      [name]: value
    }))
  }
  const handleEdit = (persona) => {
    setMethod({ add: false, edit: true });
    abrirModal('Editar');
    setPersonaDatos(persona);
  }
  const accionForm = () => {
    if (method.add) {
      PostData(handResult,handleForm(personaDatos));
    } else {
      PutData(personaDatos.id,handleForm(personaDatos),handResult);
    }
  }
  const eliminar = (id) => {
    if (window.confirm("Estas seguro que deseas eliminar este registro?")) {
      const newData = personas.filter(persona =>
        persona.id !== id
      )
      DeleteData(id,handResult);
      setPersonas(newData);
    }
  }

  return (
    <div className="container mt-3">
      <Alert
        msjAlert={msjAlert}
        setMsjAlert={setMsjAlert}
      />
      <button onClick={() => abrirModal("Agregar")} className="btn btn-primary m-3">Agregar</button>
      <Table
        personas={personas}
        eliminar={eliminar}
        handleEdit={handleEdit}
      />
      <Modal
        handleChange={handleChange}
        personaDatos={personaDatos}
        abrirModal={abrirModal}
        accionForm={accionForm}
        abrirM={abrirM}
        accion={accion}
      />

    </div>
  );
}

export default App;
