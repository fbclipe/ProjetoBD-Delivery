import axios from "axios";

// Use apenas UMA abordagem - vou manter a com axios.create()
const restauranteApi = axios.create({
    baseURL: "http://localhost:8080"
});

// CRUD básico
export const listarRestaurantes = () => restauranteApi.get("/restaurantes");
export const criarRestaurante = (data) => restauranteApi.post("/restaurantes", data);
export const atualizarRestaurante = (id, data) => restauranteApi.put(`/restaurantes/${id}`, data);
export const deletarRestaurante = (id) => restauranteApi.delete(`/restaurantes/${id}`);
export const buscarPorCidade = (cidade) => restauranteApi.get(`/restaurantes/cidade/${cidade}`);
export const buscarPorNome = (nome) => restauranteApi.get(`/restaurantes/nome?nome=${nome}`);
export const contarPorCidade = () => restauranteApi.get("/restaurantes/contagem/cidade");
export const buscarRestaurantePorId = (id) => restauranteApi.get(`/restaurantes/${id}`);

// NOVAS CONSULTAS - usando a MESMA abordagem
export const restaurantesPorCidade = (cidade) => {
    return restauranteApi.get(`/restaurantes/cidade/${cidade}`);
};

export const restaurantesPorTipoCulinaria = (tipoCulinaria) => {
    return restauranteApi.get(`/restaurantes/culinaria/${tipoCulinaria}`);
};

export const restaurantesComEnderecoCompleto = () => {
    return restauranteApi.get("/restaurantes/endereco-completo");
};

export const restaurantesOrdenadosPorNome = () => {
    return restauranteApi.get("/restaurantes/ordenados-nome");
};