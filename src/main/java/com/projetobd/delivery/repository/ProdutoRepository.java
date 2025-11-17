package com.projetobd.delivery.repository;

import com.projetobd.delivery.entity.Produto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class ProdutoRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // INSERIR PRODUTO
    public long inserir(Produto p) {
        String sql = "INSERT INTO Produto (nome, preco, idRestaurante) VALUES (?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, p.getNome());
            ps.setDouble(2, p.getPreco());
            ps.setLong(3, p.getIdRestaurante());
            return ps;
        }, keyHolder);

        return keyHolder.getKey().longValue();
    }

    // BUSCAR POR ID
    public Produto buscarPorId(long id) {
        String sql = "SELECT idProduto, nome, preco, idRestaurante FROM Produto WHERE idProduto=?";

        try {
            return jdbcTemplate.queryForObject(sql, (rs, rowNum) ->
                    new Produto(
                            rs.getLong("idProduto"),
                            rs.getString("nome"),
                            rs.getDouble("preco"),
                            rs.getLong("idRestaurante"),
                            null
                    ), id
            );
        } catch (Exception e) {
            return null;
        }
    }

    // ATUALIZAR
    public int atualizar(Produto p) {
        String sql = "UPDATE Produto SET nome=?, preco=?, idRestaurante=? WHERE idProduto=?";
        return jdbcTemplate.update(sql, p.getNome(), p.getPreco(), p.getIdRestaurante(), p.getIdProduto());
    }

    // DELETAR
    public int deletar(long id) {
        String sql = "DELETE FROM Produto WHERE idProduto=?";
        return jdbcTemplate.update(sql, id);
    }

    // LISTAR TODOS
    public List<Produto> listar() {
        String sql = "SELECT idProduto, nome, preco, idRestaurante FROM Produto";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Produto.class));
    }

    // CONSULTA 1: PRODUTOS COM NOME DO RESTAURANTE
    public List<Produto> produtosComRestaurante() {
        String sql = "SELECT p.idProduto, p.nome, p.preco, p.idRestaurante, " +
                "r.nome AS nomeRestaurante " +
                "FROM Produto p " +
                "JOIN Restaurante r ON p.idRestaurante = r.idRestaurante " +
                "ORDER BY r.nome, p.nome";

        return jdbcTemplate.query(sql, (rs, rowNum) ->
                new Produto(
                        rs.getLong("idProduto"),
                        rs.getString("nome"),
                        rs.getDouble("preco"),
                        rs.getLong("idRestaurante"),
                        rs.getString("nomeRestaurante")
                )
        );
    }

    // CONSULTA 2: PRODUTOS POR FAIXA DE PREÇO
    public List<Produto> produtosPorFaixaPreco(double precoMin, double precoMax) {
        String sql = "SELECT idProduto, nome, preco, idRestaurante " +
                "FROM Produto WHERE preco BETWEEN ? AND ? ORDER BY preco DESC";

        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Produto.class), precoMin, precoMax);
    }

    // CONSULTA 3: RESTAURANTES POR TIPO DE CULINARIA COM CONTAGEM DE PRODUTOS
    public List<String> restaurantesComContagemProdutos() {
        String sql = "SELECT r.nome, r.tipoCulinaria, COUNT(p.idProduto) AS totalProdutos " +
                "FROM Restaurante r " +
                "LEFT JOIN Produto p ON r.idRestaurante = p.idRestaurante " +
                "GROUP BY r.idRestaurante, r.nome, r.tipoCulinaria " +
                "ORDER BY totalProdutos DESC";

        return jdbcTemplate.query(sql, (rs, rowNum) ->
                rs.getString("nome") + " - " +
                        rs.getString("tipoCulinaria") + " - " +
                        rs.getInt("totalProdutos") + " produtos"
        );
    }

    // CONSULTA 4: MEDIA DE PRECO POR CIDADE
    public List<String> mediaPrecosPorCidade() {
        String sql = "SELECT r.cidade, AVG(p.preco) AS mediaPreco, COUNT(p.idProduto) AS totalProdutos " +
                "FROM Restaurante r " +
                "JOIN Produto p ON r.idRestaurante = p.idRestaurante " +
                "GROUP BY r.cidade HAVING COUNT(p.idProduto) > 0 " +
                "ORDER BY mediaPreco DESC";

        return jdbcTemplate.query(sql, (rs, rowNum) ->
                rs.getString("cidade") + ": R$ " +
                        String.format("%.2f", rs.getDouble("mediaPreco")) +
                        " (média) - " + rs.getInt("totalProdutos") + " produtos"
        );
    }

    // CONSULTA 5: RESTAURANTES QUE POSSUEM UM PRODUTO ESPECÍFICO
    public List<Map<String, Object>> restaurantesComProduto(String nomeProduto) {
        String sql = "SELECT DISTINCT r.idRestaurante, r.nome, r.tipoCulinaria, r.cidade, " +
                "r.rua, r.numero, r.bairro, p.nome AS produtoEncontrado, p.preco " +
                "FROM Restaurante r " +
                "JOIN Produto p ON r.idRestaurante = p.idRestaurante " +
                "WHERE p.nome LIKE ? " +
                "ORDER BY r.nome";

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Map<String, Object> m = new HashMap<>();
            m.put("idRestaurante", rs.getLong("idRestaurante"));
            m.put("nome", rs.getString("nome"));
            m.put("tipoCulinaria", rs.getString("tipoCulinaria"));
            m.put("cidade", rs.getString("cidade"));
            m.put("rua", rs.getString("rua"));
            m.put("numero", rs.getString("numero"));
            m.put("bairro", rs.getString("bairro"));
            m.put("produtoEncontrado", rs.getString("produtoEncontrado"));
            m.put("preco", rs.getDouble("preco"));
            return m;
        }, "%" + nomeProduto + "%");
    }
}
