package com.projetobd.delivery.entity;

import java.sql.Timestamp;

public class Avaliacao {

    private Long idAvaliacao;
    private Long idCliente;
    private Long idRestaurante;
    private String comentario;
    private int nota;
    private Timestamp data;
    
    public Avaliacao(Long idAvaliacao, Long idCliente, Long idRestaurante, String comentario, int nota,
            Timestamp data) {
        this.idAvaliacao = idAvaliacao;
        this.idCliente = idCliente;
        this.idRestaurante = idRestaurante;
        this.comentario = comentario;
        this.nota = nota;
        this.data = data;
    }

    public Long getIdAvaliacao() {
        return idAvaliacao;
    }

    public void setIdAvaliacao(Long idAvaliacao) {
        this.idAvaliacao = idAvaliacao;
    }

    public Long getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Long idCliente) {
        this.idCliente = idCliente;
    }

    public Long getIdRestaurante() {
        return idRestaurante;
    }

    public void setIdRestaurante(Long idRestaurante) {
        this.idRestaurante = idRestaurante;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public int getNota() {
        return nota;
    }

    public void setNota(int nota) {
        this.nota = nota;
    }

    public Timestamp getData() {
        return data;
    }

    public void setData(Timestamp data) {
        this.data = data;
    }

    
}
