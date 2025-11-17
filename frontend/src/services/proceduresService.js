import axios from "axios";

const API = "http://localhost:8080";

export const atualizarStatusEntrega = async (idEntrega, status) => {
    const response = await axios.put(
        `${API}/pedidos/entrega/status?idEntrega=${idEntrega}&status=${status}`
    );
    return response.data;
};

export const aplicarDescontos = async () => {
    const response = await axios.post(`${API}/pedidos/descontos`);
    return response.data;
};
