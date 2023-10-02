/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import axios from "axios"
import {RotatingLines} from 'react-loader-spinner';
import Swal from "sweetalert2";
import {RiMotorbikeFill} from 'react-icons/ri'
import {FaPlus} from 'react-icons/fa'
import {Modal} from "react-bootstrap"
import {AiFillCreditCard} from 'react-icons/ai'
import {BsFillPencilFill} from 'react-icons/bs'
import FormularioB from "./formulario";
import FormuVentas from "./formuVentas";

const URL = process.env.REACT_APP_BASE_URL

function Motos () {
    const [info, setInfo] = useState([])
    const [validar, setValidar] = useState(true)
    const [data, setData] = useState({})
    const [modalver, setModalVer] = useState(false)
    const [modalvender, setModalVender] = useState(false)
    const [tiene, setTiene] = useState(false)
    const [id, setId] = useState('')

    useEffect(() => {
        obtenerTodo()
        tootip()
    }, [validar])

    const tootip = () => {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new window.bootstrap.Tooltip(tooltipTriggerEl);
        })
    }

    const obtenerTodo =() => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: URL + '/motos/get',
            headers: { },
            data : ''
          };

        axios.request(config)
        .then((res) => {
            setInfo(res.data)
            setValidar(false)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                text: 'Se han encontrado ' + res.data.length + ' registros',
                title: 'Consulta exitosa',
                showConfirmButton: false,
                timer: 1500,
            })
        })
        .catch((err) => {
            Swal.fire({
                position: 'top-end',
                title: 'Ha ocurrido un error',
                icon: 'error',
                text: err.response.data.Message,
                showConfirmButton: false,
                timer: 1500})
            setValidar(false)
        })
    }


    const actualizar = () =>{

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: URL + '/motos/get',
            headers: { },
            data : ''
          };

        axios.request(config)
        .then((res) => {
            setValidar(false)
            setInfo(res.data)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                text: 'Se han actualizado los registros',
                title: 'Consulta exitosa',
                showConfirmButton: false,
                timer: 1500,
            })
        })
        .catch((err) => {
            let msg = err.response.data.Message
            Swal.fire({
                position: 'top-end',
                title: 'Ha ocurrido un error',
                icon: 'error',
                text: msg,
                showConfirmButton: false,
                timer: 1500})
            setValidar(false)
        })
    }

    const modaledit = (obj) => {
        obj.FECHA_REGISTRO = obj.FECHA_REGISTRO.split('T')[0]
        setModalVer(true)
        setTiene(true)
        setData(obj)
    }

    const vender = (obj) => {
        setModalVender(true)
        setId(obj.Id)
    }

    const agregar = () => {
        setModalVer(true)
        setTiene(false)
        setData({})
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
            <div>
                <div className="justify-content-center align-items-center d-flex mt-4">
                    <h1 className="text-muted">Registro de Motocicletas</h1><br/>
                    
                </div>
                <div className="row mt-4">
                    <div className="col-1"></div>
                    <div className="col table-responsive">
                        <hr></hr>
                        <div className="mb-3 d-flex justify-content-end">
                            <button type="button" onClick={agregar} className="btn btn-success ml-auto ps-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Agregar Vehiculo" >
                                <RiMotorbikeFill style={{fontSize: 30}} /><FaPlus style={{fontSize: 15}}/>
                            </button>
                        </div>

                        <table className="table table-striped table-hover table-bordered border-dark align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">MODELO</th>
                                    <th scope="col">COLOR</th>
                                    <th scope="col">KM</th>
                                    <th scope="col">VALOR (COP)</th>
                                    <th scope="col">FECHA DE REGISTRO</th>
                                    <th scope="col">CILINDRAJE</th>
                                    <th scope="col">VELOCIDADES</th>
                                    <th scope="col">IMAGEN</th>
                                    <th scope="col">ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    info.map((element, idx) => (
                                        <tr key={idx}>
                                            <td>{idx + 1}</td>
                                            <td>{element.MODELO}</td>
                                            <td>{element.COLOR}</td>
                                            <td>{element.KILOMETRAJE}</td>
                                            <td>{new Intl.NumberFormat("es-CO").format(element.VALOR)}</td>
                                            <td>{element.FECHA_REGISTRO.split('T')[0]}</td>
                                            <td>{element.CILINDRAJE}</td>
                                            <td>{element.VELOCIDADES}</td>
                                            <td> 
                                            { element.IMAGEN !== '' ? 
                                                <img src={element.IMAGEN} alt={idx} style={{ width: '150px', height: '150px' }}></img>
                                                : undefined }
                                            </td>
                                            <td>
                                                <button onClick={() => {modaledit(element)}} type="button" className="btn btn-warning ps-1 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar Registro">
                                                    <RiMotorbikeFill style={{fontSize: 20}}/> <BsFillPencilFill style={{fontSize: 10}}/>
                                                </button>
                                                <button onClick={() => {vender(element)}} type="button" className="btn btn-secondary ps-1 pe-1 mx-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Vender">
                                                    <AiFillCreditCard style={{fontSize: 20}}/>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="col-1"></div>

                    {<Modal show={modalver} size="lg" key="modalEditar" onHide={() => setModalVer(false)} backdrop={"static"}>
                        <Modal.Header closeButton> 
                            <Modal.Title>
                                { tiene ? `Editar registro: ${data.Id}` : "Nuevo registro" }
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {<FormularioB
                                data={data}
                                tiene= {tiene}
                                setModalVer= {() => {setModalVer()}}
                                actualizar= {()=> {actualizar()}}
                            />}
                        </Modal.Body>
                        
                        </Modal>}

                        {
                        <Modal show={modalvender} size="lg" key="modalVenta" onHide={() => setModalVender(false)} backdrop={"static"}>
                        <Modal.Header closeButton> 
                            <Modal.Title>
                                Registro de venta de Vehiculo
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {<FormuVentas
                                id = {id}
                                setModalVender= {() => {setModalVender()}}
                                actualizar= {()=> {actualizar()}}
                            />}
                        </Modal.Body>
                        
                        </Modal>
                    }


                </div>
            </div> 
        }
        </>
    )

}

export default Motos