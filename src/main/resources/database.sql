-- Criar banco e usar
CREATE DATABASE IF NOT EXISTS ProjetoBD;
USE ProjetoBD;

-- Tabela Restaurante
CREATE TABLE IF NOT EXISTS Restaurante (
                                           idRestaurante INT AUTO_INCREMENT PRIMARY KEY,
                                           Nome VARCHAR(100) NOT NULL,
    TipoCulinaria VARCHAR(100),
    CEP VARCHAR(15),
    Cidade VARCHAR(100),
    Rua VARCHAR(100),
    Numero VARCHAR(10),
    Bairro VARCHAR(100)
    );

-- Tabela Cliente
CREATE TABLE IF NOT EXISTS Cliente (
                                       idCliente INT AUTO_INCREMENT PRIMARY KEY,
                                       Nome VARCHAR(100) NOT NULL,
    Rua VARCHAR(100),
    Numero VARCHAR(10),
    Bairro VARCHAR(100),
    CEP VARCHAR(15),
    Cidade VARCHAR(100),
    Tel VARCHAR(20)
    );

-- Log de Pagamento
CREATE TABLE IF NOT EXISTS LogPagamento (
                                            idLog INT AUTO_INCREMENT PRIMARY KEY,
                                            idPagamento INT,
                                            idPedido INT,
                                            Valor DECIMAL(10,2),
    DataLog DATETIME,
    Acao VARCHAR(20)
    );

-- Avaliacao (FKs com ON DELETE CASCADE, ON UPDATE NO ACTION)
CREATE TABLE IF NOT EXISTS Avaliacao (
                                         idAvaliacao INT AUTO_INCREMENT PRIMARY KEY,
                                         idCliente INT NOT NULL,
                                         idRestaurante INT NOT NULL,
                                         Comentario TEXT,
                                         Nota INT,
                                         Data DATE,
                                         CONSTRAINT fk_avaliacao_cliente FOREIGN KEY (idCliente)
    REFERENCES Cliente(idCliente)
    ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT fk_avaliacao_restaurante FOREIGN KEY (idRestaurante)
    REFERENCES Restaurante(idRestaurante)
    ON DELETE CASCADE ON UPDATE NO ACTION
    );

-- Produto
CREATE TABLE IF NOT EXISTS Produto (
                                       idProduto INT AUTO_INCREMENT PRIMARY KEY,
                                       idRestaurante INT NOT NULL,
                                       Nome VARCHAR(100) NOT NULL,
    Ingredientes VARCHAR(100),
    Preco DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_produto_restaurante FOREIGN KEY (idRestaurante)
    REFERENCES Restaurante(idRestaurante)
    ON DELETE CASCADE ON UPDATE NO ACTION
    );

-- Pedido
CREATE TABLE IF NOT EXISTS Pedido (
                                      idPedido INT AUTO_INCREMENT PRIMARY KEY,
                                      idCliente INT NOT NULL,
                                      Status VARCHAR(50),
    PrecoTotal DECIMAL(10,2),
    dataHora DATETIME,
    CONSTRAINT fk_pedido_cliente FOREIGN KEY (idCliente)
    REFERENCES Cliente(idCliente)
    ON DELETE CASCADE ON UPDATE NO ACTION
    );

-- DetalhePedido (chave composta)
CREATE TABLE IF NOT EXISTS DetalhePedido (
                                             idPedido INT NOT NULL,
                                             idProduto INT NOT NULL,
                                             Quantidade INT NOT NULL,
                                             Observacao VARCHAR(200),
    PrecoUnitario DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (idPedido, idProduto),
    CONSTRAINT fk_detalhepedido_pedido FOREIGN KEY (idPedido)
    REFERENCES Pedido(idPedido)
    ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT fk_detalhepedido_produto FOREIGN KEY (idProduto)
    REFERENCES Produto(idProduto)
    ON DELETE CASCADE ON UPDATE NO ACTION
    );

-- Entregador
CREATE TABLE IF NOT EXISTS Entregador (
                                          idEntregador INT AUTO_INCREMENT PRIMARY KEY,
                                          Nome VARCHAR(100) NOT NULL,
    Tel VARCHAR(20)
    );

-- Entrega
CREATE TABLE IF NOT EXISTS Entrega (
                                       idEntrega INT AUTO_INCREMENT PRIMARY KEY,
                                       idPedido INT NOT NULL,
                                       idEntregador INT NOT NULL,
                                       dataHoraSaida DATETIME,
                                       dataHoraChegada DATETIME,
                                       Status VARCHAR(50),
    CONSTRAINT fk_entrega_pedido FOREIGN KEY (idPedido)
    REFERENCES Pedido(idPedido)
    ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT fk_entrega_entregador FOREIGN KEY (idEntregador)
    REFERENCES Entregador(idEntregador)
    ON DELETE CASCADE ON UPDATE NO ACTION
    );

-- Pagamento
CREATE TABLE IF NOT EXISTS Pagamento (
                                         idPagamento INT AUTO_INCREMENT PRIMARY KEY,
                                         idPedido INT NOT NULL,
                                         Data DATE,
                                         Valor DECIMAL(10,2),
    CONSTRAINT fk_pagamento_pedido FOREIGN KEY (idPedido)
    REFERENCES Pedido(idPedido)
    ON DELETE CASCADE ON UPDATE NO ACTION
    );

-- Cartao
CREATE TABLE IF NOT EXISTS Cartao (
                                      idPagamento INT PRIMARY KEY,
                                      Bandeira VARCHAR(50),
    Numero VARCHAR(20),
    CONSTRAINT fk_cartao_pagamento FOREIGN KEY (idPagamento)
    REFERENCES Pagamento(idPagamento)
    ON DELETE CASCADE ON UPDATE NO ACTION
    );

-- Pix
CREATE TABLE IF NOT EXISTS Pix (
                                   idPagamento INT PRIMARY KEY,
                                   Chave VARCHAR(100),
    Banco VARCHAR(100),
    CONSTRAINT fk_pix_pagamento FOREIGN KEY (idPagamento)
    REFERENCES Pagamento(idPagamento)
    ON DELETE CASCADE ON UPDATE NO ACTION
    );

-- Dinheiro
CREATE TABLE IF NOT EXISTS Dinheiro (
                                        idPagamento INT PRIMARY KEY,
                                        Troco DECIMAL(10,2),
    CONSTRAINT fk_dinheiro_pagamento FOREIGN KEY (idPagamento)
    REFERENCES Pagamento(idPagamento)
    ON DELETE CASCADE ON UPDATE NO ACTION
    );

-- Combo (auto-relacionamento do produto)
CREATE TABLE IF NOT EXISTS Combo (
                                     idProduto INT NOT NULL,
                                     idProdutoCombo INT NOT NULL,
                                     PRIMARY KEY (idProduto, idProdutoCombo),
    CONSTRAINT fk_combo_produto FOREIGN KEY (idProduto)
    REFERENCES Produto(idProduto)
    ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT fk_combo_produtocombo FOREIGN KEY (idProdutoCombo)
    REFERENCES Produto(idProduto)
    ON DELETE CASCADE ON UPDATE NO ACTION
    );


-- ============================
-- INSERTS: 30 registros por tabela
-- ============================

-- ----------------------------
-- Restaurantes (30)
-- ----------------------------
INSERT INTO Restaurante (idRestaurante, Nome, TipoCulinaria, CEP, Cidade, Rua, Numero, Bairro) VALUES
                                                                                                   (1,'Restaurante Sabor do Recife','Nordestina','50010-010','Recife','Rua do Sol','101','Boa Viagem'),
                                                                                                   (2,'Casa do Peixe','Frutos do Mar','50010-020','Recife','Av. Boa Viagem','220','Boa Viagem'),
                                                                                                   (3,'Cantina da Nonna','Italiana','50030-010','Recife','Rua das Flores','45','Boa Vista'),
                                                                                                   (4,'Pastelaria do Mercado','Lanches','50020-010','Recife','Praça do Mercado','12','São José'),
                                                                                                   (5,'Acarajé da Dinha','Baiana','53108-560','Olinda','Rua do Farol','8','Olinda'),
                                                                                                   (6,'Churrascaria Fogo de Chão PE','Churrasco','50720-010','Recife','Av. Agamenon Magalhães','1000','Derby'),
                                                                                                   (7,'Sushi Recife','Japonesa','52040-010','Recife','Rua do Futuro','200','Espinheiro'),
                                                                                                   (8,'Veg & Cia','Vegetariana','52060-020','Recife','Rua Verde','34','Casa Forte'),
                                                                                                   (9,'Cafeteria Central','Cafeteria','50040-050','Recife','Rua do Café','15','Graças'),
                                                                                                   (10,'Pizzaria Bella Massa','Italiana','51010-010','Recife','Av. Boa Viagem','310','Boa Viagem'),
                                                                                                   (11,'Hamburgueria do Bairro','Lanches','50050-050','Recife','Rua da Praia','77','Pina'),
                                                                                                   (12,'Bistrô da Rua Nova','Contemporânea','50060-060','Recife','Rua Nova','9','Torre'),
                                                                                                   (13,'Comida Caseira da Vó','Caseira','50070-070','Recife','Rua do Sossego','13','Casa Amarela'),
                                                                                                   (14,'Feijoada & Cia','Brasileira','50080-080','Recife','Rua Principal','99','Santo Amaro'),
                                                                                                   (15,'Tapioca da Mari','Regional','52010-010','Recife','Rua dos Navegantes','5','Boa Viagem'),
                                                                                                   (16,'Empório Nordestino','Nordestina','52020-020','Recife','Av. Norte','56','Aflitos'),
                                                                                                   (17,'Padaria Pão Quente','Padaria','52100-100','Recife','Rua do Padeiro','1','Imbiribeira'),
                                                                                                   (18,'Bar do Porto','Boteco','53010-110','Recife','Rua do Porto','24','Recife Antigo'),
                                                                                                   (19,'Cozinha Fusion','Fusion','52030-030','Recife','Alameda Gourmet','7','Torre'),
                                                                                                   (20,'Restaurante Sertão','Nordestina','53020-020','Olinda','Estrada do Farol','120','Olinda'),
                                                                                                   (21,'Peixaria do Bairro','Frutos do Mar','52050-050','Recife','Rua do Mar','88','Pina'),
                                                                                                   (22,'Noodle House','Asiática','52070-070','Recife','Rua Oriental','45','Graças'),
                                                                                                   (23,'Brigadeiro & Cia','Doces','50090-090','Recife','Rua Doce','3','Boa Vista'),
                                                                                                   (24,'Cantinho Vegano','Vegetariana','52110-110','Recife','Rua Verdejante','60','Casa Forte'),
                                                                                                   (25,'La Parrilla','Argentina','52120-120','Recife','Av. Grill','150','Derby'),
                                                                                                   (26,'Baião da Gente','Nordestina','52130-130','Recife','Rua do Baião','22','Várzea'),
                                                                                                   (27,'Sorveteria Tropical','Sorveteria','52140-140','Recife','Av. Gelato','18','Pina'),
                                                                                                   (28,'Comedoria Popular','Popular','52150-150','Recife','Praça Popular','2','Coelhos'),
                                                                                                   (29,'Bacalhau & Cia','Portuguesa','52160-160','Recife','Rua de Lisboa','11','Boa Vista'),
                                                                                                   (30,'Delícias da Terra','Regional','52170-170','Recife','Rua da Terra','44','Casa Amarela');

-- ----------------------------
-- Clientes (30)
-- ----------------------------
INSERT INTO Cliente (idCliente, Nome, Rua, Numero, Bairro, CEP, Cidade, Tel) VALUES
                                                                                 (1,'Mariana Oliveira','Rua do Limoeiro','12','Boa Viagem','51020-020','Recife','8199999-0001'),
                                                                                 (2,'Carlos Eduardo','Avenida Visconde de Suassuna','88','Casa Forte','52050-050','Recife','8199999-0002'),
                                                                                 (3,'Ana Beatriz','Rua da Aurora','240','Graças','50050-050','Recife','8199999-0003'),
                                                                                 (4,'Pedro Santos','Rua do Futuro','55','Espinheiro','52040-040','Recife','8199999-0004'),
                                                                                 (5,'Joana Almeida','Travessa do Comércio','9','Recife Antigo','50010-010','Recife','8199999-0005'),
                                                                                 (6,'Marcelo Lima','Rua Nova','101','Torre','50060-060','Recife','8199999-0006'),
                                                                                 (7,'Luiza Ferreira','Rua dos Navegantes','33','Boa Viagem','51010-010','Recife','8199999-0007'),
                                                                                 (8,'Rafael Costa','Avenida Norte','202','Aflitos','52020-020','Recife','8199999-0008'),
                                                                                 (9,'Patrícia Gomes','Rua Dom Bosco','18','Pina','51100-110','Recife','8199999-0009'),
                                                                                 (10,'Bruno Alves','Rua da Paz','77','Santo Amaro','50080-080','Recife','8199999-0010'),
                                                                                 (11,'Fabiana Rocha','Rua do Sol','5','Olinda','53100-000','Olinda','8199999-0011'),
                                                                                 (12,'Gustavo Pereira','Rua do Mercado','140','São José','50020-020','Recife','8199999-0012'),
                                                                                 (13,'Helena Matos','Rua das Árvores','250','Boa Vista','50030-030','Recife','8199999-0013'),
                                                                                 (14,'Tiago Ribeiro','Rua do Comércio','160','Derby','50720-020','Recife','8199999-0014'),
                                                                                 (15,'Sofia Castro','Rua do Poço','6','Casa Amarela','52060-060','Recife','8199999-0015'),
                                                                                 (16,'Lucas Rocha','Rua do Mar','44','Pina','52050-050','Recife','8199999-0016'),
                                                                                 (17,'Marcos Vinícius','Rua do Moinho','12','Várzea','52130-130','Recife','8199999-0017'),
                                                                                 (18,'Carolina Nunes','Travessa da Alegria','20','Coelhos','52150-150','Recife','8199999-0018'),
                                                                                 (19,'Daniela Souza','Rua das Flores','90','Boa Vista','50030-030','Recife','8199999-0019'),
                                                                                 (20,'Fernando Melo','Rua do Barão','3','Imbiribeira','52100-100','Recife','8199999-0020'),
                                                                                 (21,'Renata Alves','Rua do Paraíso','14','Casa Forte','52050-050','Recife','8199999-0021'),
                                                                                 (22,'Victor Hugo','Rua do Porto','67','Recife Antigo','53010-110','Recife','8199999-0022'),
                                                                                 (23,'Aline Ferreira','Rua do Brigadeiro','8','Boa Vista','50030-030','Recife','8199999-0023'),
                                                                                 (24,'Pedro Henrique','Avenida Brasil','190','Torre','50060-060','Recife','8199999-0024'),
                                                                                 (25,'Isabela Martins','Rua do Açúcar','22','Olinda','53108-560','Olinda','8199999-0025'),
                                                                                 (26,'Rodrigo Santos','Rua Nova','201','Derby','50720-020','Recife','8199999-0026'),
                                                                                 (27,'Vanessa Lima','Rua do Litoral','77','Boa Viagem','51010-010','Recife','8199999-0027'),
                                                                                 (28,'Eduardo Vieira','Rua das Palmeiras','55','Graças','50050-050','Recife','8199999-0028'),
                                                                                 (29,'Camila Pereira','Rua do Comércio','3','Pina','51100-110','Recife','8199999-0029'),
                                                                                 (30,'André Luiz','Rua do Sol Nascente','10','Casa Amarela','52060-060','Recife','8199999-0030');

-- ----------------------------
-- Produtos (30) - cada produto vinculado a algum restaurante
-- ----------------------------
INSERT INTO Produto (idProduto, idRestaurante, Nome, Ingredientes, Preco) VALUES
                                                                              (1,1,'Baião de Dois','feijão de corda, arroz, carne seca, queijo coalho',32.00),
                                                                              (2,2,'Moqueca de Peixe','peixe, leite de coco, dendê, coentro',48.00),
                                                                              (3,3,'Lasanha à Bolonhesa','massa, molho bolonhesa, queijo',38.00),
                                                                              (4,4,'Pastel de Carne','massa frita, carne moída',8.50),
                                                                              (5,5,'Acarajé com Vatapá','massa de feijão, vatapá, camarão, pimenta',12.00),
                                                                              (6,6,'Picanha na Brasa','picanha, sal grosso',75.00),
                                                                              (7,7,'Temaki Salmão','salmão, arroz, nori, molho shoyu',22.00),
                                                                              (8,8,'Hambúrguer Vegano','hambúrguer vegetal, pão, salada',24.00),
                                                                              (9,9,'Café coado + Pão de Queijo','café, pão de queijo',14.00),
                                                                              (10,10,'Pizza Margherita','massa, tomate, mussarela, manjericão',45.00),
                                                                              (11,11,'Cheeseburger Clássico','hambúrguer bovino, queijo, pão',28.00),
                                                                              (12,12,'Risoto de Camarão','arroz arbóreo, camarão, vinho',42.00),
                                                                              (13,13,'Arroz com Pequi','arroz, pequi, frango',30.00),
                                                                              (14,14,'Feijoada Completa','feijão preto, carnes variadas',39.00),
                                                                              (15,15,'Tapioca de Coco','massa de tapioca, coco, queijo',10.00),
                                                                              (16,16,'Carne de Sol com Macaxeira','carne de sol, macaxeira',40.00),
                                                                              (17,17,'Pão Francês Recheado','pão, presunto, queijo',7.00),
                                                                              (18,18,'Bolinho de Aipim','aipim, carne seca',6.50),
                                                                              (19,19,'Prato Fusion (Especial)','proteína, legumes, redução',55.00),
                                                                              (20,20,'Baião Completo','feijão, arroz, carne, farofa',35.00),
                                                                              (21,21,'Peixe Frito','peixe frito, limão',33.00),
                                                                              (22,22,'Yakissoba Frango','macarrão, frango, legumes, molho',26.00),
                                                                              (23,23,'Brigadeiro Gourmet','leite condensado, chocolate',5.00),
                                                                              (24,24,'Hambúrguer Vegano Grelhado','hambúrguer vegetal, molho especial',27.00),
                                                                              (25,25,'Churrasco Argentino (Porção)','bife, chimichurri',60.00),
                                                                              (26,26,'Galo com Quiabo','galinha, quiabo, arroz',34.00),
                                                                              (27,27,'Sorvete Casquinha','sorvete de creme',6.00),
                                                                              (28,28,'Prato Popular (PF)','arroz, feijão, bife, salada',18.00),
                                                                              (29,29,'Bacalhau à Gomes de Sá','bacalhau, batata, cebola',62.00),
                                                                              (30,30,'Cuscuz Nordestino','milho, manteiga, queijo',12.00);

-- ----------------------------
-- Pedidos (30) - cada pedido vinculado a um cliente
-- ----------------------------
INSERT INTO Pedido (idPedido, idCliente, Status, PrecoTotal, dataHora) VALUES
                                                                           (1,1,'Em preparo',32.00,'2025-09-22 12:10:00'),
                                                                           (2,2,'Finalizado',48.00,'2025-09-22 12:30:00'),
                                                                           (3,3,'Finalizado',38.00,'2025-09-22 13:00:00'),
                                                                           (4,4,'Entregue',8.50,'2025-09-22 13:20:00'),
                                                                           (5,5,'Finalizado',12.00,'2025-09-22 13:40:00'),
                                                                           (6,6,'Em preparo',75.00,'2025-09-22 14:00:00'),
                                                                           (7,7,'Finalizado',22.00,'2025-09-22 14:20:00'),
                                                                           (8,8,'Entregue',24.00,'2025-09-22 14:40:00'),
                                                                           (9,9,'Finalizado',14.00,'2025-09-22 15:00:00'),
                                                                           (10,10,'Entregue',45.00,'2025-09-22 15:20:00'),
                                                                           (11,11,'Finalizado',28.00,'2025-09-22 15:40:00'),
                                                                           (12,12,'Entregue',42.00,'2025-09-22 16:00:00'),
                                                                           (13,13,'Em preparo',30.00,'2025-09-22 16:20:00'),
                                                                           (14,14,'Finalizado',39.00,'2025-09-22 16:40:00'),
                                                                           (15,15,'Entregue',10.00,'2025-09-22 17:00:00'),
                                                                           (16,16,'Finalizado',40.00,'2025-09-22 17:20:00'),
                                                                           (17,17,'Entregue',7.00,'2025-09-22 17:40:00'),
                                                                           (18,18,'Entregue',6.50,'2025-09-22 18:00:00'),
                                                                           (19,19,'Finalizado',55.00,'2025-09-22 18:20:00'),
                                                                           (20,20,'Em preparo',35.00,'2025-09-22 18:40:00'),
                                                                           (21,21,'Finalizado',33.00,'2025-09-22 19:00:00'),
                                                                           (22,22,'Entregue',26.00,'2025-09-22 19:20:00'),
                                                                           (23,23,'Finalizado',5.00,'2025-09-22 19:40:00'),
                                                                           (24,24,'Entregue',27.00,'2025-09-22 20:00:00'),
                                                                           (25,25,'Finalizado',60.00,'2025-09-22 20:20:00'),
                                                                           (26,26,'Entregue',34.00,'2025-09-22 20:40:00'),
                                                                           (27,27,'Finalizado',6.00,'2025-09-22 21:00:00'),
                                                                           (28,28,'Entregue',18.00,'2025-09-22 21:20:00'),
                                                                           (29,29,'Finalizado',62.00,'2025-09-22 21:40:00'),
                                                                           (30,30,'Em preparo',12.00,'2025-09-22 22:00:00');

-- ----------------------------
-- DetalhePedido (30) - um item por pedido (coerente com PrecoTotal)
-- ----------------------------
INSERT INTO DetalhePedido (idPedido, idProduto, Quantidade, PrecoUnitario, Observacao) VALUES
                                                                                           (1,1,1,32.00,'Sem cebola'),
                                                                                           (2,2,1,48.00,'Bem passado'),
                                                                                           (3,3,1,38.00,'Sem queijo por favor'),
                                                                                           (4,4,1,8.50,'Com catupiry'),
                                                                                           (5,5,1,12.00,'Molho a parte'),
                                                                                           (6,6,1,75.00,'Picanha ao ponto'),
                                                                                           (7,7,1,22.00,'Sem wasabi'),
                                                                                           (8,8,1,24.00,'Sem maionese'),
                                                                                           (9,9,1,14.00,'Sem açúcar'),
                                                                                           (10,10,1,45.00,'Borda recheada'),
                                                                                           (11,11,1,28.00,'Sem cebola roxa'),
                                                                                           (12,12,1,42.00,'Com ervas'),
                                                                                           (13,13,1,30.00,'Sem pimenta'),
                                                                                           (14,14,1,39.00,'Porção tradicional'),
                                                                                           (15,15,1,10.00,'Extra queijo'),
                                                                                           (16,16,1,40.00,'Sem gordura'),
                                                                                           (17,17,1,7.00,'Torrar levemente'),
                                                                                           (18,18,1,6.50,'Sem sal'),
                                                                                           (19,19,1,55.00,'Sem glúten'),
                                                                                           (20,20,1,35.00,'Com farofa'),
                                                                                           (21,21,1,33.00,'Com limão'),
                                                                                           (22,22,1,26.00,'Sem brócolis'),
                                                                                           (23,23,1,5.00,'Chocolate meio amargo'),
                                                                                           (24,24,1,27.00,'Molho especial'),
                                                                                           (25,25,1,60.00,'Mal passado'),
                                                                                           (26,26,1,34.00,'Sem óleo'),
                                                                                           (27,27,1,6.00,'Casquinha pequena'),
                                                                                           (28,28,1,18.00,'Acompanhado de salada'),
                                                                                           (29,29,1,62.00,'Com batata extra'),
                                                                                           (30,30,1,12.00,'Com manteiga');

-- ----------------------------
-- Entregadores (30)
-- ----------------------------
INSERT INTO Entregador (idEntregador, Nome, Tel) VALUES
                                                     (1,'Carlos Motoboy','8197777-0001'),
                                                     (2,'Ana Motogirl','8197777-0002'),
                                                     (3,'João Entrega','8197777-0003'),
                                                     (4,'Paulo Rápido','8197777-0004'),
                                                     (5,'Marcos das Rodas','8197777-0005'),
                                                     (6,'Fernanda Veloz','8197777-0006'),
                                                     (7,'Ricardo Ágil','8197777-0007'),
                                                     (8,'Larissa Entrega','8197777-0008'),
                                                     (9,'Jorge Motoboy','8197777-0009'),
                                                     (10,'Adriana Rota','8197777-0010'),
                                                     (11,'Mateus Correio','8197777-0011'),
                                                     (12,'Bruna Águia','8197777-0012'),
                                                     (13,'Ronaldo Turbo','8197777-0013'),
                                                     (14,'Sérgio Express','8197777-0014'),
                                                     (15,'Tânia Rápida','8197777-0015'),
                                                     (16,'Vitor Ponte','8197777-0016'),
                                                     (17,'Paula Ágil','8197777-0017'),
                                                     (18,'Igor Volta','8197777-0018'),
                                                     (19,'Débora Entrega','8197777-0019'),
                                                     (20,'Felipe Rápido','8197777-0020'),
                                                     (21,'Giselle Veloz','8197777-0021'),
                                                     (22,'Henrique Rota','8197777-0022'),
                                                     (23,'Juliana Motoboy','8197777-0023'),
                                                     (24,'Kleber Express','8197777-0024'),
                                                     (25,'Letícia Ágil','8197777-0025'),
                                                     (26,'Murilo Correio','8197777-0026'),
                                                     (27,'Natália Entrega','8197777-0027'),
                                                     (28,'Otávio Rápido','8197777-0028'),
                                                     (29,'Priscila Veloz','8197777-0029'),
                                                     (30,'Quincas Entregador','8197777-0030');

-- ----------------------------
-- Entrega (25) - Apenas pedidos não 'Em preparo'
-- ----------------------------
INSERT INTO Entrega (idEntrega, idPedido, idEntregador, dataHoraSaida, dataHoraChegada, Status) VALUES
                                                                                                    (1,2,2,'2025-09-22 12:40:00','2025-09-22 13:00:00','Concluída'),
                                                                                                    (2,3,3,'2025-09-22 13:10:00','2025-09-22 13:30:00','Concluída'),
                                                                                                    (3,4,4,'2025-09-22 13:30:00','2025-09-22 13:50:00','Concluída'),
                                                                                                    (4,5,5,'2025-09-22 13:50:00','2025-09-22 14:10:00','Concluída'),
                                                                                                    (5,7,7,'2025-09-22 14:30:00','2025-09-22 14:50:00','Concluída'),
                                                                                                    (6,8,8,'2025-09-22 14:50:00','2025-09-22 15:10:00','Concluída'),
                                                                                                    (7,9,9,'2025-09-22 15:10:00','2025-09-22 15:30:00','Concluída'),
                                                                                                    (8,10,10,'2025-09-22 15:30:00','2025-09-22 15:50:00','Concluída'),
                                                                                                    (9,11,11,'2025-09-22 15:50:00','2025-09-22 16:10:00','Concluída'),
                                                                                                    (10,12,12,'2025-09-22 16:10:00','2025-09-22 16:30:00','Concluída'),
                                                                                                    (11,14,14,'2025-09-22 16:50:00','2025-09-22 17:10:00','Concluída'),
                                                                                                    (12,15,15,'2025-09-22 17:10:00','2025-09-22 17:30:00','Concluída'),
                                                                                                    (13,16,16,'2025-09-22 17:30:00','2025-09-22 17:50:00','Concluída'),
                                                                                                    (14,17,17,'2025-09-22 17:50:00','2025-09-22 18:10:00','Concluída'),
                                                                                                    (15,18,18,'2025-09-22 18:10:00','2025-09-22 18:30:00','Concluída'),
                                                                                                    (16,19,19,'2025-09-22 18:30:00','2025-09-22 18:50:00','Concluída'),
                                                                                                    (17,21,21,'2025-09-22 19:10:00','2025-09-22 19:30:00','Concluída'),
                                                                                                    (18,22,22,'2025-09-22 19:30:00','2025-09-22 19:50:00','Concluída'),
                                                                                                    (19,23,23,'2025-09-22 19:50:00','2025-09-22 20:10:00','Concluída'),
                                                                                                    (20,24,24,'2025-09-22 20:10:00','2025-09-22 20:30:00','Concluída'),
                                                                                                    (21,25,25,'2025-09-22 20:30:00','2025-09-22 20:50:00','Concluída'),
                                                                                                    (22,26,26,'2025-09-22 20:50:00','2025-09-22 21:10:00','Concluída'),
                                                                                                    (23,27,27,'2025-09-22 21:10:00','2025-09-22 21:30:00','Concluída'),
                                                                                                    (24,28,28,'2025-09-22 21:30:00','2025-09-22 21:50:00','Concluída'),
                                                                                                    (25,29,29,'2025-09-22 21:50:00','2025-09-22 22:10:00','Concluída');

-- ----------------------------
-- Pagamento (30)
-- ----------------------------
INSERT INTO Pagamento (idPagamento, idPedido, Data, Valor) VALUES
                                                               (1,1,'2025-09-22',32.00),
                                                               (2,2,'2025-09-22',48.00),
                                                               (3,3,'2025-09-22',38.00),
                                                               (4,4,'2025-09-22',8.50),
                                                               (5,5,'2025-09-22',12.00),
                                                               (6,6,'2025-09-22',75.00),
                                                               (7,7,'2025-09-22',22.00),
                                                               (8,8,'2025-09-22',24.00),
                                                               (9,9,'2025-09-22',14.00),
                                                               (10,10,'2025-09-22',45.00),
                                                               (11,11,'2025-09-22',28.00),
                                                               (12,12,'2025-09-22',42.00),
                                                               (13,13,'2025-09-22',30.00),
                                                               (14,14,'2025-09-22',39.00),
                                                               (15,15,'2025-09-22',10.00),
                                                               (16,16,'2025-09-22',40.00),
                                                               (17,17,'2025-09-22',7.00),
                                                               (18,18,'2025-09-22',6.50),
                                                               (19,19,'2025-09-22',55.00),
                                                               (20,20,'2025-09-22',35.00),
                                                               (21,21,'2025-09-22',33.00),
                                                               (22,22,'2025-09-22',26.00),
                                                               (23,23,'2025-09-22',5.00),
                                                               (24,24,'2025-09-22',27.00),
                                                               (25,25,'2025-09-22',60.00),
                                                               (26,26,'2025-09-22',34.00),
                                                               (27,27,'2025-09-22',6.00),
                                                               (28,28,'2025-09-22',18.00),
                                                               (29,29,'2025-09-22',62.00),
                                                               (30,30,'2025-09-22',12.00);

-- ----------------------------
-- Cartao (10)
-- ----------------------------
INSERT INTO Cartao (idPagamento, Bandeira, Numero) VALUES
                                                       (1,'Mastercard','4000123456780001'),
                                                       (4,'Visa','4111222233334444'),
                                                       (7,'Elo','6363000011112222'),
                                                       (10,'Mastercard','4000123456780002'),
                                                       (13,'Visa','4111222233334445'),
                                                       (16,'Elo','6363000011112223'),
                                                       (19,'Mastercard','4000123456780003'),
                                                       (22,'Visa','4111222233334446'),
                                                       (25,'Elo','6363000011112224'),
                                                       (28,'Mastercard','4000123456780004');

-- ----------------------------
-- Pix (10)
-- ----------------------------
INSERT INTO Pix (idPagamento, Chave, Banco) VALUES
                                                (2,'81999990002@email.com','Banco do Brasil'),
                                                (5,'11122233344','Caixa Econômica'),
                                                (8,'81999990008','Itaú'),
                                                (11,'44455566677','Santander'),
                                                (14,'81999990014@email.com','Nubank'),
                                                (17,'77788899900','Banco do Brasil'),
                                                (20,'81999990020','Caixa Econômica'),
                                                (23,'10120230340','Itaú'),
                                                (26,'81999990026@email.com','Santander'),
                                                (29,'40450560670','Nubank');

-- ----------------------------
-- Dinheiro (10)
-- ----------------------------
INSERT INTO Dinheiro (idPagamento, Troco) VALUES
                                              (3,0.00),
                                              (6,5.00),
                                              (9,1.00),
                                              (12,0.00),
                                              (15,2.00),
                                              (18,3.50),
                                              (21,0.00),
                                              (24,3.00),
                                              (27,4.00),
                                              (30,8.00);

-- ----------------------------
-- Combo (6)
-- ----------------------------
INSERT INTO Combo (idProduto, idProdutoCombo) VALUES (1, 4);
INSERT INTO Combo (idProduto, idProdutoCombo) VALUES (6, 18);
INSERT INTO Combo (idProduto, idProdutoCombo) VALUES (11, 27);
INSERT INTO Combo (idProduto, idProdutoCombo) VALUES (10, 23);
INSERT INTO Combo (idProduto, idProdutoCombo) VALUES (14, 30);
INSERT INTO Combo (idProduto, idProdutoCombo) VALUES (28, 4);
INSERT INTO LogPagamento (idPagamento, idPedido, Valor, DataLog, Acao) VALUES
                                                                           (1, 10, 150.00, '2025-11-16 20:00:00', 'CRIACAO'),
                                                                           (2, 11, 200.50, '2025-11-16 20:05:00', 'ATUALIZACAO'),
                                                                           (3, 12, 75.25,  '2025-11-16 20:10:00', 'CANCELAMENTO');

-- ----------------------------
-- Verificações (consultas rápidas)
-- ----------------------------
SELECT COUNT(*) AS QtdeRestaurantes FROM Restaurante;
SELECT COUNT(*) AS QtdeClientes FROM Cliente;
SELECT COUNT(*) AS QtdeProdutos FROM Produto;
SELECT COUNT(*) AS QtdePedidos FROM Pedido;
SELECT COUNT(*) AS QtdeDetalhePedido FROM DetalhePedido;
SELECT COUNT(*) AS QtdeEntregadores FROM Entregador;
SELECT COUNT(*) AS QtdeEntregas FROM Entrega;
SELECT COUNT(*) AS QtdePagamentos FROM Pagamento;
SELECT COUNT(*) AS QtdeCartao FROM Cartao;
SELECT COUNT(*) AS QtdePix FROM Pix;
SELECT COUNT(*) AS QtdeDinheiro FROM Dinheiro;
SELECT COUNT(*) AS QtdeAvaliacao FROM Avaliacao;
SELECT COUNT(*) AS QtdeCombo FROM Combo;

DELIMITER $$

CREATE FUNCTION fn_media_avaliacao_restaurante(idRest INT)
    RETURNS DECIMAL(3,2)
    DETERMINISTIC
BEGIN
    DECLARE media DECIMAL(3,2);

SELECT AVG(Nota)
INTO media
FROM Avaliacao
WHERE idRestaurante = idRest;

RETURN IFNULL(media, 0);
END$$

DELIMITER ;

DELIMITER $$

CREATE FUNCTION fn_nivel_cliente(idCli INT)
    RETURNS VARCHAR(20)
    DETERMINISTIC
BEGIN
    DECLARE totalGasto DECIMAL(10,2);
    DECLARE nivel VARCHAR(20);

SELECT SUM(PrecoTotal)
INTO totalGasto
FROM Pedido
WHERE idCliente = idCli;

IF totalGasto IS NULL THEN
        SET nivel = 'Sem Pedidos';
    ELSEIF totalGasto >= 1000 THEN
        SET nivel = 'Ouro';
    ELSEIF totalGasto >= 500 THEN
        SET nivel = 'Prata';
ELSE
        SET nivel = 'Bronze';
END IF;

RETURN nivel;
END$$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE sp_atualizar_status_entrega(
    IN p_idEntrega INT,
    IN p_novoStatus VARCHAR(50)
)
BEGIN
UPDATE Entrega
SET Status = p_novoStatus
WHERE idEntrega = p_idEntrega;
END$$

DELIMITER ;
DELIMITER $$

CREATE PROCEDURE sp_aplicar_descontos_progressivos()
BEGIN
    -- 1. DECLARE TODAS AS VARIÁVEIS LOCAIS PRIMEIRO
    DECLARE v_idCliente INT;
    DECLARE v_idPedido INT;
    DECLARE v_totalPedido DECIMAL(10,2);
    DECLARE v_totalAcumulado DECIMAL(10,2) DEFAULT 0;
    DECLARE v_desconto DECIMAL(5,2);
    DECLARE done INT DEFAULT 0;

    -- Variável auxiliar para cliente (agora é local)
    DECLARE v_ultimoCliente INT DEFAULT NULL;

    -- 2. DECLARE O CURSOR
    DECLARE c_pedidos CURSOR FOR
SELECT idCliente, idPedido, PrecoTotal
FROM Pedido
ORDER BY idCliente, dataHora;

-- 3. DECLARE O HANDLER
DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    -- 4. AGORA SIM, A LÓGICA PODE COMEÇAR

OPEN c_pedidos;

read_loop: LOOP
        FETCH c_pedidos INTO v_idCliente, v_idPedido, v_totalPedido;

        IF done THEN
            LEAVE read_loop;
END IF;

        -- Se for um novo cliente, zera o acumulado
        -- (Usando a variável local v_ultimoCliente)
        IF v_ultimoCliente IS NULL OR v_idCliente <> v_ultimoCliente THEN
            SET v_totalAcumulado = 0;
END IF;

        -- Soma o valor do pedido atual ao total acumulado
        SET v_totalAcumulado = v_totalAcumulado + IFNULL(v_totalPedido, 0);

        -- Define o desconto progressivo com base no total acumulado
        IF v_totalAcumulado < 1000 THEN
            SET v_desconto = 0;
        ELSEIF v_totalAcumulado < 5000 THEN
            SET v_desconto = 5;
ELSE
            SET v_desconto = 10;
END IF;

        -- Atualiza o pedido com o desconto calculado
UPDATE Pedido
SET Status = CONCAT('Desconto aplicado: ', v_desconto, '%')
WHERE idPedido = v_idPedido;

-- Atualiza o último cliente processado
-- (Usando a variável local v_ultimoCliente)
SET v_ultimoCliente = v_idCliente;

END LOOP;

CLOSE c_pedidos;

END$$

-- Não esqueça de restaurar o DELIMITER
DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_log_pagamento_insert
    AFTER INSERT ON Pagamento
    FOR EACH ROW
BEGIN
    INSERT INTO LogPagamento (idPagamento, idPedido, Valor, DataLog, Acao)
    VALUES (NEW.idPagamento, NEW.idPedido, NEW.Valor, NOW(), 'INSERIDO');
    END$$

    DELIMITER ;


DELIMITER $$

    CREATE TRIGGER trg_atualiza_total_pedido
        AFTER INSERT ON DetalhePedido
        FOR EACH ROW
    BEGIN
        UPDATE Pedido
        SET PrecoTotal = PrecoTotal + (NEW.PrecoUnitario * NEW.Quantidade)
        WHERE idPedido = NEW.idPedido;
        END$$

        DELIMITER ;
CREATE OR REPLACE VIEW vw_ComidasMaisVendidas AS
        SELECT
            p.idProduto,
            p.Nome AS Produto,
            r.Nome AS Restaurante,
            r.TipoCulinaria,
            SUM(dp.Quantidade) AS TotalVendido,
            SUM(dp.Quantidade * dp.PrecoUnitario) AS ReceitaTotal
        FROM DetalhePedido dp
                 JOIN Produto p ON dp.idProduto = p.idProduto
                 JOIN Restaurante r ON p.idRestaurante = r.idRestaurante
                 JOIN Pedido ped ON dp.idPedido = ped.idPedido
        GROUP BY p.idProduto, p.Nome, r.Nome, r.TipoCulinaria
        ORDER BY TotalVendido DESC;


/*Esta view consolida dados de produtos, pedidos e restaurantes para identificar os pratos mais vendidos e a receita total gerada por cada um.
Ela fornece uma visão direta da demanda dos clientes e da performance de vendas por tipo de culinária, facilitando análises de tendências gastronômicas, controle de estoque e decisões sobre promoções e cardápio.
É ideal para relatórios de desempenho de produtos e para apoiar estratégias de marketing e precificação.*/


        CREATE OR REPLACE VIEW vw_DesempenhoEntregas AS
        SELECT
            e.idEntregador,
            e.Nome AS Entregador,
            COUNT(en.idEntrega) AS TotalEntregas,
            AVG(TIMESTAMPDIFF(MINUTE, en.dataHoraSaida, en.dataHoraChegada)) AS MediaTempoEntrega,
            COUNT(DISTINCT ped.idPedido) AS PedidosEntregues,
            SUM(pag.Valor) AS ValorTotalEntregue
        FROM Entregador e
                 JOIN Entrega en ON e.idEntregador = en.idEntregador
                 JOIN Pedido ped ON ped.idPedido = en.idPedido
                 JOIN Pagamento pag ON pag.idPedido = ped.idPedido
        GROUP BY e.idEntregador, e.Nome
        ORDER BY TotalEntregas DESC;



/*Esta view integra informações de pedidos, avaliações e produtos para medir o desempenho geral dos restaurantes, considerando volume de vendas, receita gerada e satisfação média dos clientes.
Permite identificar quais estabelecimentos têm melhor desempenho financeiro e reputacional, sendo fundamental para rankings gerenciais, avaliação de parcerias e planejamento estratégico da plataforma.*/

        CREATE INDEX idx_detalhepedido_produto
            ON DetalhePedido (idProduto);

        CREATE INDEX idx_detalhepedido_quantidade
            ON DetalhePedido (idProduto, Quantidade);

        -- Mostra clientes que ainda não fizeram nenhum pedido.

        SELECT c.idCliente, c.Nome
        FROM Cliente c
                 LEFT JOIN Pedido p ON c.idCliente = p.idCliente
        WHERE p.idPedido IS NULL;

        -- Consulta 2 – FULL OUTER JOIN: Restaurantes e Avaliações (completo e contextual)
-- Mostra todos os restaurantes e suas avaliações, incluindo:
-- - Restaurantes sem nenhuma avaliação
-- - Avaliações sem restaurante associado (erro ou dado órfão)

        SELECT
            r.idRestaurante,
            r.Nome AS Restaurante,
            r.TipoCulinaria,
            a.idAvaliacao,
            a.Nota,
            a.Comentario,
            a.Data AS DataAvaliacao
        FROM Restaurante r
                 LEFT JOIN Avaliacao a
                           ON r.idRestaurante = a.idRestaurante

        UNION

        SELECT
            r.idRestaurante,
            r.Nome AS Restaurante,
            r.TipoCulinaria,
            a.idAvaliacao,
            a.Nota,
            a.Comentario,
            a.Data AS DataAvaliacao
        FROM Restaurante r
                 RIGHT JOIN Avaliacao a
                            ON r.idRestaurante = a.idRestaurante;

--  Consulta 3 – Restaurantes com mais produtos vendidos que a média
        SELECT
            r.Nome AS Restaurante,
            COUNT(dp.idProduto) AS TotalProdutosVendidos
        FROM Restaurante r
                 JOIN Produto p ON r.idRestaurante = p.idRestaurante
                 JOIN DetalhePedido dp ON dp.idProduto = p.idProduto
        GROUP BY r.Nome
        HAVING COUNT(dp.idProduto) > (
            SELECT AVG(TotalPedidos)
            FROM (
                     SELECT COUNT(dp2.idProduto) AS TotalPedidos
                     FROM Restaurante r2
                              JOIN Produto p2 ON r2.idRestaurante = p2.idRestaurante
                              JOIN DetalhePedido dp2 ON dp2.idProduto = p2.idProduto
                     GROUP BY r2.Nome
                 ) AS MediaPedidos
        );


-- Consulta 4 – Entregadores com mais entregas e média de tempo (com subconsulta)

        SELECT
            e.Nome AS Entregador,
            en.TotalEntregas,
            en.MediaTempoEntrega
        FROM Entregador e
                 JOIN (
            SELECT
                idEntregador,
                COUNT(idEntrega) AS TotalEntregas,
                AVG(TIMESTAMPDIFF(MINUTE, dataHoraSaida, dataHoraChegada)) AS MediaTempoEntrega
            FROM Entrega
            GROUP BY idEntregador
        ) AS en ON e.idEntregador = en.idEntregador
        ORDER BY en.TotalEntregas DESC;



