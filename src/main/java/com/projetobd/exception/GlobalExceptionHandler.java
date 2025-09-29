package com.projetobd.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.BadSqlGrammarException;
import java.sql.SQLException;

@ControllerAdvice
public class GlobalExceptionHandler {

    // Captura todas as exceções não tratadas
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        System.err.println("=== ERRO DETECTADO ===");
        System.err.println("Mensagem: " + e.getMessage());
        System.err.println("Tipo: " + e.getClass().getSimpleName());
        e.printStackTrace(); // Mostra o stack trace completo no console
        System.err.println("======================");
        
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Erro interno do servidor: " + e.getMessage());
    }

    // Captura erros de banco de dados
    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<String> handleDataAccessException(DataAccessException e) {
        System.err.println("=== ERRO DE BANCO DE DADOS ===");
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Erro no banco de dados: " + e.getMessage());
    }

    // Captura erros de SQL
    @ExceptionHandler(SQLException.class)
    public ResponseEntity<String> handleSQLException(SQLException e) {
        System.err.println("=== ERRO SQL ===");
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Erro SQL: " + e.getMessage());
    }

    // Captura erros de sintaxe SQL
    @ExceptionHandler(BadSqlGrammarException.class)
    public ResponseEntity<String> handleBadSqlGrammarException(BadSqlGrammarException e) {
        System.err.println("=== ERRO DE SINTAXE SQL ===");
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Erro de sintaxe SQL: " + e.getMessage());
    }
}