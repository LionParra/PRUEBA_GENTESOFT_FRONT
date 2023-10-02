import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {RotatingLines} from 'react-loader-spinner';

const URL = process.env.REACT_APP_BASE_URL

function Ventas() {
    const [cargando, setCargando] = useState(true)
    const [info, setInfo] = useState([])

    useEffect(() => {
        todos()
    }, [])

    const todos = () => {
        
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: URL + '/ventas/',
            headers: { },
            data : ''
        }

          axios.request(config)
          .then((res) => {
            setCargando(false)
            setInfo(res.data)
            Swal.fire({
                icon: 'success',
                title: 'Petición Exitosa',
                text: 'La data fue consultada exitosamente',
                timer: 2500,
                showConfirmButton: false,
                position: 'center'
            })
          })
          .catch((err) => {
            setCargando(false)
            setInfo([])
            Swal.fire({
                icon: 'error',
                title: 'Ha Ocurrido un Error',
                text: err.response.data.Message,
                timer: 2500,
                showConfirmButton: false,
                position: 'center'
            })
          })

    }

    return(
        <>
            {
                cargando 
                ? <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
                    <RotatingLines
                    strokeColor="black"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="100"
                    visible={true}
                    /> 
                </div> 
                : <>
                <div>
                    <div className="justify-content-center align-items-center d-flex mt-4">
                        <h1 className="text-muted">Log de Ventas</h1><br/>
                    </div>
                    <div className="row mt-1">
                        <div className="col-2"></div>
                        <div className="col table-responsive">
                            <hr></hr>
                            <table className="table table-striped table-hover table-bordered border-dark align-middle mt-4 ">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">COMPRADOR</th>
                                        <th scope="col">DOCUMENTO</th>
                                        <th scope="col">FECHA DE VENTA</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        info.map((elm, idx) => (
                                            <tr key={idx}>
                                                <td>{idx + 1}</td>
                                                <td>{elm.NOMBRE}</td>
                                                <td>{elm.DOCUMENTO}</td>
                                                <td>{elm.FECHA_REGISTRO.split('T')[0]}</td>
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

export default Ventas