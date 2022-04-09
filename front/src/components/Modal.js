import React from "react";
import { Modal, Form, Button} from "react-bootstrap";

const Forms =  (props)=>{

    return(
        <Modal show={props.abrirM} onHide={() => props.abrirModal()}>
        <Modal.Header closeButton>
          <Modal.Title>{props.accion} Persona</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                autoFocus
                name="nombre"
                onChange={props.handleChange}
                value={props.personaDatos && props.personaDatos.nombre}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Apellido"
                autoFocus
                name="apellido"
                onChange={props.handleChange}
                value={props.personaDatos && props.personaDatos.apellido}

              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Edad</Form.Label>
              <Form.Control
                type="number"
                placeholder="Edad"
                autoFocus
                name="edad"
                onChange={props.handleChange}
                value={props.personaDatos && props.personaDatos.edad}

              />



            </Form.Group>
            <Form.Label>Sexo</Form.Label>

            <Form.Group>
              <Form.Check
              checked ={
                props.personaDatos &&  props.personaDatos.sexo === 'M' ? true : false
              }
                inline
                label="M"
                name="sexo"
                value="1"
                type="radio"
                id={`inline-radio-1`}
                onChange={props.handleChange}
              />
              <Form.Check
              checked ={
                props.personaDatos &&  props.personaDatos.sexo === 'F' ? true : false
              }
                inline
                label="F"
                name="sexo"
                value="2"
                type="radio"
                id={`inline-radio-2`}
                onChange={props.handleChange}
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.abrirModal()}>
            Cerra
          </Button>
          <Button variant="primary" onClick={() => props.accionForm()} >
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

    )
}
export default Forms;