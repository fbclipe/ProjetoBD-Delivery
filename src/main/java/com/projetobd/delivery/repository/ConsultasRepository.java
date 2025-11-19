package com.projetobd.delivery.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ConsultasRepository {

    @Autowired
    private JdbcTemplate jdbc;

    // VIEW 1 – Comidas mais vendidas
    public List<Map<String, Object>> comidasMaisVendidas() {
        return jdbc.queryForList("SELECT * FROM vw_ComidasMaisVendidas");
    }

    // VIEW 2 – Desempenho entregadores
    public List<Map<String, Object>> desempenhoEntregas() {
        return jdbc.queryForList("SELECT * FROM vw_DesempenhoEntregas");
    }

    // Consulta 1 – Clientes sem pedidos
    public List<Map<String, Object>> clientesSemPedidos() {
        String sql =
                "SELECT c.idCliente, c.Nome " +
                        "FROM Cliente c LEFT JOIN Pedido p ON c.idCliente = p.idCliente " +
                        "WHERE p.idPedido IS NULL";
        return jdbc.queryForList(sql);
    }

    // Consulta 2 – FULL JOIN SIMULADO
    public List<Map<String, Object>> restaurantesAvaliacoes() {
        String sql =
                "(SELECT r.idRestaurante, r.Nome AS Restaurante, r.TipoCulinaria, " +
                        "a.idAvaliacao, a.Nota, a.Comentario, a.Data AS DataAvaliacao " +
                        "FROM Restaurante r LEFT JOIN Avaliacao a ON r.idRestaurante = a.idRestaurante) " +

                        "UNION " +

                        "(SELECT r.idRestaurante, r.Nome AS Restaurante, r.TipoCulinaria, " +
                        "a.idAvaliacao, a.Nota, a.Comentario, a.Data AS DataAvaliacao " +
                        "FROM Restaurante r RIGHT JOIN Avaliacao a ON r.idRestaurante = a.idRestaurante)";

        return jdbc.queryForList(sql);
    }

    // Consulta 3 – Restaurantes com vendas acima da média
    public List<Map<String, Object>> restaurantesAcimaMedia() {
        String sql =
                "SELECT r.Nome AS Restaurante, COUNT(dp.idProduto) AS TotalProdutosVendidos " +
                        "FROM Restaurante r " +
                        "JOIN Produto p ON r.idRestaurante = p.idRestaurante " +
                        "JOIN DetalhePedido dp ON dp.idProduto = p.idProduto " +
                        "GROUP BY r.Nome " +
                        "HAVING COUNT(dp.idProduto) > (" +
                        "   SELECT AVG(TotalPedidos) FROM (" +
                        "       SELECT COUNT(dp2.idProduto) AS TotalPedidos " +
                        "       FROM Restaurante r2 " +
                        "       JOIN Produto p2 ON r2.idRestaurante = p2.idRestaurante " +
                        "       JOIN DetalhePedido dp2 ON dp2.idProduto = p2.idProduto " +
                        "       GROUP BY r2.Nome" +
                        "   ) AS MediaPedidos" +
                        ")";
        return jdbc.queryForList(sql);
    }

    // Consulta 4 – Desempenho de entregadores
    public List<Map<String, Object>> entregadoresComDesempenho() {
        String sql =
                "SELECT e.Nome AS Entregador, en.TotalEntregas, en.MediaTempoEntrega " +
                        "FROM Entregador e " +
                        "JOIN (" +
                        "   SELECT idEntregador, COUNT(idEntrega) AS TotalEntregas, " +
                        "   AVG(TIMESTAMPDIFF(MINUTE, dataHoraSaida, dataHoraChegada)) AS MediaTempoEntrega " +
                        "   FROM Entrega GROUP BY idEntregador" +
                        ") AS en ON e.idEntregador = en.idEntregador " +
                        "ORDER BY en.TotalEntregas DESC";

        return jdbc.queryForList(sql);
    }

    // (Opcional) Mostrar índices criados
    public List<Map<String, Object>> listarIndices() {
        return jdbc.queryForList("SHOW INDEXES FROM DetalhePedido");
    }
}
