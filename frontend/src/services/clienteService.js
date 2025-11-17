import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080", // ALTERE se necessário
});

const endpoint = "/clientes";

export default {
    listar: () => api.get(endpoint).then(res => res.data),
    buscar: (id) => api.get(`${endpoint}/${id}`).then(res => res.data),
    criar: (cliente) => api.post(endpoint, cliente).then(res => res.data),
    atualizar: (id, cliente) => api.put(`${endpoint}/${id}`, cliente).then(res => res.data),
    deletar: (id) => api.delete(`${endpoint}/${id}`).then(res => res.data),
};
