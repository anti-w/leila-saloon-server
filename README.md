
# Cabeleleila Leila Salão de Beleiza (Back-End)

Trata-se de um sistema web para cadastro dos clientes do salão de beleza, agendamento de horários para serviços fornecidos e também um controle interno da dona do salão.


##

Esse sistema foi desenvolvido para um desafio proposto pela empresa [DSIN - Tecnologia da Informação](https://www.dsin.com.br/) para a vaga de Estágio em Desenvolvimento.



## Funcionalidades

- [x]  Conexão com a base de dados na nuvem (MongoDB Atlas)
- [x]  Criar usuário
- [ ]  Agendar horário
- [ ]  Listar horários agendados pelo usuário
- [x]  Utilizar midleware para criar token seguro
- [x]  Criptografar senha do usuário em virtude da senha ser pessoal
- [ ]  Criar usuário admin
- [x]  Autenticar usuário
- [ ]  Gerenciar agendamentos
- [ ]  Elaborar indicadores administrativos 

## Stack utilizada


- [NodeJS](https://nodejs.org/)
- [CORS](https://www.npmjs.com/package/cors)
- [Mongoose](https://mongoosejs.com/)
- [Express](https://expressjs.com/)
- [JWT (Json Web Token)](https://jwt.io/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [MongoDB](https://www.mongodb.com/)



## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/anti-w/leila-saloon-server
```

Entre no diretório do projeto

```bash
  cd leila-saloon-server
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run start
```

Entre seguir as boas práticas em esconder variáveis de ambientes e facilitar a correção, optei por seguir as boas práticas, por isso segue via e-mail as variáveis de ambientes necessárias para o projeto funcionar no ambiente local.
## Documentação da API

#### Retorna usuário e o token caso informações forem corretas

```http
  POST /auth/login
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**. E-mail do usuário |
| `password` | `string` | **Obrigatório**. Senha do usuário |

#### Retorna mensagem informando erro ocorrido ou sucesso caso o cadatro seja realizado

```http
  POST /auth/register
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório**. Nome do usuário|
| `email`      | `string` | **Obrigatório**. E-mail do usuário |
| `password`      | `string` | **Obrigatório**. Senha do usuário |
| `confirmpassword`      | `string` | **Obrigatório**. Senha do usuário novamente |


## Aprendizados

Criar um sistema de login e cadastro não é tarefa muito difícil, o que me desafiou foi fazer isso tentando manter a segurança e presando pelas boas práticas de programação.

![Logo](https://www.univem.edu.br/storage/paginas/September2019/Marca%20DSIN%20Principal%20em%20Alta.jpg)

