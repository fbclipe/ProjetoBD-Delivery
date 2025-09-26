-- Criar banco de dados
CREATE DATABASE delivery;

USE delivery;

-- Tabela Restaurante
CREATE TABLE restaurante (
    id_restaurante INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo_culinaria VARCHAR(50),
    cep VARCHAR(20),
    cidade VARCHAR(50),
    rua VARCHAR(100),
    numero VARCHAR(10),
    bairro VARCHAR(50)
);

-- Tabela Produto
CREATE TABLE produto (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    id_restaurante INT NOT NULL,
    FOREIGN KEY (id_restaurante) REFERENCES restaurante(id_restaurante)
);
