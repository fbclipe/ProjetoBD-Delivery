package com.projetobd.delivery.entity;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class Pedido {
    private Long idPedido;
    private String status;
    private BigDecimal precoTotal;
    private Timestamp dataHora;
    private Long idCliente;
    
    public Pedido(Long idPedido, String status, BigDecimal precoTotal, Timestamp dataHora, Long idCliente) {
        this.idPedido = idPedido;
        this.status = status;
        this.precoTotal = precoTotal;
        this.dataHora = dataHora;
        this.idCliente = idCliente;
    }

    public Long getIdPedido() {
        return idPedido;
    }

    public void setIdPedido(Long idPedido) {
        this.idPedido = idPedido;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public BigDecimal getPrecoTotal() {
        return precoTotal;
    }
    public void setPrecoTotal(BigDecimal precoTotal) {
        this.precoTotal = precoTotal;
    }
    public Timestamp getDataHora() {
        return dataHora;
    }
    public void setDataHora(Timestamp dataHora) {
        this.dataHora = dataHora;
    }
    public Long getIdCliente() {
        return idCliente;
    }
    public void setIdCliente(Long idCliente) {
        this.idCliente = idCliente;
    }


}
