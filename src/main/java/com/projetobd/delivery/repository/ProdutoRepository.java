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

    // Inserir produto
    public long inserir(Produto p) {
        String sql = "INSERT INTO produto (nome, preco, id_restaurante) VALUES (?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, p.getNome());
            ps.setDouble(2, p.getPreco());
            ps.setLong(3, p.getIdRestaurante());
            return ps;
        }, keyHolder);
        return keyHolder.getKey().longValue();
    }

    // Buscar produto por ID - CORRIGIDO
    public Produto buscarPorId(long id) {
        String sql = "SELECT id_produto AS idProduto, nome, preco, id_restaurante AS idRestaurante FROM produto WHERE id_produto=?";
        try {
            return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> 
                new Produto(
                    rs.getLong("idProduto"),
                    rs.getString("nome"),
                    rs.getDouble("preco"),
                    rs.getLong("idRestaurante"),
                    null
                ), id);
        } catch (Exception e) {
            return null;
        }
    }

    // Atualizar produto
    public int atualizar(Produto p) {
        String sql = "UPDATE produto SET nome=?, preco=?, id_restaurante=? WHERE id_produto=?";
        return jdbcTemplate.update(sql, p.getNome(), p.getPreco(), p.getIdRestaurante(), p.getIdProduto());
    }

    // Deletar produto
    public int deletar(long id) {
        String sql = "DELETE FROM produto WHERE id_produto=?";
        return jdbcTemplate.update(sql, id);
    }

    // Listar todos produtos
    public List<Produto> listar() {
        String sql = "SELECT id_produto AS idProduto, nome, preco, id_restaurante AS idRestaurante FROM produto";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Produto.class));
    }

    // CONSULTA 1: JOIN - Produtos com nome do restaurante
    public List<Produto> produtosComRestaurante() {
        String sql = "SELECT p.id_produto AS idProduto, p.nome, p.preco, " +
                     "p.id_restaurante AS idRestaurante, r.nome AS nomeRestaurante " +
                     "FROM produto p " +
                     "JOIN restaurante r ON p.id_restaurante = r.id_restaurante " +
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

    // CONSULTA 2: Produtos por faixa de preço
    public List<Produto> produtosPorFaixaPreco(double precoMin, double precoMax) {
        String sql = "SELECT id_produto AS idProduto, nome, preco, id_restaurante AS idRestaurante " +
                     "FROM produto WHERE preco BETWEEN ? AND ? ORDER BY preco DESC";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Produto.class), precoMin, precoMax);
    }

    // CONSULTA 3: Restaurantes por tipo de culinária com contagem de produtos
    public List<String> restaurantesComContagemProdutos() {
        String sql = "SELECT r.nome, r.tipo_culinaria, COUNT(p.id_produto) as total_produtos " +
                     "FROM restaurante r " +
                     "LEFT JOIN produto p ON r.id_restaurante = p.id_restaurante " +
                     "GROUP BY r.id_restaurante, r.nome, r.tipo_culinaria " +
                     "ORDER BY total_produtos DESC";
        
        return jdbcTemplate.query(sql, (rs, rowNum) -> 
            rs.getString("nome") + " - " + 
            rs.getString("tipo_culinaria") + " - " + 
            rs.getInt("total_produtos") + " produtos"
        );
    }

    // CONSULTA 4: Média de preços por cidade
    public List<String> mediaPrecosPorCidade() {
        String sql = "SELECT r.cidade, AVG(p.preco) as media_preco, COUNT(p.id_produto) as total_produtos " +
                     "FROM restaurante r " +
                     "JOIN produto p ON r.id_restaurante = p.id_restaurante " +
                     "GROUP BY r.cidade " +
                     "HAVING COUNT(p.id_produto) > 0 " +
                     "ORDER BY media_preco DESC";
        
        return jdbcTemplate.query(sql, (rs, rowNum) -> 
            rs.getString("cidade") + ": R$ " + 
            String.format("%.2f", rs.getDouble("media_preco")) + " (média) - " + 
            rs.getInt("total_produtos") + " produtos"
        );
    }

    // NOVO MÉTODO: Restaurantes que possuem determinado produto
    public List<Map<String, Object>> restaurantesComProduto(String nomeProduto) {
        String sql = "SELECT DISTINCT r.id_restaurante AS idRestaurante, r.nome, r.tipo_culinaria AS tipoCulinaria, " +
                     "r.cidade, r.rua, r.numero, r.bairro, p.nome AS produtoEncontrado, p.preco " +
                     "FROM restaurante r " +
                     "JOIN produto p ON r.id_restaurante = p.id_restaurante " +
                     "WHERE p.nome LIKE ? " +
                     "ORDER BY r.nome";
        
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Map<String, Object> resultado = new HashMap<>();
            resultado.put("idRestaurante", rs.getLong("idRestaurante"));
            resultado.put("nome", rs.getString("nome"));
            resultado.put("tipoCulinaria", rs.getString("tipoCulinaria"));
            resultado.put("cidade", rs.getString("cidade"));
            resultado.put("rua", rs.getString("rua"));
            
            int numero = rs.getInt("numero");
            resultado.put("numero", rs.wasNull() ? null : numero);
            
            resultado.put("bairro", rs.getString("bairro"));
            resultado.put("produtoEncontrado", rs.getString("produtoEncontrado"));
            resultado.put("preco", rs.getDouble("preco"));
            
            return resultado;
        }, "%" + nomeProduto + "%");
    }
}