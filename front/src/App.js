
import React, { useEffect, useState } from "react";
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import Alert from './components/Alert';
import Modal from './components/Modal';
import Table from './components/Table'



function App() {
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
  let objAlert = {};
  const [msjAlert, setMsjAlert] = useState({ status: false, msj: [], variant: null, header: null });

  const baseUriGet = 'https://localhost/crudApiRest/backendApiRest/public/api/personas';
  const baseUriPost = 'https://localhost/crudApiRest/backendApiRest/public/api/personas/add';
  const baseUriPut = 'https://localhost/crudApiRest/backendApiRest/public/api/personas/edit/';
  let baseUriDelete = 'https://localhost/crudApiRest/backendApiRest/public/api/personas/delete/';
  const getData = async () => {
    await Axios.get(baseUriGet)
      .then(data => setPersonas(data.data))
      .catch(e => console.log(e))
  }
  /*const getDataShow = async (id) => {
    await Axios.get(baseUriGet+'/'+id)
      .then(data =>{
        const { name, value } = data.data;
    setPersonaDatos((datosPrevios) => ({
      ...datosPrevios,
      [name]: value
    }))
      })
      .catch(e => console.log(e))
  }*/
  const deleteData = async (id) => {
    baseUriDelete += id;
    await Axios.delete(baseUriDelete)
      .then(data => handResult(data))
      .catch(e => console.log(e))
  }
  const postData = async () => {

    await Axios.post(baseUriPost, handleForm())
      .then(data => {
        handResult(data)
      })
      .catch(e => console.log(e))

  }
  const putData = async (id) => {
    await Axios.post(baseUriPut + id, handleForm())
      .then(data => {
        handResult(data)
      })
      .catch(e => console.log(e))
  }
  useEffect(() => {
    getData();
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
  const handleForm = () => {
    let form = new FormData();
    form.append('nombre', personaDatos.nombre);
    form.append('apellido', personaDatos.apellido);
    form.append('edad', personaDatos.edad);
    form.append('sexo', personaDatos.sexo);
    return form;
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
      objAlert.status = false;
      window.setTimeout(() => {
        setMsjAlert({ status: false, msj: [] })
      }
        , 4000)
    } else {

      objAlert = { status: true, msj: [], variant: 'warning', header: 'Advertencia' }

      data.data.forEach(element => {
        objAlert.msj.push(element);

      });
      setMsjAlert(objAlert)
      objAlert.status = false;
      window.setTimeout(() => {
        setMsjAlert({ status: false, msj: [] })
      }
        , 4000)
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
      postData();
    } else {
      putData(personaDatos.id);
    }
  }
  const eliminar = (id) => {
    if (window.confirm("Estas seguro que deseas eliminar este registro?")) {
      const newData = personas.filter(persona =>
        persona.id !== id
      )
      deleteData(id);
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
