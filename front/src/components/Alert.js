import React from "react";
import { Alert } from "react-bootstrap";

const Alerta  = (props) => {

    return (
        <Alert variant={props.msjAlert.variant} show={props.msjAlert.status} onClose={() => props.setMsjAlert({ status: false, msj: [] })} dismissible>
            <Alert.Heading>{props.msjAlert.header}!</Alert.Heading>
            {
                props.msjAlert.msj.map((msj, i) => {

                    return (
                        <p key={i}>
                            {
                                msj
                            }
                        </p>
                    )
                })
            }

        </Alert>
    )
}
export default Alerta;