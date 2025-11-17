package com.projetobd.delivery.service;

import com.projetobd.delivery.entity.Cliente;
import com.projetobd.delivery.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository repo;

    public long criar(Cliente c) {
        return repo.inserir(c);
    }

    public Cliente buscar(long id) {
        return repo.buscarPorId(id);
    }

    public int atualizar(Cliente c) {
        return repo.atualizar(c);
    }

    public int deletar(long id) {
        return repo.deletar(id);
    }

    public List<Cliente> listar() {
        return repo.listar();
    }

    // Função SQL: fn_nivel_cliente
    public String nivelCliente(long idCliente) {
        // retorna "Ouro", "Prata", "Bronze" ou "Sem Pedidos"
        return repo.nivelCliente(idCliente);
    }
}
