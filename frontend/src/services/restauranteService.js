import axios from "axios";

// CORREÇÃO: Remova "/restaurantes" da baseURL
const restauranteApi = axios.create({
    baseURL: "http://localhost:8080"  // ← MUDEI AQUI
});

// Agora os endpoints estão corretos:
export const listarRestaurantes = () => restauranteApi.get("/restaurantes");
export const criarRestaurante = (data) => restauranteApi.post("/restaurantes", data);
export const atualizarRestaurante = (id, data) => restauranteApi.put(`/restaurantes/${id}`, data);
export const deletarRestaurante = (id) => restauranteApi.delete(`/restaurantes/${id}`);
export const buscarPorCidade = (cidade) => restauranteApi.get(`/restaurantes/cidade/${cidade}`);
export const buscarPorNome = (nome) => restauranteApi.get(`/restaurantes/nome?nome=${nome}`);
export const contarPorCidade = () => restauranteApi.get("/restaurantes/contagem/cidade");
export const buscarRestaurantePorId = (id) => restauranteApi.get(`/${id}`);