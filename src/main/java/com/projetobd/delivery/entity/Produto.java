package com.projetobd.delivery.entity;

import java.util.List;

public class Produto {

    private Long idProduto;
    private String nome;
    private Double preco;
    private Long idRestaurante;
    private String nomeRestaurante;
    private List<Produto> combo;
    public Produto() {}

    public Produto(Long idProduto, String nome, Double preco, Long idRestaurante, String nomeRestaurante) {
        this.idProduto = idProduto;
        this.nome = nome;
        this.preco = preco;
        this.idRestaurante = idRestaurante;
        this.nomeRestaurante = nomeRestaurante;
    }

    // Getters e Setters
    public Long getIdProduto() { return idProduto; }
    public void setIdProduto(Long idProduto) { this.idProduto = idProduto; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public Double getPreco() { return preco; }
    public void setPreco(Double preco) { this.preco = preco; }

    public Long getIdRestaurante() { return idRestaurante; }
    public void setIdRestaurante(Long idRestaurante) { this.idRestaurante = idRestaurante; }

    public String getNomeRestaurante() { return nomeRestaurante; }
    public void setNomeRestaurante(String nomeRestaurante) { this.nomeRestaurante = nomeRestaurante; }

    public List getCombo() { return combo; }
    public void setCombo() { this.combo = combo; }
}