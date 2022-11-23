import { useState } from 'react'
import './App.css'
import Formulario from './components/pure/forms/FormReserva'
import Table from './components/Table'

function App() {

  const [isShow, setIsShow] = useState(false)
  const [datosReserva, setDatosReserva] = useState({})
  const [idReserva, setIdReserva] = useState('')

  const validarDatosReserva = () => {
    if(Object.keys(datosReserva).length !==0) {
      return true
    } else {
      return false
    }
  }


  return (
    <>


    


    {isShow && validarDatosReserva() ? (
      
      <Formulario
      datosReserva={datosReserva}
      setDatosReserva={setDatosReserva}
      idReserva={idReserva}
      setIsShow={setIsShow}
      isShow={isShow}
      />
    ): (  <Table
      datosReserva={datosReserva}
      setDatosReserva={setDatosReserva}
      setIsShow={setIsShow}
      isShow={isShow}
      setIdReserva={setIdReserva}

    />)}


    </>

  )
}

export default App
