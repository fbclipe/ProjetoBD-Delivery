Projeto de Banco de Dados - Sistema de Gerenciamento de Restaurantes
Este projeto foi desenvolvido como trabalho acadêmico para a disciplina de Banco de Dados, implementando uma aplicação completa com Spring Boot no backend, React no frontend e MySQL como banco de dados.

Tecnologias Utilizadas
Backend: Spring Boot

Frontend: React

Banco de Dados: MySQL

Gerenciamento de Dependências: Maven (Backend) e NPM (Frontend)

Pré-requisitos
Antes de executar a aplicação, certifique-se de ter instalado em sua máquina:

Java JDK 11 ou superior

Node.js e NPM

MySQL Server

Maven

Como Executar o Projeto
Configuração do Banco de Dados
Primeiro, é necessário configurar o MySQL. Abra o terminal e execute:

bash
mysql -u root -p
Digite sua senha do MySQL root quando solicitado. 
Executando o Backend (Spring Boot)
Navegue até a pasta do backend e execute os seguintes comandos:

bash
# Instalar dependências
mvn clean install

# Executar a aplicação
mvn spring-boot:run
O backend estará rodando em http://localhost:8080

Executando o Frontend (React)
Abra um novo terminal, navegue até a pasta do frontend e execute:

bash
# Instalar as dependências
npm install

# Executar a aplicação
npm start
O frontend estará disponível em http://localhost:3000

Entidades Principais
O sistema gerencia as seguintes entidades principais:

Restaurante: Cadastro de estabelecimentos com informações como nome, endereço e especialidade

Cliente: Dados dos usuários do sistema

Produto: Cardápio de itens oferecidos pelos restaurantes

Pedido: Registro de pedidos realizados pelos clientes

Configurações
Verifique se as configurações de conexão com o banco de dados no arquivo application.properties estão de acordo com seu ambiente MySQL local.

Desenvolvedores
Artur Dowsley

Samuel Gouveia

Felipe Barros
