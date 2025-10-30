package com.projetobd.delivery.entity;

public class PagamentoCartao extends Pagamento {

    private String numeroCartao;
    private String bandeira;

    public PagamentoCartao() {}

    public PagamentoCartao(Long idPagamento, Double valor, Long idPedido,
                           String numeroCartao, String nomeTitular, String validade, String bandeira) {
        super(idPagamento, valor, "Cartao", idPedido);
        this.numeroCartao = numeroCartao;
        this.bandeira = bandeira;
    }

    public String getNumeroCartao() {
        return numeroCartao;
    }

    public void setNumeroCartao(String numeroCartao) {
        this.numeroCartao = numeroCartao;
    }

    public String getBandeira() {
        return bandeira;
    }

    public void setBandeira(String bandeira) {
        this.bandeira = bandeira;
    }

    @Override
    public String toString() {
        return super.toString() +
                ", numeroCartao='" + numeroCartao + '\'' +
                ", bandeira='" + bandeira + '\'' +
                '}';
    }
}
