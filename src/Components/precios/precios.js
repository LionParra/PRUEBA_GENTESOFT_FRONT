/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {RotatingLines} from 'react-loader-spinner';
import {FcSearch} from 'react-icons/fc'
import { Button, Col, Form } from 'react-bootstrap'
import axios from "axios";
import Swal from "sweetalert2";

const URL = process.env.REACT_APP_BASE_URL


function Precios() {
    const [validar, setValidar] = useState(false)
    const [info, setInfo] = useState([])
    const [form, setForm] = useState({
        TIPO:''
    })

    useEffect(() => {
        tootip()
    }, [])

    const tootip = () => {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new window.bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    const handleChangeTipo = ({ currentTarget: { value, name } }) => {
        setForm({ ...form, [name]: value })
    }

    const buscar = () => {
        setValidar(true)

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: URL + '/' + form.TIPO + '/get/',
            headers: { },
            data : ''
          };

        axios.request(config)
        .then((resp) => {
            setValidar(false)
            setInfo(resp.data)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                text: 'Se han encontrado los datos solicitados',
                title: 'Consulta exitosa',
                showConfirmButton: false,
                timer: 2000,
            })
        })
        .catch((err) => {
            setValidar(false)
            setInfo([])
            let msg = err.response.data.Message
            Swal.fire({
                position: 'top-end',
                title: 'Ha ocurrido un error',
                icon: 'error',
                text: msg,
                showConfirmButton: false,
                timer: 1500})
            
        })
    }

    return(
        <>
        { validar ? 
            <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
                <RotatingLines
                    strokeColor="black"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="100"
                    visible={true}
                /> 
             </div>:
              <>
                <div>
                    <div className="justify-content-center align-items-center d-flex mt-4">
                        <h1 className="text-muted">Listado de Precios</h1><br/>
                    </div>

                    <div className="row mt-4">
                        <div className="col-2"></div>
                        <div className="col table-responsive">
                            <hr></hr>
                            <div className="row mb-2">
                                <Col md={3}>
                                    <Form.Label>Tipo Vehiculo</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="TIPO"
                                        value={form.TIPO}
                                        onChange={handleChangeTipo}
                                        required>
                                            <option value=''>Seleccione una Opción</option>
                                            <option value='vehiculos'>Carro</option>
                                            <option value='motos'>Moto</option>
                                    </Form.Control>
                                </Col>
                                <Col></Col>
                                <Col className="Col d-flex justify-content-end mt-3">
                                    {
                                        form.TIPO === '' ? 
                                            <Button type="button" variant="outline-secondary" className="ml-auto ps-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Buscar" disabled>
                                                <FcSearch style={{fontSize: 30}} />
                                            </Button> :
                                            <Button onClick={buscar} type="button" variant="secondary" className="ml-auto ps-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Buscar" >
                                                <FcSearch style={{fontSize: 30}} />
                                            </Button>
                                    }
                                </Col>
                                                                
                            </div>

                            <table className="table table-striped table-hover table-bordered border-dark align-middle mt-3">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">MODELO</th>
                                    <th scope="col">VALOR (COP)</th>
                                </tr>
                            </thead>
                            <tbody>
                            { 
                                info.map((element, idx) => (
                                    <tr key={idx}>
                                        <td>{idx+1}</td>
                                        <td>{element.MODELO}</td>
                                        <td>{new Intl.NumberFormat("es-CO").format(element.VALOR)}</td>
                                    </tr>
                                
                                ))
                            }
                            </tbody>
                            </table>
                            
                        </div>

                        
                        <div className="col-2"></div>
                    </div>
                </div>
             </>
        }
        </>
    )
}

export default Precios