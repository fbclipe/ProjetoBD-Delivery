package com.projetobd.delivery.entity;

public class PagamentoDinheiro extends Pagamento {

    private Double troco;

    public PagamentoDinheiro() {}

    public PagamentoDinheiro(Long idPagamento, Double valor, Long idPedido, Double troco) {
        super(idPagamento, valor, "Dinheiro", idPedido);
        this.troco = troco;
    }

    public Double getTroco() {
        return troco;
    }

    public void setTroco(Double troco) {
        this.troco = troco;
    }

    @Override
    public String toString() {
        return super.toString() + ", troco=" + troco + '}';
    }
}
