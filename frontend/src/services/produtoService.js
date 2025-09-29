import axios from "axios";

const produtoApi = axios.create({
    baseURL: "http://localhost:8080"  // ← DEVE SER APENAS ATÉ A PORTA
});

export const listarProdutos = () => produtoApi.get("/produtos");
export const criarProduto = (data) => produtoApi.post("/produtos", data);
export const buscarProdutoPorId = (id) => produtoApi.get(`/produtos/${id}`);
export const atualizarProduto = (id, data) => produtoApi.put(`/produtos/${id}`, data);
export const deletarProduto = (id) => produtoApi.delete(`/produtos/${id}`);
export const produtosComRestaurante = () => produtoApi.get("/produtos/com-restaurante");
export const produtosPorFaixaPreco = (precoMin, precoMax) => produtoApi.get(`/produtos/faixa-preco?precoMin=${precoMin}&precoMax=${precoMax}`);
export const restaurantesComContagemProdutos = () => produtoApi.get("/produtos/restaurantes-contagem");
export const mediaPrecosPorCidade = () => produtoApi.get("/produtos/media-precos-cidade");