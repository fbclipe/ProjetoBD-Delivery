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
        String sql = "INSERT INTO Restaurante (Nome, TipoCulinaria, CEP, Cidade, Rua, Numero, Bairro) VALUES (?, ?, ?, ?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, r.getNome());
            ps.setString(2, r.getTipoCulinaria());
            ps.setString(3, r.getCep());
            ps.setString(4, r.getCidade());
            ps.setString(5, r.getRua());
            ps.setString(6, r.getNumero());  // numero é varchar no banco
            ps.setString(7, r.getBairro());
            return ps;
        }, keyHolder);
        return keyHolder.getKey().longValue();
    }

    // Atualizar restaurante
    public int atualizar(Restaurante r) {
        String sql = "UPDATE Restaurante SET Nome=?, TipoCulinaria=?, CEP=?, Cidade=?, Rua=?, Numero=?, Bairro=? WHERE idRestaurante=?";
        return jdbcTemplate.update(sql, r.getNome(), r.getTipoCulinaria(), r.getCep(), r.getCidade(), r.getRua(), r.getNumero(), r.getBairro(), r.getIdRestaurante());
    }

    // Deletar restaurante
    public int deletar(int id) {
        String sql = "DELETE FROM Restaurante WHERE idRestaurante=?";
        return jdbcTemplate.update(sql, id);
    }

    // Listar todos os restaurantes
    public List<Restaurante> listar() {
        String sql = "SELECT idRestaurante, Nome, TipoCulinaria, CEP, Cidade, Rua, Numero, Bairro FROM Restaurante";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Restaurante.class));
    }

    // Buscar por cidade
    public List<Restaurante> buscarPorCidade(String cidade) {
        String sql = "SELECT idRestaurante, Nome, TipoCulinaria, CEP, Cidade, Rua, Numero, Bairro FROM Restaurante WHERE Cidade=?";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Restaurante.class), cidade);
    }

    // Buscar por nome (LIKE)
    public List<Restaurante> buscarPorNome(String nome) {
        String sql = "SELECT idRestaurante, Nome, TipoCulinaria, CEP, Cidade, Rua, Numero, Bairro FROM Restaurante WHERE Nome LIKE ?";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Restaurante.class), "%" + nome + "%");
    }

    // Contar restaurantes por cidade (exemplo de agregação)
    public List<String> contarPorCidade() {
        String sql = "SELECT Cidade, COUNT(*) AS total FROM Restaurante GROUP BY Cidade";
        return jdbcTemplate.query(sql, (rs, rowNum) -> rs.getString("Cidade") + ": " + rs.getInt("total") + " restaurantes");
    }

    public Restaurante buscarPorId(long id) {
        String sql = "SELECT idRestaurante, Nome, TipoCulinaria, CEP, Cidade, Rua, Numero, Bairro FROM Restaurante WHERE idRestaurante=?";
        try {
            return jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(Restaurante.class), id);
        } catch (Exception e) {
            return null;
        }
    }

    // Restaurantes por tipo de culinária
    public List<Restaurante> buscarPorTipoCulinaria(String tipoCulinaria) {
        String sql = "SELECT idRestaurante, Nome, TipoCulinaria, CEP, Cidade, Rua, Numero, Bairro FROM Restaurante WHERE TipoCulinaria LIKE ? ORDER BY Nome";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Restaurante.class), "%" + tipoCulinaria + "%");
    }

    // Restaurantes com endereço completo
    public List<String> restaurantesComEnderecoCompleto() {
        String sql = "SELECT Nome, CONCAT(Rua, ', ', Numero, ' - ', Bairro, ', ', Cidade, ' - CEP: ', CEP) as endereco_completo FROM Restaurante ORDER BY Nome";
        return jdbcTemplate.query(sql, (rs, rowNum) ->
                "🏢 " + rs.getString("Nome") + " - 📍 " + rs.getString("endereco_completo")
        );
    }

    // Restaurantes ordenados por nome
    public List<Restaurante> restaurantesOrdenadosPorNome() {
        String sql = "SELECT idRestaurante, Nome, TipoCulinaria, CEP, Cidade, Rua, Numero, Bairro FROM Restaurante ORDER BY Nome ASC";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Restaurante.class));
    }

    // Exemplo de função para média de avaliação (presumindo que funcao exista no DB)
    public Double mediaAvaliacao(long idRestaurante) {
        String sql = "SELECT fn_media_avaliacao_restaurante(?)";
        return jdbcTemplate.queryForObject(sql, Double.class, idRestaurante);
    }
}
