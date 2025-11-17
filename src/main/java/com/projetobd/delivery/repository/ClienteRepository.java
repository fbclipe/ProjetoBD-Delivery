package com.projetobd.delivery.repository;

import com.projetobd.delivery.entity.Cliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class ClienteRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Inserir cliente
    public long inserir(Cliente c) {
        String sql = "INSERT INTO Cliente (Nome, Tel, CEP, Rua, Bairro, Cidade, Numero) "
                + "VALUES (?, ?, ?, ?, ?, ?, ?)";

        KeyHolder kh = new GeneratedKeyHolder();

        jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, c.getNome());
            ps.setString(2, c.getTelefone());
            ps.setString(3, c.getCep());
            ps.setString(4, c.getRua());
            ps.setString(5, c.getBairro());
            ps.setString(6, c.getCidade());
            ps.setString(7, c.getNumero());
            return ps;
        }, kh);

        return kh.getKey().longValue();
    }

    // Buscar por ID
    public Cliente buscarPorId(long id) {
        String sql = "SELECT idCliente, Nome, Tel AS telefone, CEP, Rua, Bairro, Cidade, Numero "
                + "FROM Cliente WHERE idCliente=?";

        try {
            return jdbcTemplate.queryForObject(sql,
                    (rs, row) -> new Cliente(
                            rs.getLong("idCliente"),
                            rs.getString("Nome"),
                            rs.getString("telefone"),
                            rs.getString("CEP"),
                            rs.getString("Rua"),
                            rs.getString("Bairro"),
                            rs.getString("Cidade"),
                            rs.getString("Numero")
                    ),
                    id
            );
        } catch (Exception e) {
            return null;
        }
    }

    // Atualizar
    public int atualizar(Cliente c) {
        String sql = "UPDATE Cliente SET Nome=?, Tel=?, CEP=?, Rua=?, Bairro=?, Cidade=?, Numero=? "
                + "WHERE idCliente=?";

        return jdbcTemplate.update(sql,
                c.getNome(),
                c.getTelefone(),
                c.getCep(),
                c.getRua(),
                c.getBairro(),
                c.getCidade(),
                c.getNumero(),
                c.getIdCliente()
        );
    }

    // Deletar
    public int deletar(long id) {
        return jdbcTemplate.update("DELETE FROM Cliente WHERE idCliente=?", id);
    }

    // Listar todos
    public List<Cliente> listar() {
        String sql = "SELECT idCliente, Nome, Tel AS telefone, CEP, Rua, Bairro, Cidade, Numero "
                + "FROM Cliente";

        return jdbcTemplate.query(sql,
                (rs, row) -> new Cliente(
                        rs.getLong("idCliente"),
                        rs.getString("Nome"),
                        rs.getString("telefone"),
                        rs.getString("CEP"),
                        rs.getString("Rua"),
                        rs.getString("Bairro"),
                        rs.getString("Cidade"),
                        rs.getString("Numero")
                )
        );
    }

    public String nivelCliente(long id) {
        String sql = "SELECT fn_nivel_cliente(?)";
        return jdbcTemplate.queryForObject(sql, String.class, id);
    }

}
