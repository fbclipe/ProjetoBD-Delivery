package com.projetobd.delivery.repository;

import com.projetobd.delivery.entity.Pedido;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Map;

@Repository
public class PedidoRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Inserir pedido
    public long inserir(Pedido p) {
        String sql = "INSERT INTO Pedido (Status, PrecoTotal, dataHora, idCliente) "
                + "VALUES (?, ?, ?, ?)";

        KeyHolder kh = new GeneratedKeyHolder();

        jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, p.getStatus());
            ps.setBigDecimal(2, p.getPrecoTotal());
            ps.setTimestamp(3, p.getDataHora());
            ps.setLong(4, p.getIdCliente());
            return ps;
        }, kh);

        return kh.getKey().longValue();
    }

    // Buscar por ID
    public Pedido buscarPorId(long id) {
        String sql = "SELECT idPedido, Status, PrecoTotal, dataHora, idCliente "
                + "FROM Pedido WHERE idPedido=?";

        try {
            return jdbcTemplate.queryForObject(sql,
                    (rs, row) -> new Pedido(
                            rs.getLong("idPedido"),
                            rs.getString("Status"),
                            rs.getBigDecimal("PrecoTotal"),
                            rs.getTimestamp("dataHora"),
                            rs.getLong("idCliente")
                    ),
                    id
            );
        } catch (Exception e) {
            return null;
        }
    }

    // Atualizar
    public int atualizar(Pedido p) {
        String sql = "UPDATE Pedido SET Status=?, PrecoTotal=?, dataHora=?, idCliente=? "
                + "WHERE idPedido=?";

        return jdbcTemplate.update(sql,
                p.getStatus(),
                p.getPrecoTotal(),
                p.getDataHora(),
                p.getIdCliente(),
                p.getIdPedido()
        );
    }

    // Deletar
    public int deletar(long id) {
        return jdbcTemplate.update("DELETE FROM Pedido WHERE idPedido=?", id);
    }

    // Listar todos
    public List<Pedido> listar() {
        String sql = "SELECT idPedido, Status, PrecoTotal, dataHora, idCliente FROM Pedido";

        return jdbcTemplate.query(sql,
                (rs, row) -> new Pedido(
                        rs.getLong("idPedido"),
                        rs.getString("Status"),
                        rs.getBigDecimal("PrecoTotal"),
                        rs.getTimestamp("dataHora"),
                        rs.getLong("idCliente")
                )
        );
    }

    public List<Map<String, Object>> listarLogPagamento() {
        String sql = "SELECT * FROM LogPagamento ORDER BY DataLog DESC";
        return jdbcTemplate.queryForList(sql);
    }

    // Método para inserir um item e acionar o trigger trg_atualiza_total_pedido
    public int inserirItem(long idPedido, long idProduto, int quantidade, double precoUnitario) {
        String sql = "INSERT INTO DetalhePedido (idPedido, idProduto, Quantidade, PrecoUnitario) "
                + "VALUES (?, ?, ?, ?)";

        return jdbcTemplate.update(sql, idPedido, idProduto, quantidade, precoUnitario);
    }

    // Executa o procedure de descontos progressivos
    public void aplicarDescontosProgressivos() {
        jdbcTemplate.execute("CALL sp_aplicar_descontos_progressivos()");
    }

    // Executa o procedure de atualizar status da entrega
    public void atualizarStatusEntrega(long idEntrega, String novoStatus) {
        String sql = "CALL sp_atualizar_status_entrega(?, ?)";
        jdbcTemplate.update(sql, idEntrega, novoStatus);
    }


}
