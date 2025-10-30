package com.projetobd.delivery.entity;

public class Entregador {
    private Long idEntregador;
    private String nome;
    private String telefone;

    public Entregador() {}

    public Entregador(Long idEntregador, String nome, String telefone) {
        this.idEntregador = idEntregador;
        this.nome = nome;
        this.telefone = telefone;
    }

    public Long getIdEntregador() {
        return idEntregador;
    }

    public void setIdEntregador(Long idEntregador) {
        this.idEntregador = idEntregador;
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
}
