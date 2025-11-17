package com.projetobd.delivery.service;

import com.projetobd.delivery.entity.Pedido;
import com.projetobd.delivery.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
public class PedidoService {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private PedidoRepository repo;

    public long criar(Pedido p) {
        return repo.inserir(p);
    }

    public Pedido buscar(long id) {
        return repo.buscarPorId(id);
    }

    public int atualizar(Pedido p) {
        return repo.atualizar(p);
    }

    public int deletar(long id) {
        return repo.deletar(id);
    }

    public List<Pedido> listar() {
        return repo.listar();
    }


    public void simularPagamentoTrigger() {
        jdbcTemplate.update(
                "INSERT INTO Pagamento (idPedido, Valor) VALUES (1, 50.00)"
        );
    }

    public List<Map<String,Object>> listarLogsPagamento() {
        return jdbcTemplate.queryForList("SELECT * FROM LogPagamento ORDER BY DataLog DESC");
    }

    @Transactional // Garante que o DELETE e o INSERT ocorram na mesma transação
    public void simularItemTrigger() {

        // 1. APAGA a linha de teste (se ela existir)
        // Isso previne o erro "DuplicateKeyException"
        String deleteSql = "DELETE FROM DetalhePedido WHERE idPedido = 1 AND idProduto = 2";
        jdbcTemplate.update(deleteSql);

        // 2. INSERE a linha de teste novamente
        String insertSql = "INSERT INTO DetalhePedido (idPedido, idProduto, Quantidade, PrecoUnitario) " +
                "VALUES (1, 2, 10, 30.0)";
        jdbcTemplate.update(insertSql);
    }

    public List<Map<String,Object>> listarPedidosAtualizados() {
        return jdbcTemplate.queryForList("SELECT * FROM Pedido ORDER BY idPedido");
    }









    public void atualizarStatusEntrega(long idEntrega, String novoStatus) {
        repo.atualizarStatusEntrega(idEntrega, novoStatus);
    }

    public void aplicarDescontosProgressivos() {
        repo.aplicarDescontosProgressivos();
    }

}
