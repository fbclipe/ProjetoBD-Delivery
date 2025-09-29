import axios from "axios";

const produtoApi = axios.create({
    baseURL: "http://localhost:8080" // backend Spring Boot
});

export const listarProdutos = () => produtoApi.get("/produtos");
export const criarProduto = (data) => produtoApi.post("/produtos", data);
export const atualizarProduto = (id, data) => produtoApi.put(`/produtos/${id}`, data);
export const deletarProduto = (id) => produtoApi.delete(`/produtos/${id}`);
export const buscarPorRestaurante = (idRestaurante) => produtoApi.get(`/produtos/restaurante/${idRestaurante}`);
export const produtosMaisCaros = (precoMin) => produtoApi.get(`/produtos/caros?precoMin=${precoMin}`);
export const buscarProdutoPorId = (id) => produtoApi.get(`/${id}`);
