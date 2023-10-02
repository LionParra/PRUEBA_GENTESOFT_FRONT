import React, { useState } from 'react'
import { Button, Col, Form, Card } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'

const URL = process.env.REACT_APP_BASE_URL

function FormuVenta ({id, setModalVender, actualizar}) {

    const [form, setForm] = useState({
            NOMBRE: '',
            DOCUMENTO: ''
        })

    const handleChange = ({ currentTarget: { value, name } }) => {
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: URL + '/vehiculos/del/' + id,
            headers: { 'Content-Type': 'application/json' },
            data : form
        }

        axios.request(config)
            .then((response) => {
                console.log(response.data)
                setModalVender(false)
                actualizar()
            })
            .catch((err) => {
                setModalVender(false)
                Swal.fire({
                    position: 'top-end',
                    title: 'Ha ocurrido un error',
                    icon: 'error',
                    text: err.response.data.Message,
                    showConfirmButton: false,
                    timer: 2500})
            })
    }

    return(
        <Form onSubmit={handleSubmit} autoComplete="off">
        <Card>
            <Card.Header>
                <strong>
                    Ingreso de datos para el vehiculo
                </strong>
            </Card.Header>

            <Card.Body>
                <div className='row mb-3'>
                    <Form.Group as={Col}>
                            <Form.Label>Nombre Usuario</Form.Label>
                            <Form.Control
                                type="text"
                                name="NOMBRE"
                                value={form.NOMBRE}
                                placeholder='Ingrese el nombre completo del comprador'
                                onChange={handleChange}
                                required>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>DOCUMENTO</Form.Label>
                            <Form.Control
                                type="text"
                                name="DOCUMENTO"
                                placeholder='N. Documento de identificación'
                                value={form.DOCUMENTO}
                                onChange={handleChange}
                                required>
                            </Form.Control>
                        </Form.Group>
                </div>
                </Card.Body>
            
            <Card.Footer>
                <div className="text-right">
                    <Button type="submit" variant="secondary">Vender</Button>
                </div>
            </Card.Footer>
        </Card>
        </Form>
    )

}

export default FormuVenta