import axios from "axios";

export const getReservas = () => {
    return axios.get('https://destinys-road.onrender.com/reservas/')
}

export const getDestinos = () => {
    return axios.get('https://destinys-road.onrender.com/destinos/')
}


export const editarReserva = (body, id) => {
    return axios.put(`https://destinys-road.onrender.com/reservas/${id}`, body)
}

export const encontrarReserva = (id) => {
    return axios.get(`https://destinys-road.onrender.com/reservas/${id}`)
}

export const deleteReserva =(id) => {
    return axios.delete(`https://destinys-road.onrender.com/reservas/${id}`)
}