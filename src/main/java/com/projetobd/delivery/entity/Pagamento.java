package com.projetobd.delivery.entity;

import java.sql.Timestamp;

public class Pagamento {

    private Long idPagamento;
    private Double valor;
    private Timestamp data;
    private Long idPedido; // FK para Pedido

    public Pagamento() {}

    public Pagamento(Long idPagamento, Double valor, Long idPedido, Timestamp data) {
        this.idPagamento = idPagamento;
        this.valor = valor;
        this.idPedido = idPedido;
        this.data = data;
    }

    public Pagamento(Long idPagamento, Double valor, String pix, Long idPedido) {
    }

    public Long getIdPagamento() {
        return idPagamento;
    }

    public void setIdPagamento(Long idPagamento) {
        this.idPagamento = idPagamento;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }


    public Long getIdPedido() {
        return idPedido;
    }

    public void setIdPedido(Long idPedido) {
        this.idPedido = idPedido;
    }

    public Timestamp getData() {
        return data;
    }

    public void setData(Timestamp data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "Pagamento{" +
                "idPagamento=" + idPagamento +
                ", valor=" + valor +
                ", formaPagamento='" + '\'' +
                ", idPedido=" + idPedido +
                '}';
    }
}
