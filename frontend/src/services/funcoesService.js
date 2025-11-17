import axios from "axios";

const API = "http://localhost:8080";

export const getMediaRestaurante = async (idRestaurante) => {
    const response = await axios.get(`${API}/restaurantes/media-avaliacao/${idRestaurante}`);
    return response.data;
};

export const getNivelCliente = async (idCliente) => {
    const response = await axios.get(`${API}/clientes/nivel/${idCliente}`);
    return response.data;
};
