import axios from "axios";

const API = "http://localhost:8080/consultas";

export async function getComidasMaisVendidas() {
    return axios.get(`${API}/comidas-mais-vendidas`);
}

export async function getDesempenhoEntregas() {
    return axios.get(`${API}/desempenho-entregas`);
}

export async function getClientesSemPedidos() {
    return axios.get(`${API}/clientes-sem-pedidos`);
}

export async function getRestaurantesAvaliacoes() {
    return axios.get(`${API}/restaurantes-avaliacoes`);
}

export async function getRestaurantesAcimaMedia() {
    return axios.get(`${API}/restaurantes-acima-media`);
}

export async function getEntregadoresDesempenho() {
    return axios.get(`${API}/entregadores-desempenho`);
}

export async function getIndices() {
    return axios.get(`${API}/indices`);
}
