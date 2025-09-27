import axios from "axios";

const restauranteApi = axios.create({
    baseURL: "http://localhost:8080/restaurantes"
});

export const listarRestaurantes = () => restauranteApi.get("/");
export const criarRestaurante = (data) => restauranteApi.post("/", data);
export const atualizarRestaurante = (id, data) => restauranteApi.put(`/${id}`, data);
export const deletarRestaurante = (id) => restauranteApi.delete(`/${id}`);
export const buscarPorCidade = (cidade) => restauranteApi.get(`/cidade/${cidade}`);
export const buscarPorNome = (nome) => restauranteApi.get(`/nome?nome=${nome}`);
export const contarPorCidade = () => restauranteApi.get("/contagem/cidade");
