package com.projetobd.delivery.entity;

public class Cliente {

    private Long idCliente;
    private String nome;
    private String telefone;
    private String cep;
    private String rua;
    private String bairro;
    private String cidade;
    private String numero;

    public Cliente() {}

    public Cliente(Long idCliente, String nome, String telefone, String cep, String rua, String bairro, String cidade, String numero) {
        this.idCliente = idCliente;
        this.nome = nome;
        this.telefone = telefone;
        this.cep = cep;
        this.numero = numero;
        this.rua = rua;
        this.bairro = bairro;
        this.cidade = cidade;
    }

    // Getters e Setters
    public Long getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Long idCliente) {
        this.idCliente = idCliente;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getRua() {
        return rua;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getNumero() { return  numero; }

    public void setNumero(String numero) { this.numero = numero; }
}
