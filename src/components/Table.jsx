import { useEffect, useState } from 'react'
import { deleteReserva, encontrarReserva, getDestinos, getReservas } from '../services/axios.service'
import Swal from 'sweetalert2'
import styles from '../styles/Table.module.css'

const Table = ({ setDatosReserva, datosReserva, setIsShow, isShow, setIdReserva }) => {

    const [reservas, setReservas] = useState([])

    console.log(reservas)
    const traerReservas = () => {
        getReservas().then(r => {
            setReservas(r.data)
        })
            .catch(err => {
                throw new Error(`error en la peticion ${err}`)
            })
    }
    useEffect(() => {
        traerReservas()
    }, [])

    const editarReserva = (id) => {

        console.log(id)
        setIdReserva(id)
        encontrarReserva(id).then(r => {
            setDatosReserva(r.data)
        })
        setIsShow(!isShow)
    }


    const eliminarReserva = (id) => {
        Swal.fire({
            title: 'Estas seguro de eliminar esta reserva?',
            text: "Esta accion no se puede revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteReserva(id).then()
                Swal.fire(
                    'Eliminada!',
                    'La reserva ha sido eliminada satisfactoriamente.',
                    'success'
                )
                traerReservas()
                setDatosReserva({})
            }
        })


    }

    return (

        <>

            <h1>Destinys Road - Reservas</h1>
            <div className={`contenedor ${styles.tableContainer}`}>
                <table>
                    <thead>
                        <tr>
                            {/* <td>ID</td> */}
                            <td>Nombre de cliente</td>
                            <td>Cedula</td>
                            <td>Correo</td>
                            <td>Destino</td>
                            <td>Fecha</td>
                            <td>Hora</td>
                            <td>Tipo de vehiculo</td>
                            <td>Costo Total</td>
                            <td>Acciones</td>
                        </tr>
                    </thead>

                    <tbody>

                        {reservas.map(reserva => (
                            <tr
                                key={reserva._id}
                            >
                                {/* <td>{reserva._id}</td> */}
                                <td>{reserva.nombre}</td>
                                <td>{reserva.cedula}</td>
                                <td>{reserva.correo}</td>
                                <td>{reserva.destino}</td>
                                <td>{reserva.fecha}</td>
                                <td>{reserva.hora}</td>
                                <td>{reserva.tipo}</td>
                                <td>{reserva.precio_total}</td>
                                <td className={styles.acciones}>
                                    <button
                                        className={styles.btnEditar}
                                        onClick={() => editarReserva(reserva._id)}
                                    >Editar</button>
                                    <button
                                        className={styles.btnEliminar}
                                        onClick={() => eliminarReserva(reserva._id)}

                                    >Eliminar</button>
                                </td>


                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

        </>

    )
}

export default Table