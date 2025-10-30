package com.projetobd.delivery.entity;

public class PagamentoPix extends Pagamento {

    private String chavePix;
    private String banco;

    public PagamentoPix() {}

    public PagamentoPix(Long idPagamento, Double valor, Long idPedido, String chavePix, String banco) {
        super(idPagamento, valor, "Pix", idPedido);
        this.chavePix = chavePix;
        this.banco = banco;
    }

    public String getChavePix() {
        return chavePix;
    }

    public void setChavePix(String chavePix) {
        this.chavePix = chavePix;
    }

    public String getBanco(){ 
        return banco;
    }

    public void setBanco(String banco) {
        this.banco = banco;
    }

    @Override
    public String toString() {
        return super.toString() + ", chavePix='" + chavePix + '\'' + '}';
    }
}
