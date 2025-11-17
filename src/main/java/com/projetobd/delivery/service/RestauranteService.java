package com.projetobd.delivery.service;


import com.projetobd.delivery.entity.Restaurante;
import com.projetobd.delivery.repository.RestauranteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class RestauranteService {

    @Autowired
    private RestauranteRepository restauranteRepository;

    // CRUD

    public long criarRestaurante(Restaurante r) {
        return restauranteRepository.inserir(r);
    }

    public int atualizarRestaurante(Restaurante r) {
        return restauranteRepository.atualizar(r);
    }

    public int deletarRestaurante(int id) {
        return restauranteRepository.deletar(id);
    }

    public List<Restaurante> listarTodos() {
        return restauranteRepository.listar();
    }

    public Restaurante buscarPorId(long id) { // NOVO MÉTODO
        return restauranteRepository.buscarPorId(id);
    }

    // Consultas personalizadas

    public List<Restaurante> buscarPorCidade(String cidade) {
        return restauranteRepository.buscarPorCidade(cidade);
    }

    public List<String> contarPorCidade() {
        return restauranteRepository.contarPorCidade();
    }

    public List<Restaurante> buscarPorNome(String nome) {
        return restauranteRepository.buscarPorNome(nome);
    }

    // RestauranteService.java
    public List<Restaurante> buscarPorTipoCulinaria(String tipoCulinaria) {
        return restauranteRepository.buscarPorTipoCulinaria(tipoCulinaria);
    }

    public List<String> restaurantesComEnderecoCompleto() {
        return restauranteRepository.restaurantesComEnderecoCompleto();
    }   

    public List<Restaurante> restaurantesOrdenadosPorNome() {
        return restauranteRepository.restaurantesOrdenadosPorNome();
    }

    public Double mediaAvaliacao(long idRestaurante) {
        return restauranteRepository.mediaAvaliacao(idRestaurante);
    }


}
