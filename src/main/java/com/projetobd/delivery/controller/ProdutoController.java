package com.projetobd.delivery.controller;

import com.projetobd.delivery.entity.Produto;
import com.projetobd.delivery.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    // Criar produto
    @PostMapping
    public String criar(@RequestBody Produto p) {
        long id = produtoService.criarProduto(p);
        return "Produto criado com ID: " + id;
    }

    // Atualizar produto
    @PutMapping("/{id}")
    public String atualizar(@PathVariable long id, @RequestBody Produto p) {
        p.setIdProduto(id);
        int atualizado = produtoService.atualizarProduto(p);
        return atualizado > 0 ? "Produto atualizado" : "Produto não encontrado";
    }

    // Deletar produto
    @DeleteMapping("/{id}")
    public String deletar(@PathVariable long id) {
        int deletado = produtoService.deletarProduto(id);
        return deletado > 0 ? "Produto deletado" : "Produto não encontrado";
    }

    // Listar todos produtos
    @GetMapping
    public List<Produto> listar() {
        return produtoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Produto buscarPorId(@PathVariable long id) {
    return produtoService.buscarPorId(id);
}

@GetMapping("/com-restaurante")
public List<Produto> produtosComRestaurante() {
    return produtoService.produtosComRestaurante();
}

@GetMapping("/faixa-preco")
public List<Produto> produtosPorFaixaPreco(
        @RequestParam double precoMin, 
        @RequestParam double precoMax) {
    return produtoService.produtosPorFaixaPreco(precoMin, precoMax);
}

@GetMapping("/restaurantes-contagem")
public List<String> restaurantesComContagemProdutos() {
    return produtoService.restaurantesComContagemProdutos();
}

@GetMapping("/media-precos-cidade")
public List<String> mediaPrecosPorCidade() {
    return produtoService.mediaPrecosPorCidade();
}
}
