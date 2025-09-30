package com.projetobd.delivery.entity;

public class Restaurante {
    private Long idRestaurante;
    private String nome;
    private String tipoCulinaria;
    private String cep;
    private String cidade;
    private String rua;
    private Integer numero;
    private String bairro;

    // Getters e Setters
    public long getIdRestaurante() {
        return idRestaurante;
    }
    public void setIdRestaurante(long idRestaurante) {
        this.idRestaurante = idRestaurante;
    }

    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTipoCulinaria() {
        return tipoCulinaria;
    }
    public void setTipoCulinaria(String tipoCulinaria) {
        this.tipoCulinaria = tipoCulinaria;
    }

    public String getCep() {
        return cep;
    }
    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getCidade() {
        return cidade;
    }
    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getRua() {
        return rua;
    }
    public void setRua(String rua) {
        this.rua = rua;
    }

    public int getNumero() {
        return numero;
    }
    public void setNumero(int numero) {
        this.numero = numero;
    }

    public String getBairro() {
        return bairro;
    }
    public void setBairro(String bairro) {
        this.bairro = bairro;
    }
}
