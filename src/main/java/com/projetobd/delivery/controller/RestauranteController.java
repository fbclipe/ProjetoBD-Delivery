package com.projetobd.delivery.controller;

import com.projetobd.delivery.entity.Restaurante;
import com.projetobd.delivery.service.RestauranteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/restaurantes")
public class RestauranteController {

    @Autowired
    private RestauranteService restauranteService;

    // Criar restaurante
    @PostMapping
    public String criar(@RequestBody Restaurante r) {
        long id = restauranteService.criarRestaurante(r);
        return "Restaurante criado com ID: " + id;
    }

    // Atualizar restaurante
    @PutMapping("/{id}")
    public String atualizar(@PathVariable long id, @RequestBody Restaurante r) {
        r.setIdRestaurante((int) id);
        int atualizado = restauranteService.atualizarRestaurante(r);
        return atualizado > 0 ? "Restaurante atualizado" : "Restaurante não encontrado";
    }

    // Deletar restaurante
    @DeleteMapping("/{id}")
    public String deletar(@PathVariable int id) {
        int deletado = restauranteService.deletarRestaurante(id);
        return deletado > 0 ? "Restaurante deletado" : "Restaurante não encontrado";
    }

    // Listar todos restaurantes
    @GetMapping
    public List<Restaurante> listar() {
        return restauranteService.listarTodos();
    }

    // === NOVOS ENDPOINTS PARA AS CONSULTAS ===

    // CONSULTA 1: Restaurantes por cidade
    @GetMapping("/cidade/{cidade}")
    public List<Restaurante> buscarPorCidade(@PathVariable String cidade) {
        return restauranteService.buscarPorCidade(cidade);
    }

    // CONSULTA 2: Restaurantes por tipo de culinária
    @GetMapping("/culinaria/{tipoCulinaria}")
    public List<Restaurante> buscarPorTipoCulinaria(@PathVariable String tipoCulinaria) {
        return restauranteService.buscarPorTipoCulinaria(tipoCulinaria);
    }

    // CONSULTA 3: Restaurantes com endereço completo
    @GetMapping("/endereco-completo")
    public List<String> restaurantesComEnderecoCompleto() {
        return restauranteService.restaurantesComEnderecoCompleto();
    }

    // CONSULTA 4: Restaurantes ordenados por nome
    @GetMapping("/ordenados-nome")
    public List<Restaurante> restaurantesOrdenadosPorNome() {
        return restauranteService.restaurantesOrdenadosPorNome();
    }

    // === ENDPOINTS EXISTENTES ===
    
    // Buscar por nome
    @GetMapping("/nome")
    public List<Restaurante> buscarPorNome(@RequestParam String nome) {
        return restauranteService.buscarPorNome(nome);
    }

    // Contagem por cidade
    @GetMapping("/contagem/cidade")
    public List<String> contarPorCidade() {
        return restauranteService.contarPorCidade();
    }

    @GetMapping("/media-avaliacao/{idRestaurante}")
    public Double mediaAvaliacao(@PathVariable long idRestaurante) {
        return restauranteService.mediaAvaliacao(idRestaurante);
    }

}