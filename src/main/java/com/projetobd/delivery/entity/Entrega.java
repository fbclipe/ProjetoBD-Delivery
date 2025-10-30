package com.projetobd.delivery.entity;

import java.sql.Timestamp;

public class Entrega {

    private Long idEntrega;
    private Long idEntregador;
    private Long idPedido;
    private Timestamp dataHoraSaida;
    private Timestamp dataHoraChegada;
    private String status;

    public Entrega() {}

    public Entrega(Long idEntrega, Timestamp dataHoraSaida, Timestamp dataHoraChegada, String status, Pedido idPedido, Entregador idEntregador) {
        this.idEntrega = idEntrega;
        this.dataHoraSaida = dataHoraSaida;
        this.dataHoraChegada = dataHoraChegada;
        this.status = status;
    }

    public Long getIdEntrega() {
        return idEntrega;
    }

    public void setIdEntrega(Long idEntrega) {
        this.idEntrega = idEntrega;
    }

    public Timestamp getDataHoraSaida() {
        return dataHoraSaida;
    }

    public void setDataHoraSaida(Timestamp dataHoraSaida) {
        this.dataHoraSaida = dataHoraSaida;
    }

    public Timestamp getDataHoraChegada() {
        return dataHoraChegada;
    }

    public void setDataHoraChegada(Timestamp dataHoraChegada) {
        this.dataHoraChegada = dataHoraChegada;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getIdEntregador() {
        return idEntregador;
    }

    public void setIdEntregador(Long idEntregador) {
        this.idEntregador = idEntregador;
    }

    public Long getIdPedido() {
        return idPedido;
    }

    public void setIdPedido(Long idPedido) {
        this.idPedido = idPedido;
    }
}
