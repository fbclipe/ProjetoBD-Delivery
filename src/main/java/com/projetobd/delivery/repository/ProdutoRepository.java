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
import java.util.List;

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

    // Buscar produtos de um restaurante
    public List<Produto> buscarPorRestaurante(long idRestaurante) {
        String sql = "SELECT id_produto AS idProduto, nome, preco, id_restaurante AS idRestaurante FROM produto WHERE id_restaurante=?";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Produto.class), idRestaurante);
    }

    // Buscar produtos acima de determinado preço (consulta personalizada)
    public List<Produto> produtosMaisCaros(double precoMin) {
        String sql = "SELECT id_produto AS idProduto, nome, preco, id_restaurante AS idRestaurante FROM produto WHERE preco>=?";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Produto.class), precoMin);
    }
}
