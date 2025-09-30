package com.projetobd.delivery.service;

import com.projetobd.delivery.entity.Produto;
import com.projetobd.delivery.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    // CRUD
    public long criarProduto(Produto p) { return produtoRepository.inserir(p); }
    public Produto buscarPorId(long id) { return produtoRepository.buscarPorId(id); }
    public int atualizarProduto(Produto p) { return produtoRepository.atualizar(p); }
    public int deletarProduto(long id) { return produtoRepository.deletar(id); }
    public List<Produto> listarTodos() { return produtoRepository.listar(); }
    public List<Produto> produtosComRestaurante() { return produtoRepository.produtosComRestaurante(); }
    public List<Produto> produtosPorFaixaPreco(double precoMin, double precoMax) { return produtoRepository.produtosPorFaixaPreco(precoMin, precoMax); }
    public List<String> restaurantesComContagemProdutos() { return produtoRepository.restaurantesComContagemProdutos(); }
    public List<String> mediaPrecosPorCidade() { return produtoRepository.mediaPrecosPorCidade(); }
    
    // NOVO MÉTODO: Restaurantes que possuem determinado produto
    public List<Map<String, Object>> restaurantesComProduto(String nomeProduto) {
        return produtoRepository.restaurantesComProduto(nomeProduto);
    }
}