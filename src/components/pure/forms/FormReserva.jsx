import React, { useEffect, useRef, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup'
import { User } from '../../../models/user.class.js';
import { editarReserva, getDestinos } from "../../../services/axios.service";
import Swal from "sweetalert2";
import styles from '../../../styles/Formulario.module.css'


const FormReserva = ({setDatosReserva, datosReserva, idReserva, setIsShow, isShow}) => {

    const [destinos, setDestinos] = useState([])
    const [tipoVehiculo, setTipoVehiculo] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [precioTotal, setPrecioTotal] = useState(0)

    console.log(datosReserva)
    let user = new User()

    useEffect(() => {
        getDestinos().then(r => {
            setDestinos(r.data)


        })
            .catch(err => {
                throw new Error(`Error en la peticion a la api ${err}`)
            })
    }, [])


    const guardarDatos = (body, idReserva) => {
        editarReserva(body, idReserva).then(r => {
            if (r.status === 200) {
                Swal.fire({

                    position: 'center',
                    icon: 'success',
                    title: 'Cambios guardados!',
                    showConfirmButton: false,
                    timer: 2000
                })
            setDatosReserva({})
            setIsShow(!isShow)
                
            }
        }).catch(err => console.log(`error: ${err}`))
    }

    //  .log(user)
    const initialValues = {
        name: datosReserva.nombre,
        email: datosReserva.correo,
        id: datosReserva.cedula,
        destino: datosReserva.destino,
        tipo: datosReserva.tipo,
        fecha: datosReserva.fecha,
        hora: datosReserva.hora
    }

    const registerSchema = Yup.object().shape(
        {
            name: Yup.string()
                .max(45, 'El nombre es muy largo')
                .required('El nombre es requerido'),
            email: Yup.string()
                .email('El correo electrónico ingresado no es válido.')
                .required('El correo electronico es requerido'),
            id: Yup.number()
                .required('El numero de identificación es requerido'),

            destino: Yup.string().required('Seleccione un destino'),
            tipo: Yup.string()
                .required('Indique un tipo de transporte'),
        }
    )

    useEffect(() => {

        if (ciudad.length > 0) {

            let precio
            if (tipoVehiculo === 'Carro') {
                precio = destinos.filter(destino => destino.nombre === ciudad)

                setPrecioTotal(precio[0].precio_carro)
            } else {
                precio = destinos.filter(destino => destino.nombre === ciudad)
                setPrecioTotal(precio[0].precio_van)
            }
        }
    }, [ciudad, tipoVehiculo])

    return (
        <div className={styles.formulario}>
            <h1>Editar Reserva</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={registerSchema}
                onSubmit={async (values, { resetForm }) => {
                    await new Promise((r) => setTimeout(r, 500))
                    user.precio = precioTotal
                    user.destino = values.destino
                    user.name = values.name
                    user.email = values.email
                    user.id = values.id
                    user.tipo = values.tipo
                    user.fecha = values.fecha
                    user.hora = values.hora
                    guardarDatos(user, idReserva)
                    resetForm()
                    setPrecioTotal(0)

                }}

            >
                {({
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    resetForm

                }) => (
                    <Form>
                        <label htmlFor="name">Nombre</label>
                        <Field className={styles.campo} id="name" type="text" name="name" placeholder="Tu nombre completo" />
                        {
                            errors.name && touched.name &&
                            (
                                <span className={styles.errorMesagge}><ErrorMessage name="name" /></span>
                            )
                        }

                        <label htmlFor="email">Correo electrónico</label>
                        <Field className={styles.campo} id="email" type="email" name="email"
                            placeholder="Ej: ejemplo@correo.com" />
                        {
                            errors.email && touched.email &&
                            (
                                <span className={styles.errorMesagge}><ErrorMessage name="email" /></span>
                            )
                        }

                        <label htmlFor="id">N° de documento</label>
                        <Field className={`${styles.campo}`}  id="id" type="number" name="id" placeholder="Ej: 12345678" />
                        {
                            errors.id && touched.id &&
                            (
                                <span className={styles.errorMesagge}><ErrorMessage name="id" /></span>
                            )
                        }

                        <label htmlFor="fecha">Fecha de salida</label>
                        <Field className={`${styles.campo}`} id="fecha" type="date" name="fecha" />
                        {
                            errors.id && touched.id &&
                            (
                                <span className={styles.errorMesagge}><ErrorMessage name="fecha" /></span>
                            )
                        }

                        <label htmlFor="hora">Hora salida</label>
                        <Field className={`${styles.campo}`} id="hora" type="time" name="hora" />
                        {
                            errors.id && touched.id &&
                            (
                                <span className={styles.errorMesagge}><ErrorMessage name="hora" /></span>
                            )
                        }

                        <label>Destino</label>
                        <Field
                            as="select"
                            name={"destino"}

                            placeholder="asdasdasd"
                            onChange={e => {
                                // setFieldTouched();
                                handleChange(e);
                                // mostrarPrecio()
                                setCiudad(e.target.value)
                            }}
                        >

                            <option className="seleccion-destino" value="--seleccione un destino--" label="-- Seleccione un destino -- ">
                                Seleccione un destino
                            </option>

                            {destinos.map(objDestino => {
                                const { nombre, _id, precio_carro, precio_van } = objDestino

                                return (
                                    <option key={_id} value={nombre}>{nombre}</option>
                                )
                            })}

                        </Field>


                        <div className="tipo">

                            <div className="tipo__radio">
                                <label>Tipo: </label>

                                <label className={styles.tipo}>
                                    <Field type="radio" name="tipo" value="Carro"
                                        onClick={(e) => setTipoVehiculo(e.target.value)}
                                    />
                                    Carro
                                </label>
                                <label className={styles.tipo}>
                                    <Field type="radio" name="tipo" value="Van"
                                        onClick={(e) => setTipoVehiculo(e.target.value)}
                                    />
                                    Van
                                </label>
                            </div>

                            {precioTotal > 0 ? (
                                <p className="total_pagar">Total a pagar: <span>${precioTotal}</span></p>
                            ) :
                                ''
                            }
                        </div>

                        <button className="btn" type="submit">Guardar cambios</button>

                        <div className={styles.footer}>
                            <div className="spinner">
                                {isSubmitting && (<div className="lds-dual-ring"></div>)}
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default FormReserva;