INSERT INTO Restaurante (Nome, TipoCulinaria, CEP, Cidade, Rua, Numero, Bairro)
VALUES 
('Restaurante Sabor & Arte', 'Brasileira', '12345-678', 'São Paulo', 'Rua das Flores', '100', 'Centro'),
('Pizzaria Bella Massa', 'Italiana', '98765-432', 'Rio de Janeiro', 'Av. Copacabana', '200', 'Zona Sul');

INSERT INTO Cliente (Nome, Rua, Numero, Bairro, CEP, Cidade, Tel)
VALUES 
('João Silva', 'Rua A', '10', 'Bairro X', '11111-111', 'São Paulo', '1199999-1111'),
('Maria Souza', 'Rua B', '20', 'Bairro Y', '22222-222', 'Rio de Janeiro', '2198888-2222');

INSERT INTO Avaliacao (idCliente, idRestaurante, Comentario, Nota, Data)
VALUES 
(1, 1, 'Comida deliciosa!', 5, '2025-09-20'),
(2, 2, 'Pizza muito boa, mas demorou.', 4, '2025-09-21');

INSERT INTO Produto (idRestaurante, Nome, Ingredientes, Preco)
VALUES 
(1, 'Feijoada', 'Feijão preto, carne seca, linguiça', 35.00),
(1, 'Coxinha', 'Frango, massa, farinha de rosca', 8.00),
(2, 'Pizza Margherita', 'Massa, queijo, tomate, manjericão', 40.00),
(2, 'Pizza Calabresa', 'Massa, queijo, calabresa, cebola', 45.00);

INSERT INTO Pedido (idCliente, Status, PrecoTotal, dataHora)
VALUES 
(1, 'Em preparo', 43.00, '2025-09-22 19:30:00'),
(2, 'Finalizado', 85.00, '2025-09-22 20:00:00');

INSERT INTO DetalhePedido (idPedido, idProduto, Quantidade, PrecoUnitario, Observacao)
VALUES 
(1, 1, 1, 35.00, "Sem cebola"),
(1, 2, 1, 8.00, "Sem picles"),
(2, 3, 1, 40.00, "Sem molho"),
(2, 4, 1, 45.00, "Sem verdura");


INSERT INTO Entregador (Nome, Tel)
VALUES 
('Carlos Motoboy', '1197777-3333'),
('Ana Motogirl', '2196666-4444');

INSERT INTO Entrega (idPedido, idEntregador, dataHoraSaida, dataHoraChegada, Status)
VALUES 
(1, 1, '2025-09-22 19:45:00', '2025-09-22 20:10:00', 'Entregue'),
(2, 2, '2025-09-22 20:05:00', '2025-09-22 20:25:00', 'Entregue');

INSERT INTO Pagamento (idPedido, Data, Valor)
VALUES 
(1, '2025-09-22', 43.00),
(2, '2025-09-22', 85.00);

INSERT INTO Cartao (idPagamento, Bandeira, Numero)
VALUES 
(1, 'Visa', '1234-5678-9012-3456');

INSERT INTO Pix (idPagamento, Chave, Banco)
VALUES 
(2, 'maria@pix.com', 'Banco do Brasil');

INSERT INTO Dinheiro (idPagamento, Troco)
VALUES 
(1, 7.00);

INSERT INTO Combo (idProduto, idProdutoCombo)
VALUES
(3, 2);

SELECT * FROM Restaurante;
SELECT * FROM Cliente;
SELECT * FROM Avaliacao;
SELECT * FROM Produto;
SELECT * FROM Pedido;
SELECT * FROM DetalhePedido;
SELECT * FROM Entregador;
SELECT * FROM Entrega;
SELECT * FROM Pagamento;
SELECT * FROM Cartao;
SELECT * FROM Pix;
SELECT * FROM Dinheiro;
SELECT * FROM Combo;