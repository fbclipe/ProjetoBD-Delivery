import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080"
});

export default {
    simularPagamento: () => api.post("/pedidos/simular-pagamento"),
    listarLogs: async () => {
        const response = await api.get("/pedidos/log-pagamentos");
        return response.data; // garantindo que só retorna os dados
    },

    simularItemPedido: () => api.post("/pedidos/simular-item"),
    listarPedidosAtualizados: async () => {
        const response = await api.get("/pedidos/pedidos-atualizados");
        return response.data; // garantindo que só retorna os dados
    },
};
