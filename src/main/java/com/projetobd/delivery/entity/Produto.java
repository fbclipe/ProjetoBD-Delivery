package com.projetobd.delivery.entity;

public class Produto {

    private Long idProduto;
    private String nome;
    private Double preco;
    private Long idRestaurante; // FK para Restaurante

    public Produto() {}

    public Produto(Long idProduto, String nome, Double preco, Long idRestaurante) {
        this.idProduto = idProduto;
        this.nome = nome;
        this.preco = preco;
        this.idRestaurante = idRestaurante;
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
}