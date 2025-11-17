package com.projetobd.delivery.controller;

import com.projetobd.delivery.entity.Cliente;
import com.projetobd.delivery.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteService service;

    @PostMapping
    public long criar(@RequestBody Cliente c) {
        return service.criar(c);
    }

    @GetMapping("/{id}")
    public Cliente buscar(@PathVariable long id) {
        return service.buscar(id);
    }

    @PutMapping("/{id}")
    public int atualizar(@PathVariable long id, @RequestBody Cliente c) {
        c.setIdCliente(id);
        return service.atualizar(c);
    }

    @DeleteMapping("/{id}")
    public int deletar(@PathVariable long id) {
        return service.deletar(id);
    }

    @GetMapping
    public List<Cliente> listar() {
        return service.listar();
    }

    @GetMapping("/nivel/{id}")
    public String nivelCliente(@PathVariable long id) {
        return service.nivelCliente(id);
    }



}
