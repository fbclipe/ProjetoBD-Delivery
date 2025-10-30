CREATE DATABASE ProjetoBD;
use ProjetoBD;

CREATE TABLE Restaurante (
    idRestaurante INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    TipoCulinaria VARCHAR(100),
    CEP VARCHAR(15),
    Cidade VARCHAR(100),
    Rua VARCHAR(100),
    Numero VARCHAR(10),
    Bairro VARCHAR(100)
);

CREATE TABLE Cliente (
    idCliente INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Rua VARCHAR(100),
    Numero VARCHAR(10),
    Bairro VARCHAR(100),
    CEP VARCHAR(15),
    Cidade VARCHAR(100),
    Tel VARCHAR(20)
);

CREATE TABLE Avaliacao (
    idAvaliacao INT AUTO_INCREMENT PRIMARY KEY,
    idCliente INT NOT NULL,
    idRestaurante INT NOT NULL,
    Comentario TEXT,
    Nota INT,
    Data DATE,
    FOREIGN KEY (idCliente) REFERENCES Cliente(idCliente),
    FOREIGN KEY (idRestaurante) REFERENCES Restaurante(idRestaurante)
);

CREATE TABLE Produto (
    idProduto INT AUTO_INCREMENT PRIMARY KEY,
    idRestaurante INT NOT NULL,
    Nome VARCHAR(100) NOT NULL,
    Preco DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (idRestaurante) REFERENCES Restaurante(idRestaurante)
);

CREATE TABLE Pedido (
    idPedido INT AUTO_INCREMENT PRIMARY KEY,
    idCliente INT NOT NULL,
    Status VARCHAR(50),
    PrecoTotal DECIMAL(10,2),
    dataHora DATETIME,
    FOREIGN KEY (idCliente) REFERENCES Cliente(idCliente)
);

CREATE TABLE DetalhePedido (
    idPedido INT NOT NULL,
    idProduto INT NOT NULL,
    Quantidade INT NOT NULL,
    Observacao VARCHAR(200),
    PrecoUnitario DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (idPedido, idProduto),
    FOREIGN KEY (idPedido) REFERENCES Pedido(idPedido),
    FOREIGN KEY (idProduto) REFERENCES Produto(idProduto)
);


CREATE TABLE Entregador (
    idEntregador INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Tel VARCHAR(20)
);

CREATE TABLE Entrega (
    idEntrega INT AUTO_INCREMENT PRIMARY KEY,
    idPedido INT NOT NULL,
    idEntregador INT NOT NULL,
    dataHoraSaida DATETIME,
    dataHoraChegada DATETIME,
    Status VARCHAR(50),
    FOREIGN KEY (idPedido) REFERENCES Pedido(idPedido),
    FOREIGN KEY (idEntregador) REFERENCES Entregador(idEntregador)
);

CREATE TABLE Pagamento (
    idPagamento INT AUTO_INCREMENT PRIMARY KEY,
    idPedido INT NOT NULL,
    Data DATE,
    Valor DECIMAL(10,2),
    FOREIGN KEY (idPedido) REFERENCES Pedido(idPedido)
);

CREATE TABLE Cartao (
    idPagamento INT PRIMARY KEY,
    Bandeira VARCHAR(50),
    Numero VARCHAR(20),
    FOREIGN KEY (idPagamento) REFERENCES Pagamento(idPagamento)
);

CREATE TABLE Pix (
    idPagamento INT PRIMARY KEY,
    Chave VARCHAR(100),
    Banco VARCHAR(100),
    FOREIGN KEY (idPagamento) REFERENCES Pagamento(idPagamento)
);

CREATE TABLE Dinheiro (
    idPagamento INT PRIMARY KEY,
    Troco DECIMAL(10,2),
    FOREIGN KEY (idPagamento) REFERENCES Pagamento(idPagamento)
);

CREATE TABLE Combo (
    idProduto INT NOT NULL,
    idProdutoCombo INT NOT NULL,
    PRIMARY KEY (idProduto, idProdutoCombo),
    FOREIGN KEY (idProduto) REFERENCES Produto(idProduto),
    FOREIGN KEY (idProdutoCombo) REFERENCES Produto(idProduto)
);