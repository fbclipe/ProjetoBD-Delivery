package com.projetobd.delivery.service;

import com.projetobd.delivery.repository.ConsultasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ConsultasService {

    @Autowired
    private ConsultasRepository repo;

    public List<Map<String, Object>> comidasMaisVendidas() {
        return repo.comidasMaisVendidas();
    }

    public List<Map<String, Object>> desempenhoEntregas() {
        return repo.desempenhoEntregas();
    }

    public List<Map<String, Object>> clientesSemPedidos() {
        return repo.clientesSemPedidos();
    }

    public List<Map<String, Object>> restaurantesAvaliacoes() {
        return repo.restaurantesAvaliacoes();
    }

    public List<Map<String, Object>> restaurantesAcimaMedia() {
        return repo.restaurantesAcimaMedia();
    }

    public List<Map<String, Object>> entregadoresComDesempenho() {
        return repo.entregadoresComDesempenho();
    }

    public List<Map<String, Object>> listarIndices() {
        return repo.listarIndices();
    }
}
