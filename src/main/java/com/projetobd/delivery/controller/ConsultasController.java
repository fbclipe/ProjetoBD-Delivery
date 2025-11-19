package com.projetobd.delivery.controller;

import com.projetobd.delivery.service.ConsultasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/consultas")
public class ConsultasController {

    @Autowired
    private ConsultasService service;

    // VIEW 1
    @GetMapping("/comidas-mais-vendidas")
    public List<Map<String, Object>> comidasMaisVendidas() {
        return service.comidasMaisVendidas();
    }

    // VIEW 2
    @GetMapping("/desempenho-entregas")
    public List<Map<String, Object>> desempenhoEntregas() {
        return service.desempenhoEntregas();
    }

    // Consulta 1
    @GetMapping("/clientes-sem-pedidos")
    public List<Map<String, Object>> clientesSemPedidos() {
        return service.clientesSemPedidos();
    }

    // Consulta 2
    @GetMapping("/restaurantes-avaliacoes")
    public List<Map<String, Object>> restaurantesAvaliacoes() {
        return service.restaurantesAvaliacoes();
    }

    // Consulta 3
    @GetMapping("/restaurantes-acima-media")
    public List<Map<String, Object>> restaurantesAcimaMedia() {
        return service.restaurantesAcimaMedia();
    }

    // Consulta 4
    @GetMapping("/entregadores-desempenho")
    public List<Map<String, Object>> entregadoresComDesempenho() {
        return service.entregadoresComDesempenho();
    }

    // Extra: ver índices
    @GetMapping("/indices")
    public List<Map<String, Object>> indices() {
        return service.listarIndices();
    }
}
