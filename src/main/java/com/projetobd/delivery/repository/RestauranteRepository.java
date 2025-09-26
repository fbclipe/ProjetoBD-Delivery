package com.projetobd.delivery.repository;

import com.projetobd.delivery.entity.Restaurante;
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
public class RestauranteRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Inserir restaurante e retornar ID gerado
    public long inserir(Restaurante r) {
        String sql = "INSERT INTO restaurante (nome, tipo_culinaria, cep, cidade, rua, numero, bairro) VALUES (?, ?, ?, ?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, r.getNome());
            ps.setString(2, r.getTipoCulinaria());
            ps.setString(3, r.getCep());
            ps.setString(4, r.getCidade());
            ps.setString(5, r.getRua());
            ps.setString(6, String.valueOf(r.getNumero()));
            ps.setString(7, r.getBairro());
            return ps;
        }, keyHolder);
        return keyHolder.getKey().longValue();
    }

    // Atualizar restaurante
    public int atualizar(Restaurante r) {
        String sql = "UPDATE restaurante SET nome=?, tipo_culinaria=?, cep=?, cidade=?, rua=?, numero=?, bairro=? WHERE id_restaurante=?";
        return jdbcTemplate.update(sql, r.getNome(), r.getTipoCulinaria(), r.getCep(), r.getCidade(), r.getRua(), r.getNumero(), r.getBairro(), r.getIdRestaurante());
    }

    // Deletar restaurante
    public int deletar(int id) {
        String sql = "DELETE FROM restaurante WHERE id_restaurante=?";
        return jdbcTemplate.update(sql, id);
    }

    // Listar todos os restaurantes
    public List<Restaurante> listar() {
        String sql = "SELECT id_restaurante AS idRestaurante, nome, tipo_culinaria AS tipoCulinaria, cep, cidade, rua, numero, bairro FROM restaurante";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Restaurante.class));
    }

    // Consultas personalizadas

    // Buscar por cidade
    public List<Restaurante> buscarPorCidade(String cidade) {
        String sql = "SELECT id_restaurante AS idRestaurante, nome, tipo_culinaria AS tipoCulinaria, cep, cidade, rua, numero, bairro " +
                "FROM restaurante WHERE cidade=?";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Restaurante.class), cidade);
    }

    // Contar restaurantes por cidade (exemplo de agregação)
    public List<String> contarPorCidade() {
        String sql = "SELECT cidade, COUNT(*) AS total FROM restaurante GROUP BY cidade";
        return jdbcTemplate.query(sql, (rs, rowNum) -> rs.getString("cidade") + ": " + rs.getInt("total") + " restaurantes");
    }

    // Buscar restaurante por nome (LIKE)
    public List<Restaurante> buscarPorNome(String nome) {
        String sql = "SELECT id_restaurante AS idRestaurante, nome, tipo_culinaria AS tipoCulinaria, cep, cidade, rua, numero, bairro " +
                "FROM restaurante WHERE nome LIKE ?";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Restaurante.class), "%" + nome + "%");
    }


}
