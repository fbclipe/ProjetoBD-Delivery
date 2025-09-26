package com.projetobd.delivery.service;

import com.projetobd.delivery.entity.Produto;
import com.projetobd.delivery.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    // CRUD
    public long criarProduto(Produto p) { return produtoRepository.inserir(p); }
    public int atualizarProduto(Produto p) { return produtoRepository.atualizar(p); }
    public int deletarProduto(long id) { return produtoRepository.deletar(id); }
    public List<Produto> listarTodos() { return produtoRepository.listar(); }

    // Consultas personalizadas
    public List<Produto> buscarPorRestaurante(long idRestaurante) { return produtoRepository.buscarPorRestaurante(idRestaurante); }
    public List<Produto> produtosMaisCaros(double precoMin) { return produtoRepository.produtosMaisCaros(precoMin); }
}