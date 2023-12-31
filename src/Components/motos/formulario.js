import React, { useState, useEffect } from 'react'
import { Button, Col, Form, Card } from 'react-bootstrap'
import axios from 'axios'
import {HiPhotograph} from 'react-icons/hi'
import Swal from 'sweetalert2'

const URL = process.env.REACT_APP_BASE_URL

function FormularioB ({data, tiene, setModalVer, actualizar}) {
    const [guardar, setGuardar] = useState(false)
    const [form, setForm] = useState({
        MODELO: '',
        COLOR: '',
        KILOMETRAJE: '',
        TIPO: '',
        IMAGEN: '',
        VALOR: '',
        FECHA_REGISTRO: '',
        VELOCIDADES: '',
        CILINDRAJE:''
        })
    

    useEffect(() => {
        if (tiene) {
            setForm(data)
        }
        // eslint-disable-next-line
    }, [])

    //manejo actions

    const subir = () => {
        const input = document.createElement("input")
        input.type="file"
        input.accept="image/jpeg, image/png, .jpg, .png"
        input.onchange = (e) =>{onChangeFile(e)}
        input.click();
    }

    const onChangeFile = (e, idx) =>{
        const tiposPermitidos = ["image/jpeg", "image/png"];
        let archivos = e.target.files
        Array.from(archivos).forEach(archivo =>{
            if(!tiposPermitidos.includes(archivo.type)){
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    text: 'El tipo de archivo cargado no es admitido',
                    title: 'Formato incorrecto',
                    showConfirmButton: false,
                    timer: 1500,
                })
                e.target.value = null
            } else if (archivo.size > 5000000){
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    text: 'El tamaño del archivo supera el limite permitido de 5 MB',
                    title: 'Tamaño superado',
                    showConfirmButton: false,
                    timer: 1500,
                })
                e.target.value = null
            } else{

                var reader = new FileReader()
                reader.readAsDataURL(archivo)
                reader.onload=()=>{
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        text: 'Archivo cargado exitosamente',
                        title: 'Archivo procesado',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    var base64=reader.result
                    setForm({ ...form, IMAGEN: base64 })
                }
                reader.onerror = (error) =>{
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        text: 'Procesando el archivo ocurrio un error, Porfavor vuelva a cargarlo',
                        title: 'Error al Procesar el archivo',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                }
            }
        })

    }

    const handleSubmit = (e) => {
        setGuardar(true)
        e.preventDefault()
        if (!tiene) {

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: URL + '/motos/post',
                headers: { 'Content-Type': 'application/json' },
                data : form
            }

            axios.request(config)
                .then((response) => {
                    console.log(response.data)
                    setModalVer(false)
                    actualizar()
                })
                .catch((err) => {
                    setModalVer(false)
                    Swal.fire({
                        position: 'top-end',
                        title: 'Ha ocurrido un error',
                        icon: 'error',
                        text: err.response.data.Message,
                        showConfirmButton: false,
                        timer: 1500})
                })
        } else {

            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: URL + '/motos/put/' + form.Id,
                headers: { 'Content-Type': 'application/json' },
                data : form
            }

            axios.request(config)
                .then((response) => {
                    console.log(response.data)
                    setModalVer(false)
                    actualizar()
                })
                .catch((err) => {
                    setModalVer(false)
                    Swal.fire({
                        position: 'top-end',
                        title: 'Ha ocurrido un error',
                        icon: 'error',
                        text: err.response.data.Message,
                        showConfirmButton: false,
                        timer: 1500})
                    })
        }
    }

    const handleChange = ({ currentTarget: { value, name } }) => {
        if (name === 'TIPO' && value === 'NUEVO'){
            setForm({ ...form, KILOMETRAJE: 0, TIPO: 'NUEVO' })
        } else if (name === 'TIPO' && value === 'USADO'){
            setForm({ ...form, KILOMETRAJE: '', TIPO: 'USADO' })
        } else {
            setForm({ ...form, [name]: value })
        }
    }

    const handleChangeValor = ({ currentTarget: { value, name } }) => {
        if (value > 250000000){
            Swal.fire({
                position: 'top-end',
                title: 'Valor Maximo superado',
                icon: 'warning',
                text: 'No es posible registrar un valor superior a 250000000',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            setForm({ ...form, [name]: value })
        }
    }

    const handleChangeCilindro = ({ currentTarget: { value, name } }) => {
        if (value > 400){
            Swal.fire({
                position: 'top-end',
                title: 'Cilindraje Maximo superado',
                icon: 'warning',
                text: 'No es posible registrar un cilindraje superior a 400 CC',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            setForm({ ...form, [name]: value })
        }
    }

    return (
        <Form onSubmit={handleSubmit} autoComplete="off">
        <Card>
            <Card.Header>
                <strong>
                    Ingreso de datos para la moto
                </strong>
            </Card.Header>

            <Card.Body>
                <div className='row mb-3'>
                    <Form.Group as={Col}>
                            <Form.Label>MODELO</Form.Label>
                            <Form.Control
                                type="text"
                                name="MODELO"
                                value={form.MODELO}
                                onChange={handleChange}
                                required>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>COLOR</Form.Label>
                            <Form.Control
                                type="text"
                                name="COLOR"
                                value={form.COLOR}
                                onChange={handleChange}
                                required>
                            </Form.Control>
                        </Form.Group>
                </div>

                <div className='row mb-3'>
                        <Form.Group as={Col}>
                            <Form.Label>Estado Vehiculo</Form.Label>
                            <Form.Control
                                as="select"
                                name="TIPO"
                                value={form.TIPO}
                                onChange={handleChange}
                                required>
                                    <option value=''>Seleccione una opcion</option>
                                    <option value='NUEVO'>Nuevo</option>
                                    <option value='USADO'>Usado</option>
                            </Form.Control>
                        </Form.Group>

                        { form.TIPO === 'NUEVO' ?
                            <Form.Group as={Col}>
                                <Form.Label>KILOMETRAJE</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="KILOMETRAJE"
                                    value={form.KILOMETRAJE}
                                    onChange={handleChange}
                                    disabled>
                                </Form.Control>
                            </Form.Group> :
                            <Form.Group as={Col}>
                                <Form.Label>KILOMETRAJE</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="KILOMETRAJE"
                                    value={form.KILOMETRAJE}
                                    onChange={handleChange}
                                    required>
                                </Form.Control>
                            </Form.Group>
                        }
                </div>

                <div className='row mb-3'>
                    <Form.Group as={Col}>
                            <Form.Label>CILINDRAJE</Form.Label>
                            <Form.Control
                                type="number"
                                name="CILINDRAJE"
                                value={form.CILINDRAJE}
                                onChange={handleChangeCilindro}
                                required>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>VELOCIDADES</Form.Label>
                            <Form.Control
                                type="number"
                                name="VELOCIDADES"
                                value={form.VELOCIDADES}
                                onChange={handleChange}
                                required>
                            </Form.Control>
                        </Form.Group>
                </div>

                <div className='row mb-3'>

                    <div className='col-6'>
                        <label for="basic-url" class="form-label">VALOR</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text">$</span>
                            <input type="number" class="form-control" value={form.VALOR} onChange={handleChangeValor} name='VALOR' aria-label="Amount (to the nearest dollar)" placeholder='Costo en COP' />
                        </div>
                    </div>

                    { tiene ?
                        <Form.Group as={Col}>
                            <Form.Label>FECHA DE REGISTRO</Form.Label>
                            <Form.Control
                                type="date"
                                name="FECHA_REGISTRO"
                                value={form.FECHA_REGISTRO}
                                disabled>
                            </Form.Control>
                        </Form.Group> : 
                        undefined}

                </div>

                <div className='row'>
                        <Form.Group as={Col}>
                            <Form.Label>IMAGEN</Form.Label>
                            <Button type="button" className='btn btn-info mx-3 ps-1 pe-1' title='Subir Imagen' onClick={subir}> <HiPhotograph  style={{fontSize: 30}}/></Button>
                        </Form.Group>
                </div>

            </Card.Body>
            
            <Card.Footer>
                <div className="text-right">
                    {
                        guardar ?
                        <Button type="submit" variant="success" disabled><span class="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>Guardando</Button>
                        : <Button type="submit" variant="success">Guardar</Button>
                    }
                </div>
            </Card.Footer>
            </Card>
        </Form>
    )
}


export default FormularioB